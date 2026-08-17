import React, { useState, useEffect } from 'react';
import searchIcon from '../../assets/icons/search-blue.png';
import more from '../../assets/icons/more.png';
import axios from "axios";
import ConfirmModal from '../../Components/ConfirmModal';

export default function GuestList() {
    const [guests, setGuests] = useState([]);
    const [activeTab, setActiveTab] = useState('All Guests');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [infoModalGuest, setInfoModalGuest] = useState(null);
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: '', payload: null });

    useEffect(() => {
        getGuests();
    }, []);

    const getGuests = async () => {
        try {
            let response = await axios.get('/getUsers');
            if (response.data) {
                setGuests(response.data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(filteredGuests.map(g => g._id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectRow = (id) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleDeleteSingle = (id) => {
        setOpenDropdownId(null);
        setConfirmModal({ isOpen: true, type: 'single', payload: id });
    };

    const handleBulkDelete = () => {
        setConfirmModal({ isOpen: true, type: 'bulk', payload: selectedIds });
    };

    const executeDelete = async () => {
        if (confirmModal.type === 'single') {
            try {
                await axios.delete('/delete_user', { data: { _id: confirmModal.payload } });
                setGuests(guests.filter(g => g._id !== confirmModal.payload));
            } catch (e) {
                console.error('Failed to delete', e);
            }
        } else if (confirmModal.type === 'bulk') {
            try {
                await axios.post('/delete_bulk_users', { userIds: confirmModal.payload });
                setGuests(guests.filter(g => !confirmModal.payload.includes(g._id)));
                setSelectedIds([]);
            } catch (e) {
                console.error('Failed to bulk delete', e);
            }
        }
        setConfirmModal({ isOpen: false, type: '', payload: null });
    };

    const filteredGuests = guests.filter(guest => {
        const matchesTab = 
            activeTab === 'All Guests' || 
            (activeTab === 'Booked' && guest.hasBookings) || 
            (activeTab === 'No Bookings' && !guest.hasBookings);
        
        const q = searchQuery.toLowerCase().trim();
        const shortId = guest._id ? `#${guest._id.slice(-6).toLowerCase()}` : '';
        const nameStr = `${guest.firstname || ''} ${guest.lastname || ''} ${guest.username || ''}`.toLowerCase();
        const matchesSearch = 
            nameStr.includes(q) || 
            (guest._id && guest._id.toLowerCase().includes(q)) ||
            (shortId.includes(q));
            
        return matchesTab && matchesSearch;
    });

    const counts = {
        all: guests.length,
        booked: guests.filter(g => g.hasBookings).length,
        noBookings: guests.filter(g => !g.hasBookings).length
    };

    return (
        <div>
            <div className='mb-5 d-flex align-items-center justify-content-between'>
                <div className='d-flex flex-column gap-1'>
                    <h3 className='fw-bold mb-0' style={{color:"#2b2b2b"}}>Guest List</h3>
                </div>
                {selectedIds.length > 0 && (
                    <button onClick={handleBulkDelete} className='btn btn-danger rounded-4 px-4 fw-bold'>
                        Bulk Delete ({selectedIds.length})
                    </button>
                )}
            </div>

            <div className='mb-4'>
                <div className='d-flex justify-content-between gap-4'>
                    <div className='flex-grow-1 px-4 bg-white d-flex align-items-center rounded-4 shadow-sm' style={{ maxWidth: '600px' }}>
                        {['All Guests', 'Booked', 'No Bookings'].map(tab => {
                            const count = tab === 'All Guests' ? counts.all : tab === 'Booked' ? counts.booked : counts.noBookings;
                            const isActive = activeTab === tab;
                            return (
                                <div key={tab} 
                                     className={`fw-bold py-3 px-3 ${isActive ? 'border-bottom border-primary border-4 text-dark' : 'text-secondary'}`}
                                     style={{ cursor: 'pointer', opacity: isActive ? 1 : 0.6 }}
                                     onClick={() => { setActiveTab(tab); setSelectedIds([]); }}>
                                    {tab} ({count})
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className='d-flex gap-3 align-items-center bg-white rounded-4 shadow-sm p-2 px-3' style={{ flex: '0 1 400px' }}>
                        <input type="text" 
                            className='w-100 border-0 bg-transparent' 
                            style={{ outline: 'none' }}
                            placeholder='Search Name or ID'  
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <img src={searchIcon} width={20} alt="Search" />
                    </div>
                </div>
            </div>

            <div className='bg-white rounded-4 shadow-sm overflow-hidden'>
                <table className="table mb-0 table-hover align-middle">
                    <thead className="bg-light">
                        <tr>
                            <th scope="col" className='ps-4 border-0 py-3'>
                                <input type="checkbox" 
                                    className="form-check-input"
                                    checked={selectedIds.length === filteredGuests.length && filteredGuests.length > 0} 
                                    onChange={handleSelectAll} 
                                />
                            </th>
                            <th scope="col" className='border-0 py-3'>Guest Name</th>
                            <th scope="col" className='border-0 py-3'>Last Reservation Date</th>
                            <th scope="col" className='border-0 py-3'>Check-in</th>
                            <th scope="col" className='border-0 py-3'>Check-out</th>
                            <th scope="col" className='border-0 py-3 text-center'>Reviews</th>
                            <th scope="col" className='border-0 py-3'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredGuests.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center py-5 text-muted">No guests found.</td>
                            </tr>
                        )}
                        {filteredGuests.map(guest => (
                            <tr key={guest._id}>
                                <th scope="row" className='ps-4'>
                                    <input type="checkbox" 
                                        className="form-check-input shadow-none"
                                        checked={selectedIds.includes(guest._id)}
                                        onChange={() => handleSelectRow(guest._id)}
                                    />
                                </th>
                                <td>
                                    <div className='d-flex gap-3 align-items-center py-2'>
                                        <img src={guest.image || "https://github.com/mdo.png"} alt={guest.username} width="40" height="40" className="rounded-circle" style={{objectFit:"cover"}}/>
                                        <div className='d-flex flex-column' style={{fontWeight:"600"}}>
                                            <span className='text-muted' style={{ fontSize: '0.85rem' }}>#{guest._id.slice(-6).toUpperCase()}</span>
                                            {guest.firstname} {guest.lastname}
                                        </div>
                                    </div>
                                </td>
                                <td className='fw-medium text-secondary'>
                                    {guest.hasBookings ? (
                                        guest.lastReservationDate ? new Date(guest.lastReservationDate).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : 'N/A'
                                    ) : (
                                        <span className="badge bg-secondary text-white rounded-pill px-3 py-1 fw-medium">No bookings yet</span>
                                    )}
                                </td>
                                <td className='fw-medium text-secondary'>
                                    {guest.hasBookings ? (
                                        guest.checkIn || 'N/A'
                                    ) : (
                                        <span className="text-muted fst-italic">Pending</span>
                                    )}
                                </td>
                                <td className='fw-medium text-secondary'>
                                    {guest.hasBookings ? (
                                        guest.checkOut || 'N/A'
                                    ) : (
                                        <span className="text-muted fst-italic">Pending</span>
                                    )}
                                </td>
                                <td className='text-center'>
                                    {guest.hasBookings ? (
                                        guest.reviews ? (
                                            <span className="badge bg-warning text-dark rounded-pill px-3 py-1">⭐ {guest.reviews}/10</span>
                                        ) : (
                                            <span className="text-muted fw-medium">-</span>
                                        )
                                    ) : (
                                        <span className="text-muted fst-italic">N/A</span>
                                    )}
                                </td>
                                <td className='pe-4 position-relative'>
                                    <div style={{ cursor: 'pointer' }} onClick={() => setOpenDropdownId(openDropdownId === guest._id ? null : guest._id)}>
                                        <img src={more} width={20} alt="actions" />
                                    </div>
                                    {openDropdownId === guest._id && (
                                        <div className="position-absolute bg-white shadow-lg rounded-3 border z-3" style={{ right: '40px', top: '50px', minWidth: '140px' }}>
                                            <div className="p-2 dropdown-item fw-medium" style={{ cursor: 'pointer' }} onClick={() => { setInfoModalGuest(guest); setOpenDropdownId(null); }}>See more info</div>
                                            <div className="p-2 dropdown-item text-danger fw-medium" style={{ cursor: 'pointer' }} onClick={() => handleDeleteSingle(guest._id)}>Delete</div>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {infoModalGuest && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
                    <div className="bg-white rounded-4 shadow-lg p-5 position-relative" style={{ width: '450px', maxWidth: '90%' }}>
                        <button onClick={() => setInfoModalGuest(null)} className="btn-close position-absolute top-3 end-3 m-4" aria-label="Close" style={{ right: '0px', top: '0px' }}></button>
                        
                        <div className="d-flex flex-column align-items-center mb-4">
                            <img src={infoModalGuest.image || "https://github.com/mdo.png"} alt="Avatar" width="80" height="80" className="rounded-circle shadow-sm mb-3" style={{objectFit:"cover"}} />
                            <h5 className="fw-bold mb-0">{infoModalGuest.firstname} {infoModalGuest.lastname}</h5>
                            <span className="text-muted">@{infoModalGuest.username}</span>
                        </div>
                        
                        <div className="d-flex flex-column gap-3">
                            <div className="d-flex justify-content-between border-bottom pb-2">
                                <span className="text-secondary fw-medium">Email</span>
                                <span className="fw-bold">{infoModalGuest.email || <span className="text-danger fst-italic">Missing</span>}</span>
                            </div>
                            <div className="d-flex justify-content-between border-bottom pb-2">
                                <span className="text-secondary fw-medium">Telephone</span>
                                <span className="fw-bold">{infoModalGuest.telephone || <span className="text-danger fst-italic">Missing</span>}</span>
                            </div>
                            <div className="d-flex justify-content-between border-bottom pb-2">
                                <span className="text-secondary fw-medium">Location</span>
                                <span className="fw-bold">{infoModalGuest.location || <span className="text-danger fst-italic">Missing</span>}</span>
                            </div>
                            <div className="d-flex justify-content-between border-bottom pb-2">
                                <span className="text-secondary fw-medium">Nationality</span>
                                <span className="fw-bold">{infoModalGuest.nationality || <span className="text-danger fst-italic">Missing</span>}</span>
                            </div>
                            <div className="d-flex justify-content-between border-bottom pb-2">
                                <span className="text-secondary fw-medium">Date of Birth</span>
                                <span className="fw-bold">{infoModalGuest.date_of_birth ? new Date(infoModalGuest.date_of_birth).toLocaleDateString() : <span className="text-danger fst-italic">Missing</span>}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ConfirmModal 
                isOpen={confirmModal.isOpen}
                title="Confirm Deletion"
                message={confirmModal.type === 'single' 
                    ? 'Are you sure you want to delete this guest and all their bookings? This action cannot be undone.'
                    : `Are you sure you want to delete ${confirmModal.payload?.length} guests and all their bookings? This action cannot be undone.`}
                onConfirm={executeDelete}
                onCancel={() => setConfirmModal({ isOpen: false, type: '', payload: null })}
            />
        </div>
    );
}