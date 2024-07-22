import { NavLink } from "react-router-dom"
import rightChevrone from "../../assets/right-chevron.png"
import image from "../../assets/room1.jpg"

export default function LovedRooms(props) {
    const room = props.room
    return(
        <div>
            <div className="col">
                <div className="card card-cover h-100 overflow-hidden rounded-4 shadow lovedRooms">
                    <div className="d-flex flex-column h-100 p-2 text-black text-shadow-1">
                        <div>
                            <img src={image} className="position-relative w-100 rounded-4" alt="" />
                        </div>
                        <div className="position-absolute mt-2 ms-2 rounded-pill bg-warning px-3 text-dark bg-opacity-70">9.0</div>
                        <h5 className="pt-2 mb-2 lh-1 fw-bold">Room {room.name}</h5>
                        <small>
                            <span className="text-decoration-none text-body-secondary me-lg-4" href="#">2 people,3 kids {room.places}</span>
                        </small>
                        <ul className="d-flex list-unstyled mb-0">
                            <li className="w-100">
                                    <NavLink to={`RoomOverview/${room._id}`} className="text-decoration-none text-body-emphasis me-lg-4" href="#">
                                        <small className="d-flex justify-content-between align-items-center">
                                            from ${room.price}/night
                                            <img src={rightChevrone} alt="" />
                                        </small>
                                    </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}