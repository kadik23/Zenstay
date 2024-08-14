import Banner from "../../Components/guest/Banner"
import Popular from "../../Components/guest/Popular"
import LovedRooms from "../../Components/guest/LovedRooms"
import axios from 'axios'
import { useEffect, useState} from 'react'
import useRoomsStore from "../../Hooks/useRoomsStore"

export default function Home() {
    const rooms = useRoomsStore((state) => state.rooms);
    const fetchRooms = useRoomsStore((state) => state.fetchRooms);

    useEffect(() => {
        fetchRooms();
    }, []);
    if(!rooms){
        return (
            <div class="d-flex justify-content-center align-items-center vh-100">
                <div class="spinner-border text-primary me-3" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="fs-4 text-primary">Loading...</div>
            </div>
        )
    }
    return (
    <>
        <Banner />
        <div className="container px-4 py-3" id="custom-cards">
            <h4>Popular Rooms</h4>
            <div className="row row-cols-1 row-cols-lg-4 align-items-stretch g-4 py-2">
                {rooms.map( (room)=> 
                <Popular room = {room} key={room._id}/>
                )}
            </div>
        </div>
        <div className="comtainer">
            
        </div>
        <div className="container px-4 py-3" id="featured-3">
            <h6>Rooms loved by guests</h6>
            <div className="row g-2 py-3 row-cols-1 row-cols-lg-5">
                {rooms.map(room => 
                    parseInt(room.rating)<= 9.0 && <LovedRooms room = {room} key= {room._id} />
                )}
            </div>
        </div>
    </>
  )
}
