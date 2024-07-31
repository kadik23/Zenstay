import { NavLink } from "react-router-dom"
import image from "../../assets/room2.jpg"
export default function RoomsCards({room}) {
    
    return (

        <div className="col mb-3">
            <div className="card card-cover h-100 overflow-hidden rounded-4 shadow-lg">
                <div className="d-lg-flex align-items-center justify-content-between h-100 p-2 pb-3 text-dark text-shadow-1">
                    <div className="d-lg-flex gap-3 h-lg-100">
                        <div className="Rooms-cards-img">
                            <img width={300} src={image} className="rounded-4" alt="" />
                        </div>
                        <div className="h-lg-100 d-flex flex-column">
                            <h4 className="mb-auto">Room {room.name}</h4>
                            {room.air_conditioning && (<span>1x Air conditioning</span>)}
                            {room.bathroom && (<span>1x Bathroom</span>)}
                            {room.free_wifi && (<span>1x Free Wifi</span>)}
                            {room.key_card_access && (<span>1x Key Card Access</span>)}
                            {room.smart_tv && (<span>1x Smart TV</span>)}
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
                            <span className="rating rounded-pill px-3">{room.rating}</span>
                        </div>
                        <strong className="align-self-end">${room.price}</strong>
                        <span className="align-self-end">1x {room.bed_type}</span>
                        <NavLink to={`/BookingOpt/${room._id}`} className="w-md-75 btn btn-primary rounded-pill w-lg-100 mt-2">See booking options</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}