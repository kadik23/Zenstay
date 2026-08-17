import React from 'react';

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmText = "Yes, Delete", cancelText = "Cancel" }) {
    if (!isOpen) return null;

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}>
            <div className="bg-white rounded-4 shadow-lg p-4 text-center" style={{ width: '400px', maxWidth: '90%' }}>
                <h5 className="fw-bold mb-3 text-danger">{title || "Confirm Action"}</h5>
                <p className="text-secondary mb-4">{message}</p>
                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-light rounded-4 px-4 fw-bold" onClick={onCancel}>{cancelText}</button>
                    <button className="btn btn-danger rounded-4 px-4 fw-bold" onClick={onConfirm}>{confirmText}</button>
                </div>
            </div>
        </div>
    );
}
