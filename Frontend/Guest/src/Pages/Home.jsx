import Banner from "../Components/Banner"
import Popular from "../Components/Popular"
import LovedRooms from "../Components/LovedRooms"
import axios from 'axios'
import {userContext} from "./UserContext";    
import {useContext, useEffect, useState} from 'react'

export default function Home() {
    const [user,setUser] = useContext(userContext);
    const [rooms,setRooms] = useState([]);
    useEffect(()=>{
        if(user)
        console.log(user.username)
        getRooms()
    },[])
    async function getRooms(){
        try{
            let response = await axios.get('getAllRooms')
            if(response){
                setRooms(response.data)
                console.log(rooms)
            }else{
                console.log('some issues')
            }
        }catch(e){  
            console.log(e)
        }
    }
    return (
    <>
        <Banner />
        <div className="container px-4 py-3" id="custom-cards">
            <h4>Room Services</h4>
            <div className="row row-cols-1 row-cols-lg-4 align-items-stretch g-4 py-2">
                { rooms.map( (room)=> 
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
                    <LovedRooms room = {room} key= {room._id} />
                )}
            </div>
        </div>
    </>
  )
}
