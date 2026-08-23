import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthHeader } from '../../Utils/auth';

export default function RatingComponent({ bookingId, roomId, bookingStatus = null, initialRoom = null, onRatingSubmitted = null }) {
    const isCanceled = ['canceled', 'cancelled'].includes((bookingStatus || '').toLowerCase());
    if (isCanceled) return null;

    const [room, setRoom] = useState(initialRoom);
    const [loadingRoom, setLoadingRoom] = useState(!initialRoom);
    const [ratings, setRatings] = useState({});
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [hasExistingRating, setHasExistingRating] = useState(false);

    // Fetch room details if not provided
    useEffect(() => {
        if (initialRoom) {
            setRoom(initialRoom);
            setLoadingRoom(false);
            return;
        }
        if (!roomId) return;

        const fetchRoom = async () => {
            try {
                const res = await axios.get(`/getOneRoom/${roomId}`);
                if (res.data) {
                    setRoom(res.data);
                }
            } catch (err) {
                console.error("Failed to load room details for rating", err);
            } finally {
                setLoadingRoom(false);
            }
        };
        fetchRoom();
    }, [roomId, initialRoom]);

    // Fetch existing rating for this booking
    useEffect(() => {
        if (!bookingId) return;

        const fetchExistingRating = async () => {
            try {
                const res = await axios.get(`/getRatingByBooking/${bookingId}`);
                if (res.data && res.data.data) {
                    const existing = res.data.data;
                    setHasExistingRating(true);
                    if (existing.ratings) {
                        setRatings(existing.ratings);
                    }
                    if (existing.comment) {
                        setComment(existing.comment);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch existing rating", err);
            }
        };
        fetchExistingRating();
    }, [bookingId]);

    // Build dynamic list of active rating categories
    const getActiveCategories = () => {
        const categories = [
            { key: 'cleanliness', label: 'Cleanliness', icon: '✨' },
            { key: 'comfort', label: 'Comfort', icon: '🛌' },
        ];

        if (!room) return categories;

        if (room.air_conditioning) {
            categories.push({ key: 'air_conditioning', label: 'Air conditioning', icon: '❄️' });
        }
        if (room.free_wifi) {
            categories.push({ key: 'free_wifi', label: 'WiFi Connection', icon: '📶' });
        }
        if (room.smart_tv) {
            categories.push({ key: 'smart_tv', label: 'Smart TV', icon: '📺' });
        }
        if (room.key_card_access) {
            categories.push({ key: 'key_card_access', label: 'Key Card Access', icon: '🔑' });
        }
        if (room.bathroom || room.bathrrom) {
            categories.push({ key: 'bathroom', label: 'Private Bathroom', icon: '🛁' });
        }

        return categories;
    };

    const categories = getActiveCategories();

    const handleVote = (categoryKey, value) => {
        setRatings(prev => {
            // Toggle off if clicking same value
            if (prev[categoryKey] === value) {
                const next = { ...prev };
                delete next[categoryKey];
                return next;
            }
            return { ...prev, [categoryKey]: value };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        const selectedKeys = Object.keys(ratings).filter(k => ratings[k] !== undefined && ratings[k] !== null);
        if (selectedKeys.length === 0) {
            setErrorMessage('Please select at least one rating category (0 to 10).');
            return;
        }

        setSubmitting(true);
        try {
            const response = await axios.post(
                '/submitRating',
                {
                    booking_id: bookingId,
                    room_id: roomId || room?._id,
                    ratings,
                    comment
                },
                { headers: getAuthHeader() }
            );

            setSuccessMessage(hasExistingRating ? 'Rating updated successfully!' : 'Thank you for your rating!');
            setHasExistingRating(true);
            if (onRatingSubmitted) {
                onRatingSubmitted(response.data?.data);
            }
        } catch (err) {
            console.error(err);
            setErrorMessage(err.response?.data?.message || 'Failed to submit rating. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loadingRoom) {
        return <div className="p-3 text-secondary">Loading rating form...</div>;
    }

    return (
        <div className="card border-0 shadow-sm rounded-4 p-4 my-4 bg-white">
            <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-3">
                <div>
                    <h5 className="fw-bold mb-1">Rate Your Experience</h5>
                    <span className="text-muted small">
                        Rate from 0 to 10 for any or all applicable features below.
                    </span>
                </div>
                {hasExistingRating && (
                    <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-2">
                        ✓ Rated
                    </span>
                )}
            </div>

            {successMessage && (
                <div className="alert alert-success rounded-3 py-2 px-3 mb-3 small" role="alert">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="alert alert-danger rounded-3 py-2 px-3 mb-3 small" role="alert">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="d-flex flex-column gap-3 mb-4">
                    {categories.map((cat) => {
                        const selectedVal = ratings[cat.key];
                        return (
                            <div key={cat.key} className="p-3 rounded-3 bg-light border">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="fw-semibold text-dark">
                                        <span className="me-2">{cat.icon}</span>
                                        {cat.label}
                                    </span>
                                    <span className={`badge rounded-pill px-3 py-1 ${selectedVal !== undefined ? 'bg-primary' : 'bg-secondary opacity-50'}`}>
                                        {selectedVal !== undefined ? `${selectedVal} / 10` : 'Not rated'}
                                    </span>
                                </div>
                                <div className="d-flex flex-wrap gap-1 justify-content-between align-items-center pt-1">
                                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                        <button
                                            key={num}
                                            type="button"
                                            onClick={() => handleVote(cat.key, num)}
                                            className={`btn btn-sm rounded-circle fw-bold ${
                                                selectedVal === num
                                                    ? 'btn-primary text-white shadow-sm'
                                                    : 'btn-outline-secondary border-0 bg-white'
                                            }`}
                                            style={{ width: '32px', height: '32px', padding: 0 }}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mb-3">
                    <label className="form-label text-muted small fw-semibold">Optional Comment</label>
                    <textarea
                        className="form-control rounded-3"
                        rows="2"
                        placeholder="Tell us more about your stay..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary rounded-pill px-4 fw-bold w-100"
                >
                    {submitting ? 'Submitting...' : hasExistingRating ? 'Update Rating' : 'Submit Rating'}
                </button>
            </form>
        </div>
    );
}
