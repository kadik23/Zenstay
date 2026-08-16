import React, { useState, useEffect } from 'react';
import searchIcon from '../../assets/icons/search-blue.png';
import more from '../../assets/icons/more.png';
import roomFallback from "../../assets/img/room5.jpg";
import axios from "axios";
import useAlertMessageStore from "../../Hooks/useAlertMessage";

export default function RoomList() {
    const [rooms, setRooms] = useState([]);
    const [activeTab, setActiveTab] = useState('All Rooms');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { setAlert, clearAlert } = useAlertMessageStore();
    const [sliderImages, setSliderImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageFiles, setImageFiles] = useState([]);
    const [formData, setFormData] = useState({
        name: '', price: '', space: '', places: '', guests_number: '', bed_type: 'single bed', images: [],
        bathrrom: false, key_card_access: false, air_conditioning: false, smart_tv: false, free_wifi: false
    });

    useEffect(() => {
        getRooms();
    }, []);

    const getRooms = async () => {
        try {
            let response = await axios.get('/getAdminRoomList');
            if (response.data) {
                setRooms(response.data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(filteredRooms.map(r => r._id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectRow = (id) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleDeleteSingle = async (id) => {
        if(window.confirm('Are you sure you want to delete this room?')) {
            try {
                await axios.delete('/delete_room', { data: { _id: id } });
                setRooms(rooms.filter(r => r._id !== id));
                setOpenDropdownId(null);
            } catch (e) {
                console.error('Failed to delete', e);
            }
        }
    };

    const handleBulkDelete = async () => {
        if(window.confirm(`Are you sure you want to delete ${selectedIds.length} rooms?`)) {
            try {
                await axios.post('/delete_bulk_rooms', { roomIds: selectedIds });
                setRooms(rooms.filter(r => !selectedIds.includes(r._id)));
                setSelectedIds([]);
            } catch (e) {
                console.error('Failed to bulk delete', e);
            }
        }
    };

    const handleOpenSlider = (room) => {
        const images = (room.images && room.images.length > 0) ? room.images : [room.image || roomFallback];
        setSliderImages(images);
        setCurrentImageIndex(0);
    };

    const handleCreateRoom = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            let finalImageUrls = formData.images || [];
            
            if (imageFiles && imageFiles.length > 0) {
                const data = new FormData();
                imageFiles.forEach(file => {
                    data.append('photos', file);
                });
                
                const uploadRes = await axios.post('/upload_photos', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                if (uploadRes.data && uploadRes.data.length > 0) {
                    finalImageUrls = uploadRes.data.map(name => `http://localhost:3000/uploads/${name}`);
                }
            }

            await axios.post('/room_post', { ...formData, images: finalImageUrls });
            setIsCreateModalOpen(false);
            setImageFiles([]);
            setFormData({
                name: '', price: '', space: '', places: '', guests_number: '', bed_type: 'single bed', images: [],
                bathrrom: false, key_card_access: false, air_conditioning: false, smart_tv: false, free_wifi: false
            });
            getRooms();
            setAlert({ message: 'Room created successfully!', type: 'success' });
            setTimeout(() => clearAlert(), 3000);
        } catch(err) {
            console.error('Failed to create room', err);
            setAlert({ message: 'Failed to create room.', type: 'danger' });
            setTimeout(() => clearAlert(), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredRooms = rooms.filter(room => {
        const matchesTab = 
            activeTab === 'All Rooms' || 
            (activeTab === 'Available Room' && room.currentStatus === 'Available') || 
            (activeTab === 'Booked' && room.currentStatus === 'Booked');
        
        const q = searchQuery.toLowerCase().trim();
        const shortId = room._id ? `#${room._id.slice(-6).toLowerCase()}` : '';
        const matchesSearch = 
            (room.name && room.name.toLowerCase().includes(q)) || 
            (room._id && room._id.toLowerCase().includes(q)) ||
            (shortId.includes(q));
            
        return matchesTab && matchesSearch;
    });

    const counts = {
        all: rooms.length,
        available: rooms.filter(r => r.currentStatus === 'Available').length,
        booked: rooms.filter(r => r.currentStatus === 'Booked').length
    };

    return (
        <div>
            <div className='mb-5 d-flex align-items-center justify-content-between'>
                <div className='d-flex flex-column gap-1'>
                    <h3 className='fw-bold mb-0' style={{color:"#2b2b2b"}}>Room List</h3>
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
                        {['All Rooms', 'Available Room', 'Booked'].map(tab => {
                            const count = tab === 'All Rooms' ? counts.all : tab === 'Available Room' ? counts.available : counts.booked;
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
                    
                    <button onClick={() => setIsCreateModalOpen(true)} className='btn btn-primary rounded-4 px-4 fw-bold shadow-sm' style={{ flex: '0 0 auto' }}>
                        + Add Room
                    </button>
                </div>
            </div>

            <div className='bg-white rounded-4 shadow-sm overflow-hidden'>
                <table className="table mb-0 table-hover align-middle">
                    <thead className="bg-light">
                        <tr>
                            <th scope="col" className='ps-4 border-0 py-3'>
                                <input type="checkbox" 
                                    className="form-check-input"
                                    checked={selectedIds.length === filteredRooms.length && filteredRooms.length > 0} 
                                    onChange={handleSelectAll} 
                                />
                            </th>
                            <th scope="col" className='border-0 py-3'>Room Name</th>
                            <th scope="col" className='border-0 py-3'>Bed Type</th>
                            <th scope="col" className='border-0 py-3'>Space</th>
                            <th scope="col" className='border-0 py-3'>Guests Number</th>
                            <th scope="col" className='border-0 py-3'>Rating</th>
                            <th scope="col" className='border-0 py-3'>Status</th>
                            <th scope="col" className='border-0 py-3'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRooms.length === 0 && (
                            <tr>
                                <td colSpan="8" className="text-center py-5 text-muted">No rooms found.</td>
                            </tr>
                        )}
                        {filteredRooms.map(room => (
                            <tr key={room._id}>
                                <th scope="row" className='ps-4'>
                                    <input type="checkbox" 
                                        className="form-check-input shadow-none"
                                        checked={selectedIds.includes(room._id)}
                                        onChange={() => handleSelectRow(room._id)}
                                    />
                                </th>
                                <td>
                                    <div className='d-flex gap-3 align-items-center py-2'>
                                        <img src={(room.images && room.images.length > 0) ? room.images[0] : (room.image || roomFallback)} width={120} height={80} 
                                            className='rounded-3 shadow-sm' 
                                            style={{objectFit:"cover", cursor: "pointer"}} alt={room.name} 
                                            onClick={() => handleOpenSlider(room)}
                                        />
                                        <div className='d-flex flex-column' style={{fontWeight:"600"}}>
                                            <span className='text-muted' style={{ fontSize: '0.85rem' }}>#{room._id.slice(-6).toUpperCase()}</span>
                                            {room.name || 'Unnamed Room'}
                                        </div>
                                    </div>
                                </td>
                                <td className='fw-medium text-secondary'>
                                    {room.bed_type}
                                </td>
                                <td className='fw-medium text-secondary'>
                                    {room.space ? `${room.space} m²` : 'N/A'}
                                </td>
                                <td className='fw-medium text-secondary'>
                                    {room.guests_number || room.places || 'N/A'} Guests
                                </td>
                                <td>
                                    <span className="badge bg-warning text-dark rounded-pill px-3 py-2">
                                        ⭐ {room.rating}
                                    </span>
                                </td>
                                <td>
                                    {room.currentStatus === 'Available' ? (
                                        <span className='fw-bold' style={{color:"#77da7e"}}>Available</span>
                                    ) : (
                                        <span className='fw-bold' style={{color:"#ff806f"}}>Booked</span>
                                    )}
                                </td>
                                <td className='pe-4 position-relative'>
                                    <div style={{ cursor: 'pointer' }} onClick={() => setOpenDropdownId(openDropdownId === room._id ? null : room._id)}>
                                        <img src={more} width={20} alt="actions" />
                                    </div>
                                    {openDropdownId === room._id && (
                                        <div className="position-absolute bg-white shadow-lg rounded-3 border z-3" style={{ right: '40px', top: '50px', minWidth: '120px' }}>
                                            <div className="p-2 dropdown-item fw-medium" style={{ cursor: 'pointer' }} onClick={() => setOpenDropdownId(null)}>Edit (Soon)</div>
                                            <div className="p-2 dropdown-item text-danger fw-medium" style={{ cursor: 'pointer' }} onClick={() => handleDeleteSingle(room._id)}>Delete</div>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isCreateModalOpen && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
                    <div className="bg-white rounded-4 shadow-lg p-5" style={{ width: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <h4 className="fw-bold mb-4">Create New Room</h4>
                        <form onSubmit={handleCreateRoom}>
                            <div className="row g-3 mb-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-secondary">Room Name</label>
                                    <input type="text" className="form-control rounded-3 bg-light border-0 py-2" required
                                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-secondary">Price / Night</label>
                                    <input type="number" className="form-control rounded-3 bg-light border-0 py-2" required
                                        value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                                </div>
                                <div className="col-md-12">
                                    <label className="form-label fw-bold text-secondary">Room Images</label>
                                    <input type="file" multiple accept="image/*" className="form-control rounded-3 bg-light border-0 py-2" 
                                        onChange={e => setImageFiles(Array.from(e.target.files))} />
                                    <small className="text-muted mt-1 d-block">Select one or multiple images from your computer</small>
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label fw-bold text-secondary">Space (m²)</label>
                                    <input type="number" className="form-control rounded-3 bg-light border-0 py-2" required
                                        value={formData.space} onChange={e => setFormData({...formData, space: e.target.value})} />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label fw-bold text-secondary">Guests No.</label>
                                    <input type="number" className="form-control rounded-3 bg-light border-0 py-2" required
                                        value={formData.guests_number} onChange={e => setFormData({...formData, guests_number: e.target.value, places: e.target.value})} />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label fw-bold text-secondary">Bed Type</label>
                                    <select className="form-select rounded-3 bg-light border-0 py-2" required
                                        value={formData.bed_type} onChange={e => setFormData({...formData, bed_type: e.target.value})}>
                                        <option value="single bed">Single Bed</option>
                                        <option value="two bed">Two Bed</option>
                                        <option value="queen size bed">Queen Size Bed</option>
                                        <option value="king size bed">King Size Bed</option>
                                    </select>
                                </div>
                            </div>
                            
                            <h6 className="fw-bold text-secondary mt-4 mb-3">Amenities</h6>
                            <div className="d-flex flex-wrap gap-4 mb-4">
                                {['bathrrom', 'key_card_access', 'air_conditioning', 'smart_tv', 'free_wifi'].map(amenity => (
                                    <div className="form-check" key={amenity}>
                                        <input className="form-check-input" type="checkbox" id={amenity}
                                            checked={formData[amenity]} 
                                            onChange={e => setFormData({...formData, [amenity]: e.target.checked})} />
                                        <label className="form-check-label text-capitalize" htmlFor={amenity}>
                                            {amenity.replace(/_/g, ' ')}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="d-flex justify-content-end gap-3 mt-4 pt-3 border-top">
                                <button type="button" className="btn btn-light rounded-4 px-4 fw-bold" onClick={() => setIsCreateModalOpen(false)} disabled={isLoading}>Cancel</button>
                                <button type="submit" className="btn btn-primary rounded-4 px-4 fw-bold shadow-sm" disabled={isLoading}>
                                    {isLoading ? 'Saving...' : 'Save Room'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {sliderImages.length > 0 && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1060 }}>
                    <div className="position-relative bg-white rounded-4 shadow-lg p-3 d-flex flex-column align-items-center" style={{ maxWidth: '800px', width: '90%' }}>
                        <button onClick={() => setSliderImages([])} className="btn-close position-absolute top-3 end-3 m-3" aria-label="Close" style={{ right: '15px', top: '15px' }}></button>
                        <div className="d-flex align-items-center justify-content-center w-100 mt-4 mb-3" style={{ height: '400px', backgroundColor: '#f8f9fa', borderRadius: '12px' }}>
                            <img src={sliderImages[currentImageIndex]} alt="Room Slider" className="rounded-3 shadow-sm" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                        </div>
                        {sliderImages.length > 1 && (
                            <div className="d-flex align-items-center gap-4 mt-2 mb-2">
                                <button className="btn btn-primary rounded-circle fw-bold shadow-sm d-flex align-items-center justify-content-center" 
                                    style={{ width: '45px', height: '45px', fontSize: '1.2rem' }}
                                    onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1))}>
                                    &lsaquo;
                                </button>
                                <span className="fw-bold text-secondary fs-5">{currentImageIndex + 1} / {sliderImages.length}</span>
                                <button className="btn btn-primary rounded-circle fw-bold shadow-sm d-flex align-items-center justify-content-center" 
                                    style={{ width: '45px', height: '45px', fontSize: '1.2rem' }}
                                    onClick={() => setCurrentImageIndex((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1))}>
                                    &rsaquo;
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}