import { NavLink } from "react-router-dom"
import image from "../assets/room2.jpg"
export default function RoomsCards() {
    
    return (

        <div className="col mb-3">
            <div className="card card-cover h-100 overflow-hidden rounded-4 shadow-lg">
                <div className="d-lg-flex align-items-center justify-content-between h-100 p-2 pb-3 text-dark text-shadow-1">
                    <div className="d-lg-flex gap-3 h-lg-100">
                        <div className="Rooms-cards-img">
                            <img width={300} src={image} className="rounded-4" alt="" />
                        </div>
                        <div className="h-lg-100 d-flex flex-column">
                            <h4 className="mb-auto">Hotel Norrebro</h4>
                            <span>comfort room</span>
                            <span>1x king size bed</span>
                            <span>1x bathroom</span>
                            <div className="mt-3 d-lg-flex align-items-center">
                                <div className="d-md-block border border-primary rounded-pill p-1 px-3 text-primary me-2 "
                                style={{width:"fit-content"}}>
                                    #Hot deal
                                </div>
                                <div className="d-md-block border border-primary rounded-pill p-1 px-3 text-primary"
                                style={{width:"fit-content"}} >
                                    #Popular
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="h-100 d-flex flex-column">
                        <div className="d-flex mb-lg-auto justify-content-lg-end justify-content-center align-items-center w-100 mb-lg -auto">
                            <span className="flex-1 rounded-pill px-3 room-status">Excellent</span>
                            <span className="rating rounded-pill px-3">9.0</span>
                        </div>
                        <strong className="align-self-end">$180</strong>
                        <span className="align-self-end">1x king size bed</span>
                        <NavLink to='/BookingOpt' className="w-md-75 btn btn-primary rounded-pill w-lg-100 mt-2">see booking options</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}