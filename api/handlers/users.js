import User from "../models/User.js";
import Booking from "../models/Booking.js";

export const userHandler = async (req, res) => {
    try {
        let users = await User.find({ account_type: { $ne: 'admin' } }).lean();
        
        const enhancedUsers = await Promise.all(users.map(async (user) => {
            const bookings = await Booking.find({ user_id: user._id.toString() });
            
            // Sort bookings descending by date (using createdAt, or check_in as fallback)
            bookings.sort((a, b) => {
                const dateA = new Date(a.createdAt || a.check_in || 0).getTime();
                const dateB = new Date(b.createdAt || b.check_in || 0).getTime();
                return (dateB || 0) - (dateA || 0);
            });

            let latestBooking = null;
            if (bookings && bookings.length > 0) {
                latestBooking = bookings[0];
            }
            return {
                ...user,
                hasBookings: bookings.length > 0,
                lastReservationDate: latestBooking ? (latestBooking.createdAt || latestBooking.check_in) : null,
                checkIn: latestBooking ? latestBooking.check_in : null,
                checkOut: latestBooking ? latestBooking.check_out : null,
                reviews: latestBooking ? latestBooking.review : null
            };
        }));
        
        res.json(enhancedUsers);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}