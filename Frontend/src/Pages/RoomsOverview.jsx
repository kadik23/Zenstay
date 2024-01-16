import image from "../assets/room1.jpg";
import backarrow from "../assets/icons/back-arrow.png"
import adulticon from "../assets/icons/person.png"
import kidicon from "../assets/icons/jumping-man.png"
import bedicon from "../assets/icons/sleeping.png"
import kingbedicon from "../assets/icons/bed.png"
import wifiicon from "../assets/icons/wi-fi.png"
import smarttvicon from "../assets/icons/smart-tv.png"
import keycardicon from "../assets/icons/card-key.png"
import airconicon from "../assets/icons/air-conditioner.png"
import plusicon from "../assets/icons/plus.png"
import { NavLink } from "react-router-dom";
import axios from 'axios'

export default function RoomsOverview() {

    async function getPreviewRoom(id){
        try{
            let response = await axios.get(`/getOneRoom/${id}`)
            if(response){
                console.log(response.data)
            }else{
                console.log('No data received from the server')
            }
        }catch(e){
            console.log(e)
        }
    }

    return(
        <div className="container">
            <div style={{marginTop:"60px"}} className="pb-4">
                <NavLink to='/PreviewRooms' href="#"><img src={backarrow} alt="" /></NavLink>
            </div>
            <div className="p-0 row row-cols-lg-2 row-cols-sm-1 mb-4">
                <div className="me-2 p-0 col-lg-6 h-100 w-sm-100">
                    <img src={image} className="h-100 rounded-4 w-100" alt="" />
                </div>
                <div className="p-0 col-lg-6 row pe-sm-0 pe-lg-2 w-sm-100">
                    <div className="col-6 gap-2 pe-lg-2 d-flex flex-column justify-content-between">
                        <img src={image} className="w-100 h-50 rounded-4" alt="" />
                        <img src={image} className="w-100 h-50 rounded-4" alt="" />

                    </div>
                    <div className="p-0 col-6 gap-2 pe-sm-0 pe-lg-2 d-flex flex-column">
                        <img src={image} className="w-100 h-50 rounded-4" alt="" />
                        <img src={image} className="w-100 h-50 rounded-4" alt="" />
                    </div>

                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center mb-3">
                <div className="w-50">
                    <h4 className="mb-2 fw-bold">Hotel Norrebro</h4>
                    <div className="d-flex align-items-center">
                        <span className="d-flex align-items-center"><img width={20} src={adulticon} alt="" />2 adults</span>
                        <span className="mx-2">/</span>
                        <span className="d-flex align-items-center"><img src={kidicon} width={20} alt="" /> 3 kids </span>
                    </div>
                </div>
                <div className="d-flex mb-lg-auto justify-content-end align-items-center w-100 mb-lg -auto">
                            <span className="flex-1 rounded-pill px-3 room-status">Excellent</span>
                            <span className="rating rounded-pill px-3">9.0</span>
                </div>
            </div>
            <a href="#" className="text-decoration-none text-primary fw-bold">Overview</a>
            <h5 className="mt-4">Room overview</h5>
            <div className="row row-cols-md-3 w-100">
                <div className="col row">
                    <div className="col d-flex flex-column">
                        <div>
                            <img src={wifiicon} width={20} className="me-2" alt="" />
                            <span>free wifi</span>
                        </div>
                        <div>
                            <img src={airconicon} width={20} className="me-2" alt="" />
                            <span>Air conditioning</span>
                        </div>
                    </div>
                </div>
                <div className="col row">
                    <div className="col d-flex flex-column">
                        <div>
                            <img src={keycardicon} width={20} className="me-2" alt="" />
                            <span>Key and card access</span>
                        </div>
                        <div>
                            <img src={kingbedicon} width={20} className="me-2" alt="" />
                            <span>king size bed</span>
                        </div>
                    </div>
                </div>
                <div className="col row">
                    <div className="col d-flex flex-column">
                        <div>
                            <img src={smarttvicon} width={20} className="me-2" alt="" />
                            <span>Smart TV</span>
                        </div>
                        <div>
                            <img src={bedicon} width={20} className="me-2" alt="" />
                            <span>2 bed</span>
                        </div>
                    </div>
                </div>
            </div>
            <h5 className="mt-4">Reviews</h5>
            <div className="row row-clos-md-2 row-cols-1">
                <div className="col-md-4 col">
                    <div className="display-6 text-primary mb-2"><strong>9.6/10</strong></div>
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
                                Location
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
                    <div className="row row-cols-1">
                        <div className="col d-flex justify-content-between">
                            <div className="">
                                <div className="">
                                    <strong className="">Hotel Norrebro</strong>
                                </div>
                                <span className="text-secondary">Mark M.</span>
                                <div className="mb-3">
                                    <p className="mb-3">
                                        we enjoyed our stay at this Hotelwe will definetlycome back
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
                    </div>
                </div>
            </div>
        </div>
    )
}