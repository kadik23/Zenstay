import { NavLink } from "react-router-dom";
import useSettingsStore from "../../Hooks/useSettingsStore";
import { getImageUrl } from "../../Utils/getImageUrl";

export default function Popular({room}) {
    const currencySymbol = useSettingsStore(state => state.currencySymbol);
    const bgImage = `url("${getImageUrl(room?.images?.[0])}")`;

    return(
        <div>           
            <div className="col">
                <div className="popularCard card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style={{ backgroundImage: bgImage }}>
                    <div className="d-flex flex-column h-100 py-3 px-4 pb-3 text-white text-shadow-1">
                        <h3 className="pt-5 mb-4 display-7 lh-1 fw-bold">Room {room.name}</h3>
                        <ul className="d-flex list-unstyled mt-auto">
                            <li className="me-auto">
                                <NavLink to={`/RoomOverview/${room._id}`} className="text-decoration-none text-white shadow-lg me-lg-4">    View Details</NavLink>
                            </li>
                            <li className="rounded-pill bg-white px-2 text-black">
                                <small>{currencySymbol === 'DA' ? `${room.price} ${currencySymbol}` : `${currencySymbol}${room.price}`}</small>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}