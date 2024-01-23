import Banner from "../Components/Banner"
import Popular from "../Components/Popular"
import LovedRooms from "../Components/LovedRooms"
import axios from 'axios'
import {userContext} from "./UserContext";    
import {useContext, useEffect} from 'react'

export default function Home() {
    const [user,setUser] = useContext(userContext);
    useEffect(()=>{
        if(user)
        console.log(user.username)
        getRooms()
    },[])
    async function getRooms(){
        try{
            let response = await axios.get('getAllRooms')
            if(response){
                console.log(response.data)
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
                <Popular />
                <Popular />
                <Popular />
                <Popular />
            </div>
        </div>
        <div className="comtainer">
            
        </div>
        <div className="container px-4 py-3" id="featured-3">
            <h6>Rooms loved by guests</h6>
            <div className="row g-2 py-3 row-cols-1 row-cols-lg-5">
                <LovedRooms />
                <LovedRooms />
                <LovedRooms />
                <LovedRooms />
                <LovedRooms />
            </div>
        </div>
    </>
  )
}
