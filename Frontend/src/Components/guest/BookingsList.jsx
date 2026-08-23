import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useSettingsStore from "../../Hooks/useSettingsStore";
import { formatDisplayDate } from "../../Utils/formatDate";
import { getAuthHeader } from "../../Utils/auth";
import RatingModal from "./RatingModal";

export default function BookingsList() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showRatingModal, setShowRatingModal] = useState(false);
    const currencySymbol = useSettingsStore(state => state.currencySymbol);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('/getUserBookings', {
                    headers: getAuthHeader()
                });
                if (response.data && response.data.data) {
                    setBookings(response.data.data);
                }
            } catch (e) {
                console.error("Failed to fetch bookings", e);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const formatPrice = (price) => currencySymbol === 'DA' ? `${price} ${currencySymbol}` : `${currencySymbol}${price}`;

    const handleRatingSubmitted = (updatedRating) => {
        if (selectedBooking && updatedRating) {
            setBookings(prev => prev.map(b => b._id === selectedBooking._id ? { ...b, review: updatedRating.overallRating } : b));
        }
        setShowRatingModal(false);
    };

    if (loading) return <div className="p-5">Loading your bookings...</div>;

    return (
        <div className="p-md-5 row">
            <div className="col-12">
                <div className="mb-5">
                    <h3>My Bookings</h3>
                    <span className="text-secondary">View your past and upcoming stays</span>
                </div>

                {bookings.length === 0 ? (
                    <div className="p-5 bg-light rounded-4 text-center">
                        <h5 className="text-muted">You don't have any bookings yet.</h5>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Room</th>
                                    <th>Check-in</th>
                                    <th>Check-out</th>
                                    <th>Total Price</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map(booking => {
                                    const statusLower = (booking.status || '').toLowerCase();
                                    const isCanceled = statusLower === 'canceled' || statusLower === 'cancelled';
                                    const canRate = !isCanceled && ['pending', 'completed', 'checked-out', 'confirmed', 'checked-in'].includes(statusLower);

                                    return (
                                        <tr 
                                            key={booking._id} 
                                            onClick={() => navigate(`/BookingConfirmed/${booking._id}`)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <td>
                                                <span className="fw-bold text-primary">{booking.room_name}</span>
                                            </td>
                                            <td>{booking.check_in ? formatDisplayDate(booking.check_in) : '-'}</td>
                                            <td>{booking.check_out ? formatDisplayDate(booking.check_out) : '-'}</td>
                                            <td>{formatPrice(booking.totalPrice)}</td>
                                            <td>
                                                <span className={`badge rounded-pill ${
                                                    booking.status === 'Pending' ? 'bg-warning text-dark' :
                                                    booking.status === 'confirmed' ? 'bg-success' :
                                                    booking.status === 'rejected' ? 'bg-danger' :
                                                    booking.status === 'cancelled' || booking.status === 'Canceled' ? 'bg-secondary' :
                                                    'bg-primary'
                                                }`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td>
                                                {canRate ? (
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-primary rounded-pill px-3 fw-semibold"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedBooking(booking);
                                                            setShowRatingModal(true);
                                                        }}
                                                    >
                                                        {booking.review ? `⭐ ${booking.review}/10` : 'Rate'}
                                                    </button>
                                                ) : (
                                                    <span className="text-muted small">-</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showRatingModal && selectedBooking && (
                <RatingModal 
                    show={showRatingModal}
                    booking={selectedBooking}
                    onClose={() => setShowRatingModal(false)}
                    onRatingSubmitted={handleRatingSubmitted}
                />
            )}
        </div>
    );
}

