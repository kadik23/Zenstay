import React, { useState } from 'react'
import useAlertMessageStore from '../../Hooks/useAlertMessage';

function ALertMessage({ type, message }) {
    const { alert, clearAlert } = useAlertMessageStore();

    if (!alert.visible) return null;
    return (
    <div className={`alert alert-${type} alert-dismissible fade show`} role="alert" style={{zIndex: 9999}}>
        {message}
        <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={clearAlert}
        ></button>
    </div>
    )
}

export default ALertMessage