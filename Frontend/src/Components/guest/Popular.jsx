import { NavLink } from "react-router-dom";
import useSettingsStore from "../../Hooks/useSettingsStore";
import { getImageUrl } from "../../Utils/getImageUrl";

export default function Popular({room}) {
    const currencySymbol = useSettingsStore(state => state.currencySymbol);
    const bgImage = `url("${getImageUrl(room?.images?.[0])}")`;

    return (
        <div className="col mb-3">
            <div className="popularCard card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-sm border-0" 
                 style={{ backgroundImage: bgImage }}>
                <div className="d-flex flex-column h-100 p-3 text-white text-shadow-1 popularCard-overlay">
                    <div className="d-flex justify-content-between align-items-center mb-auto">
                        <span className="badge bg-primary rounded-pill px-3 py-1 fw-semibold small">Popular</span>
                        {room.rating && (
                            <span className="badge bg-warning text-dark rounded-pill px-2 py-1 fw-bold small">⭐ {room.rating}</span>
                        )}
                    </div>
                    <h5 className="pt-2 mb-2 fw-bold text-white text-truncate" title={`Room ${room.name}`}>
                        Room {room.name}
                    </h5>
                    <ul className="d-flex list-unstyled mt-auto mb-0 align-items-center">
                        <li className="me-auto">
                            <NavLink to={`/RoomOverview/${room._id}`} className="btn btn-sm btn-outline-light rounded-pill px-3 py-1">
                                View Details
                            </NavLink>
                        </li>
                        <li className="rounded-pill bg-white px-3 py-1 text-black fw-bold">
                            <small>{currencySymbol === 'DA' ? `${room.price} ${currencySymbol}` : `${currencySymbol}${room.price}`}</small>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}