import { NavLink } from "react-router-dom"
import rightChevrone from "../assets/right-chevron.png"
import image from "../assets/room1.jpg"

export default function LovedRooms() {
    
    return(
        <div>
            <div className="col">
                <div className="card card-cover h-100 overflow-hidden rounded-4 shadow-lg lovedRooms">
                    <div className="d-flex flex-column h-100 p-2 text-black text-shadow-1">
                        <div>
                            <img src={image} className="position-relative w-100 rounded-4" alt="" />
                        </div>
                        <div className="position-absolute mt-2 ms-2 rounded-pill bg-warning px-3 text-dark bg-opacity-70">9.0</div>
                        <h5 className="pt-2 mb-2 lh-1 fw-bold">Room</h5>
                        <small>
                            <span className="text-decoration-none text-body-secondary me-lg-4" href="#">2 people,3 kids</span>
                        </small>
                        <ul className="d-flex list-unstyled mb-0">
                            <li className="w-100">
                                    <NavLink to='RoomsOverview' className="text-decoration-none text-body-emphasis me-lg-4" href="#">
                                        <small className="d-flex justify-content-between align-items-center">
                                            from $130/night
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