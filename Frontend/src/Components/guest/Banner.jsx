import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRoomsStore from "../../Hooks/useRoomsStore";

export default function Banner() {
    const rooms = useRoomsStore((state) => state.rooms);
    const fetchRooms = useRoomsStore((state) => state.fetchRooms);
    
    const [bedType, setBedType] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (bedType) params.append("bedType", bedType);
        if (checkIn) params.append("checkIn", checkIn);
        if (checkOut) params.append("checkOut", checkOut);
        if (guests) params.append("guests", guests);
        navigate(`/PreviewRooms?${params.toString()}`);
    }

    return(
        <div style={{ marginBottom: '80px' }}>
            <div className="container position-relative">
                <div className="banner p-4 p-md-5 rounded-4 text-white text-center position-relative" style={{ minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div>
                        <h1 className="display-5 fw-bold">Book your stay with Zenstay</h1>
                        <p className="lead my-3 fw-700">{rooms && rooms.length} rooms around the world are waiting for you!</p>
                    </div>
                </div>
                
                {/* Search Bar Pill */}
                <div className="position-absolute start-50 translate-middle-x bg-white rounded-pill shadow-lg d-flex align-items-center px-4 py-2 w-100" 
                     style={{ bottom: '-35px', maxWidth: '900px', zIndex: 10, minHeight: '70px' }}>
                     
                    <div className="flex-grow-1 border-end px-3">
                        <small className="text-dark fw-bold d-block mb-1 text-start">Bed Type</small>
                        <select className="form-select border-0 p-0 text-muted shadow-none bg-transparent" value={bedType} onChange={e => setBedType(e.target.value)} style={{ cursor: 'pointer' }}>
                            <option value="">What bed type?</option>
                            <option value="single bed">Single bed</option>
                            <option value="two bed">Two bed</option>
                            <option value="queen size bed">Queen size bed</option>
                            <option value="king size bed">King size bed</option>
                        </select>
                    </div>

                    <div className="flex-grow-1 border-end px-3">
                        <small className="text-dark fw-bold d-block mb-1 text-start">Check-in</small>
                        <input type="date" className="form-control border-0 p-0 text-muted shadow-none bg-transparent" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                    </div>

                    <div className="flex-grow-1 border-end px-3">
                        <small className="text-dark fw-bold d-block mb-1 text-start">Check-out</small>
                        <input type="date" className="form-control border-0 p-0 text-muted shadow-none bg-transparent" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                    </div>

                    <div className="flex-grow-1 px-3">
                        <small className="text-dark fw-bold d-block mb-1 text-start">Guests</small>
                        <input type="number" className="form-control border-0 p-0 text-muted shadow-none bg-transparent" placeholder="Number of guests" value={guests} onChange={e => setGuests(e.target.value)} min="1" />
                    </div>

                    <button className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center p-0 ms-2" 
                            style={{ width: '50px', height: '50px', flexShrink: 0 }} onClick={handleSearch}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}