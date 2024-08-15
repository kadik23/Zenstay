import React from 'react'

function Loading() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border text-primary me-3" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="fs-4 text-primary">Loading...</div>
        </div> 
    )
}

export default Loading