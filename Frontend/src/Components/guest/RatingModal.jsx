import React from 'react';
import RatingComponent from './RatingComponent';

export default function RatingModal({ show, booking, onClose, onRatingSubmitted }) {
    if (!show || !booking) return null;

    return (
        <div 
            className="modal fade show d-block" 
            tabIndex="-1" 
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1055 }}
        >
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content rounded-4 border-0 shadow-lg">
                    <div className="modal-header border-0 pb-0">
                        <div>
                            <h5 className="modal-title fw-bold text-dark">
                                Rate Stay - {booking.room_name || 'Room'}
                            </h5>
                            <span className="text-secondary small">
                                Booking #{booking._id}
                            </span>
                        </div>
                        <button 
                            type="button" 
                            className="btn-close" 
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body pt-1">
                        <RatingComponent 
                            bookingId={booking._id}
                            roomId={booking.room_id}
                            onRatingSubmitted={(data) => {
                                if (onRatingSubmitted) onRatingSubmitted(data);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
