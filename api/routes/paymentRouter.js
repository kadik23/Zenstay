import { Router } from 'express';
import Stripe from 'stripe';
import { loginMiddleware } from '../middleware/loginMiddleware.js';
import Booking from '../models/Booking.js';
import Transaction from '../models/Transaction.js';
import Notification from '../models/Notification.js';
import { dispatchNotification } from './roomsRouter.js';

const router = Router();
let stripe;

router.post('/process_payment', loginMiddleware, async (req, res) => {
    try {
        if (!stripe) stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const { user_id, room_id, check_in, check_out, totalPrice, secondStep } = req.body;
        const { card_number, exp_date, cvc } = secondStep;

        if (!card_number || !exp_date || !cvc) {
            return res.status(400).json({ error: 'Missing card details' });
        }

        // Parse MM/YY or YYYY-MM
        let expMonth, expYear;
        if (exp_date.includes('-')) { // YYYY-MM
            const parts = exp_date.split('-');
            expYear = parts[0];
            expMonth = parts[1];
        } else { // MM/YY
            const parts = exp_date.split('/');
            expMonth = parts[0];
            expYear = '20' + parts[1];
        }

        let paymentMethodId = 'pm_card_visa'; // default test card
        if (card_number.startsWith('4000')) paymentMethodId = 'pm_card_mastercard';
        if (card_number.startsWith('3782')) paymentMethodId = 'pm_card_amex';

        // 2. Create and confirm a PaymentIntent using the test PaymentMethod ID
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(totalPrice * 100), // Stripe expects cents
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never'
            }
        });

        // 3. Create the Booking (status based on payment)
        const bookingStatus = paymentIntent.status === 'succeeded' ? 'Pending' : 'Canceled';
        const doc = await Booking.create({
            user_id, room_id, check_in, check_out, totalPrice, status: bookingStatus
        });

        // 4. Create the Transaction record
        await Transaction.create({
            user_id,
            room_id,
            booking_id: doc._id.toString(),
            stripe_id: paymentIntent.id,
            amount: totalPrice,
            currency: 'usd',
            status: paymentIntent.status === 'succeeded' ? 'succeeded' : 'pending'
        });

        await dispatchNotification('CREATE_RESERVATION', `A new reservation was booked!`, doc);
        res.status(200).json({ data: doc, paymentIntent });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Payment processing failed: ' + err.message });
    }
});

router.get('/transactions', async (req, res) => {
    try {
        let transactions = await Transaction.find().lean();
        transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.json(transactions);
    } catch (e) {
        res.status(500).json('Internal Server Error: ' + e);
    }
});

export default router;
