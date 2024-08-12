import SideBar from "../../Components/guest/SideBar";
import RoomsCards from "../../Components/guest/RoomsCards";
import axios from 'axios'
import { useEffect,useState } from "react";
import useRoomsStore from "../../Hooks/useRoomsStore";
export default function PreviewRooms() {
    const { rooms, fetchRooms, filteredRooms, } = useRoomsStore();
    useEffect(() =>{
        fetchRooms()
    },[])

    if (!rooms) {
        return <div>Loading...</div>;
    }
    
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
                        <select className="form-select rounded-pill" style={{width:"110px"}} id="state">
                            <option value="">sort by</option>
                            <option></option>
                        </select>
                    </div>
                    <div className="row row-cols-md-2 row-cols-sm-1 row-cols-lg-1 mt-3">
                        {filteredRooms && filteredRooms.map(room => <RoomsCards key={room.id} room={room} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}