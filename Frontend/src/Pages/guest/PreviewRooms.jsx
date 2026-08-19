import SideBar from "../../Components/guest/SideBar";
import RoomsCards from "../../Components/guest/RoomsCards";
import axios from 'axios'
import { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import useRoomsStore from "../../Hooks/useRoomsStore";
import Loading from "../../Components/guest/Loading";

export default function PreviewRooms() {
    const { rooms, fetchRooms, filteredRooms, setSortBy, setBedType, setCheckIn, setCheckOut, setGuests } = useRoomsStore();
    const location = useLocation();

    useEffect(() =>{
        const params = new URLSearchParams(location.search);
        
        if (params.has("bedType")) setBedType(params.get("bedType"));
        if (params.has("checkIn")) setCheckIn(params.get("checkIn"));
        if (params.has("checkOut")) setCheckOut(params.get("checkOut"));
        if (params.has("guests")) setGuests(params.get("guests"));

        fetchRooms()
    }, [location.search]);

    if(!rooms){
        return (<Loading/>)
    }

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };
    
    if (rooms.length === 0) {
        return <div>No rooms available</div>;
    }
    
    return(
        <div>
            <div className="d-flex flex-column flex-md-row">
                <div >
                    <SideBar />
                </div>
                <div className="flex-grow-1 px-4" style={{marginLeft:"36opx"}}>
                    <div className="d-flex justify-content-between align-items-center" style={{marginTop:"60px"}}>
                        <h4>Room Services</h4>
                        <select 
                            className="form-select rounded-pill" 
                            style={{ width: "110px" }} 
                            onChange={handleSortChange}
                        >
                            <option value="">Sort by</option>
                            <option value="price">Price</option>
                            <option value="rating">Rating</option>
                        </select>
                    </div>
                    <div className="row row-cols-md-2 row-cols-sm-1 row-cols-lg-1 mt-3">
                        {filteredRooms && filteredRooms.map(room => <RoomsCards key={room._id} room={room} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}