import React, { useEffect, useState } from "react";
import axios from "axios";
import more from "../../assets/icons/more.png";
import searchIcon from "../../assets/icons/search-blue.png";
import ConfirmModal from "../../Components/ConfirmModal";
import { formatDisplayDate } from "../../Utils/formatDate";

function OrderList() {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('All Bookings');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: '', payload: null, actionStatus: '' });

  useEffect(() => {
    getBookings();
  }, []);

  async function getBookings() {
    try {
      let response = await axios.get("/getOrders");
      if (response && response.data) {
        setBookings(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredBookings.map(b => b._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const executeStatusChange = async () => {
    const { type, payload, actionStatus } = confirmModal;
    
    if (type === 'single') {
      try {
        await axios.put('/update_booking_status', { _id: payload, status: actionStatus });
        setBookings(bookings.map(b => b._id === payload ? { ...b, status: actionStatus } : b));
      } catch (e) {
        console.error('Failed to update status', e);
      }
    } else if (type === 'bulk') {
      try {
        await axios.post('/bulk_update_booking_status', { bookingIds: payload, status: actionStatus });
        setBookings(bookings.map(b => payload.includes(b._id) ? { ...b, status: actionStatus } : b));
        setSelectedIds([]);
      } catch (e) {
        console.error('Failed to bulk update status', e);
      }
    }
    setConfirmModal({ isOpen: false, type: '', payload: null, actionStatus: '' });
  };

  const filteredBookings = bookings.filter(booking => {
    const status = booking.status || 'Pending';
    const matchesTab = 
      activeTab === 'All Bookings' || 
      (activeTab === 'Pending' && status === 'Pending') ||
      (activeTab === 'Completed' && status === 'Completed') ||
      (activeTab === 'Canceled' && status === 'Canceled');
    
    const q = searchQuery.toLowerCase().trim();
    const shortId = booking._id ? `#${booking._id.slice(-6).toLowerCase()}` : '';
    const roomName = (booking.room_name || '').toLowerCase();
    
    const matchesSearch = 
      roomName.includes(q) || 
      (booking._id && booking._id.toLowerCase().includes(q)) ||
      (shortId.includes(q));
        
    return matchesTab && matchesSearch;
  });

  const counts = {
    all: bookings.length,
    pending: bookings.filter(b => (b.status || 'Pending') === 'Pending').length,
    completed: bookings.filter(b => b.status === 'Completed').length,
    canceled: bookings.filter(b => b.status === 'Canceled').length
  };

  const canAcceptAll = selectedIds.length > 0 && selectedIds.every(id => {
    const b = bookings.find(x => x._id === id);
    return (b?.status || 'Pending') === 'Pending';
  });

  const canCancelAll = selectedIds.length > 0 && selectedIds.every(id => {
    const b = bookings.find(x => x._id === id);
    return b?.status !== 'Canceled';
  });

  return (
    <div>
      <div className="mb-5 d-flex align-items-center justify-content-between">
        <div className='d-flex flex-column gap-1'>
            <h3 className='fw-bold mb-0' style={{color:"#2b2b2b"}}>Booking List</h3>
        </div>
        <div className="d-flex gap-2">
            {canAcceptAll && (
                <button 
                  onClick={() => setConfirmModal({ isOpen: true, type: 'bulk', payload: selectedIds, actionStatus: 'Completed' })} 
                  className='btn btn-success rounded-4 px-4 fw-bold'>
                    Accept Selected ({selectedIds.length})
                </button>
            )}
            {canCancelAll && (
                <button 
                  onClick={() => setConfirmModal({ isOpen: true, type: 'bulk', payload: selectedIds, actionStatus: 'Canceled' })} 
                  className='btn btn-danger rounded-4 px-4 fw-bold'>
                    Cancel Selected ({selectedIds.length})
                </button>
            )}
        </div>
      </div>

      <div className="mb-4">
        <div className="d-flex justify-content-between gap-4">
          <div className="flex-grow-1 px-3 bg-white d-flex align-items-center rounded-4 shadow-sm" style={{ maxWidth: '700px' }}>
            {['All Bookings', 'Pending', 'Completed', 'Canceled'].map(tab => {
                const count = tab === 'All Bookings' ? counts.all : tab === 'Pending' ? counts.pending : tab === 'Completed' ? counts.completed : counts.canceled;
                const isActive = activeTab === tab;
                return (
                    <div key={tab} 
                          className={`fw-bold py-3 px-3 ${isActive ? 'border-bottom border-primary border-4 text-dark' : 'text-secondary'}`}
                          style={{ cursor: 'pointer', opacity: isActive ? 1 : 0.6, fontSize: '0.95rem' }}
                          onClick={() => { setActiveTab(tab); setSelectedIds([]); }}>
                        {tab} ({count})
                    </div>
                );
            })}
          </div>
          <div className="d-flex gap-3 align-items-center bg-white rounded-4 shadow-sm p-2 px-3" style={{ flex: '0 1 400px' }}>
            <input
              type="text"
              className="w-100 border-0 bg-transparent"
              style={{ outline: 'none' }}
              placeholder="Search Book ID or Room Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <img src={searchIcon} width={20} alt="Search" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-4 shadow-sm pb-5">
        <table className="table mb-0 table-hover align-middle">
          <thead className="bg-light">
            <tr>
              <th scope="col" className="ps-4 border-0 py-3">
                <input type="checkbox" className="form-check-input"
                    checked={selectedIds.length === filteredBookings.length && filteredBookings.length > 0} 
                    onChange={handleSelectAll} />
              </th>
              <th scope="col" className="border-0 py-3">Book ID</th>
              <th scope="col" className="border-0 py-3">Username</th>
              <th scope="col" className="border-0 py-3">Room Name</th>
              <th scope="col" className="border-0 py-3">Check-in</th>
              <th scope="col" className="border-0 py-3">Check-out</th>
              <th scope="col" className="border-0 py-3">Price</th>
              <th scope="col" className="border-0 py-3">Total</th>
              <th scope="col" className="border-0 py-3 text-center">Status</th>
              <th scope="col" className="border-0 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length === 0 && (
                <tr>
                    <td colSpan="10" className="text-center py-5 text-muted">No bookings found.</td>
                </tr>
            )}
            {filteredBookings.map(booking => {
              const currentStatus = booking.status || 'Pending';
              return (
                <tr key={booking._id}>
                  <th scope="row" className="ps-4">
                    <input className="form-check-input shadow-none" type="checkbox"
                      checked={selectedIds.includes(booking._id)}
                      onChange={() => handleSelectRow(booking._id)} />
                  </th>
                  <td>
                    <div className="py-2 d-flex flex-column text-primary" style={{ fontWeight: "600" }}>
                      <span>#{booking._id.slice(-6).toUpperCase()}</span>
                    </div>
                  </td>
                  <td>
                    <div className="py-2 fw-medium">
                      {booking.username}
                    </div>
                  </td>
                  <td>
                    <div className="py-2 fw-medium text-secondary">
                      {booking.room_name}
                    </div>
                  </td>
                  <td>
                    <div className="py-2 fw-medium text-secondary">
                      {formatDisplayDate(booking.check_in)}
                    </div>
                  </td>
                  <td>
                    <div className="py-2 fw-medium text-secondary">
                      {formatDisplayDate(booking.check_out)}
                    </div>
                  </td>
                  <td>
                    <div className="py-2 fw-bold text-dark">
                      ${booking.room_price || 0}
                    </div>
                  </td>
                  <td>
                    <div className="py-2 fw-bold text-dark">
                      ${booking.totalPrice || 0}
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="py-2">
                      {currentStatus === 'Pending' && <span className="badge bg-warning text-dark rounded-pill px-3 py-2 fw-bold">Pending</span>}
                      {currentStatus === 'Completed' && <span className="badge bg-success rounded-pill px-3 py-2 fw-bold">Completed</span>}
                      {currentStatus === 'Canceled' && <span className="badge bg-danger rounded-pill px-3 py-2 fw-bold">Canceled</span>}
                    </div>
                  </td>
                  <td className="pe-4 position-relative">
                    <div style={{ cursor: 'pointer' }} onClick={() => setOpenDropdownId(openDropdownId === booking._id ? null : booking._id)}>
                      <img src={more} width={20} alt="actions" />
                    </div>
                    {openDropdownId === booking._id && (
                        <div className="position-absolute bg-white shadow-lg rounded-3 border z-3" style={{ right: '40px', top: '50px', minWidth: '120px' }}>
                            {currentStatus === 'Pending' && (
                              <div className="p-2 dropdown-item fw-medium text-success" style={{ cursor: 'pointer' }} 
                                onClick={() => { setOpenDropdownId(null); setConfirmModal({ isOpen: true, type: 'single', payload: booking._id, actionStatus: 'Completed' }); }}>
                                Accept
                              </div>
                            )}
                            {currentStatus !== 'Canceled' && (
                              <div className="p-2 dropdown-item fw-medium text-danger" style={{ cursor: 'pointer' }} 
                                onClick={() => { setOpenDropdownId(null); setConfirmModal({ isOpen: true, type: 'single', payload: booking._id, actionStatus: 'Canceled' }); }}>
                                Cancel
                              </div>
                            )}
                            {currentStatus === 'Canceled' && (
                                <div className="p-2 text-muted fw-medium text-center" style={{ fontSize: '0.85rem' }}>No actions</div>
                            )}
                        </div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <ConfirmModal 
          isOpen={confirmModal.isOpen}
          title={confirmModal.actionStatus === 'Completed' ? "Confirm Acceptance" : "Confirm Cancellation"}
          message={
            confirmModal.type === 'single' 
              ? `Are you sure you want to mark this booking as ${confirmModal.actionStatus}?`
              : `Are you sure you want to mark ${confirmModal.payload?.length} bookings as ${confirmModal.actionStatus}?`
          }
          confirmText={confirmModal.actionStatus === 'Completed' ? "Yes, Accept" : "Yes, Cancel"}
          onConfirm={executeStatusChange}
          onCancel={() => setConfirmModal({ isOpen: false, type: '', payload: null, actionStatus: '' })}
      />
    </div>
  );
}

export default OrderList;
