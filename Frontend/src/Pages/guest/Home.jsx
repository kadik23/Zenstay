import Banner from "../../Components/guest/Banner"
import Popular from "../../Components/guest/Popular"
import LovedRooms from "../../Components/guest/LovedRooms"
import axios from 'axios'
import { useEffect, useState} from 'react'

export default function Home() {
    const [rooms,setRooms] = useState([]);
    useEffect(()=>{
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
