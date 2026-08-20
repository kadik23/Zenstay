import { Router } from 'express';
import Stripe from 'stripe';
import { loginMiddleware } from '../middleware/loginMiddleware.js';
import Booking from '../models/Booking.js';
import Transaction from '../models/Transaction.js';
import Notification from '../models/Notification.js';
import { dispatchNotification } from './roomsRouter.js';
import User from '../models/User.js';

const router = Router();
let stripe;

router.post('/process_payment', loginMiddleware, async (req, res) => {
    try {
        if (!stripe) stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const { user_id, room_id, check_in, check_out, totalPrice, secondStep } = req.body;
        let { paymentMethodId } = req.body;
        if (!paymentMethodId) {
            const { card_number, exp_date, cvc } = secondStep || {};
            if (!card_number || !exp_date || !cvc) {
                return res.status(400).json({ error: 'Missing card details' });
            }
            paymentMethodId = 'pm_card_visa'; // default test card
            if (card_number.startsWith('4000')) paymentMethodId = 'pm_card_mastercard';
            if (card_number.startsWith('3782')) paymentMethodId = 'pm_card_amex';
        }

        const user = await User.findById(req.userData.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // 2. Create and confirm a PaymentIntent using the test PaymentMethod ID
        const paymentIntentPayload = {
            amount: Math.round(totalPrice * 100), // Stripe expects cents
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never'
            }
        };

        if (paymentMethodId.startsWith('pm_') && user.stripe_customer_id && !paymentMethodId.startsWith('pm_card_')) {
            paymentIntentPayload.customer = user.stripe_customer_id;
        }

        const paymentIntent = await stripe.paymentIntents.create(paymentIntentPayload);

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

router.post('/save_card', loginMiddleware, async (req, res) => {
    try {
        if (!stripe) stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const user = await User.findById(req.userData.id);
        if (!user) return res.status(404).json({error: 'User not found'});

        if (!user.stripe_customer_id) {
            const customer = await stripe.customers.create({
                email: user.email,
                name: `${user.firstname} ${user.lastname}`
            });
            user.stripe_customer_id = customer.id;
            await user.save();
        }

        const { card_number } = req.body;
        let token = 'tok_visa';
        if (card_number.startsWith('4000')) token = 'tok_mastercard';
        if (card_number.startsWith('3782')) token = 'tok_amex';
        
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: { token }
        });

        await stripe.paymentMethods.attach(paymentMethod.id, {
            customer: user.stripe_customer_id
        });

        res.status(200).json({ message: 'Card saved successfully', paymentMethod });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

router.get('/get_saved_cards', loginMiddleware, async (req, res) => {
    try {
        if (!stripe) stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const user = await User.findById(req.userData.id);
        if (!user || !user.stripe_customer_id) return res.json([]);

        const paymentMethods = await stripe.paymentMethods.list({
            customer: user.stripe_customer_id,
            type: 'card',
        });
        res.json(paymentMethods.data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.delete('/delete_card/:id', loginMiddleware, async (req, res) => {
    try {
        if (!stripe) stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        await stripe.paymentMethods.detach(req.params.id);
        res.json({ message: 'Card removed' });
    } catch (e) {
        res.status(500).json({ error: e.message });
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
