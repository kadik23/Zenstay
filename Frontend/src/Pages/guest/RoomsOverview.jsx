import image from "../../assets/room1.jpg";
import backarrow from "../../assets/icons/back-arrow.png"
import adulticon from "../../assets/icons/person.png"
import kidicon from "../../assets/icons/jumping-man.png"
import bedicon from "../../assets/icons/sleeping.png"
import kingbedicon from "../../assets/icons/bed.png"
import wifiicon from "../../assets/icons/wi-fi.png"
import smarttvicon from "../../assets/icons/smart-tv.png"
import keycardicon from "../../assets/icons/card-key.png"
import airconicon from "../../assets/icons/air-conditioner.png"
import plusicon from "../../assets/icons/plus.png"
import bathroom from "../../assets/icons/bathroom.png"
import { NavLink } from "react-router-dom";
import { useEffect } from "react"
import { useParams } from 'react-router-dom';
import useUserStore from "../../Hooks/useUserStore";
import useRoomStore from "../../Hooks/useRoomStore";
import getRatingStatus from "../../Utils/getRatingStatus";

export default function RoomsOverview() {

    const {user,setUser} = useUserStore()
    const {id} = useParams();
    const {room,fetchRoomById} = useRoomStore()

    useEffect(()=>{
        fetchRoomById(id)
    }
    ,[id])

    return(
        <div className="container">
            <div style={{marginTop:"60px"}} className="pb-4">
                <NavLink to='/PreviewRooms' href="#"><img src={backarrow} alt="" /></NavLink>
            </div>
            <div className="row row-cols-1 row-cols-lg-2 mb-4">
                <div className="col mb-3 mb-lg-0">
                    <img src={image} className="w-100 h-100 rounded-4" alt="" />
                </div>
                <div className="col d-flex flex-column gap-3">
                    <div className="row mb-3">
                        <div className="col-6">
                            <img src={image} className="w-100 h-100 rounded-4" alt="" />
                        </div>
                        <div className="col-6">
                            <img src={image} className="w-100 h-100 rounded-4" alt="" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <img src={image} className="w-100 h-100 rounded-4" alt="" />
                        </div>
                        <div className="col-6">
                            <img src={image} className="w-100 h-100 rounded-4" alt="" />
                        </div>
                    </div>
                </div>
            </div>

            {room && (
            <>
            <div className="d-flex flex-column flex-md-row justify-content-md-center align-items-start align-items-md-center mb-3">
                <div className="w-50 order-2 order-md-1 mb-3 mb-md-0">
                    <h4 className="mb-2 fw-bold">Room {room.name}</h4>
                    <div className="d-flex align-items-center">
                        <span className="d-flex align-items-center">
                            <img width={20} src={adulticon} alt="" /> {room.guests_number} Adults 
                        </span>
                    </div>
                </div>
                <div className="d-flex justify-content-end align-items-center w-100 order-1 order-md-2">
                    <span className="flex-1 rounded-pill px-3 room-status">{getRatingStatus(room.rating)}</span>
                    <span className="rating rounded-pill px-3">{room.rating}</span>
                </div>
            </div>
            <a href="#" className="text-decoration-none text-primary fw-bold">Overview</a>
            <h5 className="mt-4">Room overview</h5>
            <div className="row row-cols-md-3 row-cols-2 w-100">
                <div className="col row">
                    <div className="col d-flex flex-column">
                    {room.free_wifi && ( 
                        <div>
                            <img src={wifiicon} width={20} className="me-2" alt="" />
                            <span>Free wifi</span>
                        </div>
                    )}
                    {room.air_conditioning && ( 
                        <div>
                            <img src={airconicon} width={20} className="me-2" alt="" />
                            <span>Air conditioning</span>
                        </div>
                    )}
                    </div>
                </div>
                <div className="col row">
                    <div className="col d-flex flex-column">
                    {room.key_card_access && ( 
                        <div>
                            <img src={keycardicon} width={20} className="me-2" alt="" />
                            <span>Key and card access</span>
                        </div>
                    )}
                    {room.bed_type == "king size bed" || room.bed_type == "queen size bed" 
                    ? ( 
                        <div>
                            <img src={kingbedicon} width={20} className="me-2" alt="" />
                            <span>{room.bed_type}</span>
                        </div>
                    )
                    : (
                        <div>
                            <img src={bedicon} width={20} className="me-2" alt="" />
                            <span>{room.bed_type}</span>
                        </div>
                    )}
                    </div>
                </div>
                <div className="col row">
                    <div className="col d-flex flex-column">
                        {room.smart_tv && ( 
                            <div>
                                <img src={smarttvicon} width={20} className="me-2" alt="" />
                                <span>Smart TV</span>
                            </div>
                        )}
                        {room.bathroom && ( 
                        <div>
                            <img src={bathroom} width={20} className="me-2" alt="" />
                            <span>Private bathroom</span>
                        </div>
                        )}
                    </div>
                </div>
            </div>
            <hr className="my-4 border-t border-gray-300" />
            <h5 className="mt-4">Reviews</h5>
            <div className="row row-clos-md-2 row-cols-1">
                <div className="col-md-4 col">
                    <div className="display-6 text-primary mb-2"><strong>{room.rating}/10</strong></div>
                    <div>
                        <div className="d-flex justify-content-between align-items-center text-secondary mb-1">
                            <span>
                                Cleanliness
                            </span>
                            <span>
                                10/10
                            </span>

                        </div>
                        <div className="progress mb-3 rounded-pill">
                            <div className="progress-bar" style={{width:"100%"}} role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <div>
                        <div className="d-flex justify-content-between align-items-center text-secondary mb-1">
                            <span>
                                Amenities
                            </span>
                            <span>
                                7/10
                            </span>

                        </div>
                        <div className="progress mb-3 rounded-pill">
                            <div className="progress-bar" style={{width:"70%"}} role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <div>
                        <div className="d-flex justify-content-between align-items-center text-secondary mb-1">
                            <span>
                                Bathroom
                            </span>
                            <span>
                                9/10
                            </span>

                        </div>
                        <div className="progress mb-3 rounded-pill">
                            <div className="progress-bar" style={{width:"90%"}} role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <div>
                        <div className="d-flex justify-content-between align-items-center text-secondary mb-1">
                            <span>
                                Comfort
                            </span>
                            <span>
                                8/10
                            </span>

                        </div>
                        <div className="progress mb-3 rounded-pill">
                            <div className="progress-bar" style={{width:"80%"}} role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <div>
                        <div className="d-flex justify-content-between align-items-center text-secondary mb-1">
                            <span>
                                Wifi Connection
                            </span>
                            <span>
                                9/10
                            </span>

                        </div>
                        <div className="progress mb-3 rounded-pill">
                            <div className="progress-bar" style={{width:"90%"}} role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 col">
                    {/* <div className="row row-cols-1">
                        <div className="col d-flex justify-content-between">
                            <div className="">
                                <div className="">
                                    <strong className="">Hotel Norrebro</strong>
                                </div>
                                <span className="text-secondary">Mark M.</span>
                                <div className="mb-3">
                                    <p className="mb-3">
                                        we enjoyed our stay at this Hotelwe will definetly come back
                                    </p>
                                    <div>
                                        <div className="d-flex align-items-center mb-1">
                                            <img src={plusicon} width={10} alt="" />
                                            <span className="ms-2">Great location!</span>
                                        </div>
                                        <div className="d-flex align-items-center mb-1">
                                            <img src={plusicon} width={10} alt="" />
                                            <span className="ms-2">Service</span>
                                        </div>
                                        <div className="d-flex align-items-center mb-1">
                                            <img src={plusicon} width={10} alt="" />
                                            <span className="ms-2">Bottle of champagne in the room!</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-column justify-content-between">
                                <div className="">
                                    <span className="flex-1 rounded-pill px-3 room-status">Excellent</span>
                                    <span className="rating rounded-pill px-3">10</span>
                                </div>
                                <div className="">
                                    <div className="text-secondary">Reviewed on</div>
                                    <div className="text-secondary">20 September, 2022</div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {/* Comments soon... */}
                </div>
            </div>
            
            </>
        )}
        </div>
    )
}