import Banner from "../../Components/guest/Banner"
import Popular from "../../Components/guest/Popular"
import LovedRooms from "../../Components/guest/LovedRooms"
import axios from 'axios'
import { useEffect, useState} from 'react'
import useRoomsStore from "../../Hooks/useRoomsStore"
import Loading from "../../Components/guest/Loading"

export default function PopularRooms() {
    const rooms = useRoomsStore((state) => state.rooms);
    const fetchRooms = useRoomsStore((state) => state.fetchRooms);

    useEffect(() => {
        fetchRooms();
    }, []);
    if(!rooms){
        return (<Loading/>)
    }
    return (
    <div className="container px-4 mt-5 py-3" id="custom-cards">
        <h4>Popular Rooms</h4>
        <div className="row row-cols-1 row-cols-lg-4 align-items-stretch g-4 py-2">
            {rooms && rooms.map( (room)=> 
            <Popular room = {room} key={room._id}/>
            )}
        </div>
    </div>
    )
}
