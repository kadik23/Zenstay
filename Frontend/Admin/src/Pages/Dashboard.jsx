import bed from "../assets/icons/sleeping.png"
import calender from "../assets/icons/calendar.png"
import room from "../assets/img/room5.jpg"
import { NavLink } from "react-router-dom"
import axios from "axios";
import {useState,useEffect} from "react"

export default function Dashboard(){
    const [data, setData] = useState([]);
    useEffect(()=>{
        getRooms()
    }   
    ,[])
    async function getRooms(){
        try{
            let response = await axios.get('getAllRooms')
            if(response){
                console.log(response.data)
                setData(response.data)
            }else{
                console.log('some issues')
            }
        }catch(e){
            console.log(e)
        }
    }
    return(
        <div className="">
            <div className="mb-5">
                <strong className="me-2">
                    Find room to stay
                </strong>
                <img src={bed} width={20} alt="" />
            </div>
            <form action="" className="d-flex gap-3 mb-5">
                <div className="">
                    <h4 className="fw-bold mb-3">Date</h4>
                    <div className="bg-white rounded-4 p-2">
                        <img src={calender} width={25} alt="" />
                        <input className="ms-2 border-0 p-2" style={{fontWeight:"500"}} type="text" name="" id="" placeholder="Jul 12 - Jul 14" />
                    </div>
                </div>
                <div>
                <h4 className="fw-bold mb-3 text-end">Room Number</h4>
                    <div className="bg-white rounded-4 p-2">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.33333 14.1666V5.83331L9.16666 14.1666V5.83331M12.5 14.1666H16.6667M12.5 8.33331C12.5 8.99635 12.7195 9.63224 13.1102 10.1011C13.5009 10.5699 14.0308 10.8333 14.5833 10.8333C15.1359 10.8333 15.6658 10.5699 16.0565 10.1011C16.4472 9.63224 16.6667 8.99635 16.6667 8.33331C16.6667 7.67027 16.4472 7.03439 16.0565 6.56555C15.6658 6.09671 15.1359 5.83331 14.5833 5.83331C14.0308 5.83331 13.5009 6.09671 13.1102 6.56555C12.7195 7.03439 12.5 7.67027 12.5 8.33331Z" stroke="#71B0FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <input className="ms-2 border-0 p-2" style={{fontWeight:"500"}} type="text" name="" id="" placeholder="Yogyakarta, Ind..." />
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <div style={{height:"45%"}}>

                    </div>
                    <button className="btn btn-primary h-50 px-4 rounded-4">Search</button>
                </div>
            </form>
            <div className="mb-5">
                <div className="d-flex align-items-center justify-content-between">
                    <h4 className="fw-bold mb-3">Lodging available</h4>
                    <a href="" className="text-decoration-none" style={{color:"#3d94ff"}}>View All</a>
                </div>
                <div className="overflow-hidden">
                    <div className="row flex-nowrap gap-2">
                        <div className="col-4 rounded-4 p-2 bg-white d-flex flex-column gap-4">
                            <div className="">
                                <img src={room} className="w-100 rounded-4" alt="" />
                                <h5 className="">room 1</h5>
                            </div>
                            <div className="fw-bold fs-5">
                                $42.72
                            </div>
                        </div>
                        <div className="col-4 rounded-4 p-2 bg-white d-flex flex-column gap-4">
                            <div className="">
                                <img src={room} className="w-100 rounded-4" alt="" />
                                <h5 className="">room 2</h5>
                            </div>
                            <div className="fw-bold fs-5">
                                $38.42
                            </div>
                        </div>
                        <div className="col-4 rounded-4 p-2 bg-white d-flex flex-column gap-4">
                            <div className="">
                                <img src={room} className="w-100 rounded-4" alt="" />
                                <h5 className="">room 3</h5>
                            </div>
                            <div className="fw-bold fs-5">
                                $40.14
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex gap-5">
                        <NavLink to="/" className="text-decoration-none text-dark">
                            <h4 className="">Most Popular</h4>
                        </NavLink>
                        <NavLink to="/" className="text-decoration-none">
                            <h4 style={{color:"#adadad"}}>Speacial Offers</h4>
                        </NavLink>
                    </div>
                    <div>
                        <a href="" className="text-decoration-none" style={{color:"#3d94ff"}}> View All</a>
                    </div>
                </div>
                <div className="d-flex flex-column gap-3">
                    <div className="d-flex gap-3">
                        <div className="bg-white rounded-4 py-2 ps-2 d-flex justify-content-between align-items-center">
                            <div className="d-flex gap-3">
                                <img src={room} className="w-25 rounded-4" alt="" />
                                <h5 className="">room 3</h5>
                            </div>
                            <div className="fw-bold me-4">
                                $42
                            </div>
                        </div>
                        <div className="bg-white rounded-4 py-2 ps-2 d-flex justify-content-between align-items-center">
                            <div className="d-flex gap-3">
                                <img src={room} className="w-25 rounded-4" alt="" />
                                <h5 className="">room 3</h5>
                            </div>
                            <div className="fw-bold me-4">
                                $42
                            </div>
                        </div>
                    </div>
                    <div className="d-flex gap-3">
                        <div className="bg-white rounded-4 py-2 ps-2 d-flex justify-content-between align-items-center">
                            <div className="d-flex gap-3">
                                <img src={room} className="w-25 rounded-4" alt="" />
                                <h5 className="">room 3</h5>
                            </div>
                            <div className="fw-bold me-4">
                                $42
                            </div>
                        </div>
                        <div className="bg-white rounded-4 py-2 ps-2 d-flex justify-content-between align-items-center">
                            <div className="d-flex gap-3">
                                <img src={room} className="w-25 rounded-4" alt="" />
                                <h5 className="">room 3</h5>
                            </div>
                            <div className="fw-bold me-4">
                                $42
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}