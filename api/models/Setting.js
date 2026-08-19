import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
    check_in_time: { type: String, default: '14:00' },
    check_out_time: { type: String, default: '11:00' },
    cancellation_policy: { type: String, default: 'Free cancellation up to 48 hours before check-in.' },
    city_tax: { type: Number, default: 0 },
    service_tax: { type: Number, default: 0 },
    currency: { type: String, default: 'USD' },
    payment_gateway_active: { type: Boolean, default: true },
    notification_preferences: {
        new_booking: { type: Boolean, default: true },
        cancellations: { type: Boolean, default: true },
        user_registrations: { type: Boolean, default: true }
    }
});

export default mongoose.model('Setting', settingSchema);
