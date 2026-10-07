import { NavLink } from "react-router-dom";
import rightChevrone from "../../assets/right-chevron.png";
import { getImageUrl } from "../../Utils/getImageUrl";
import useSettingsStore from "../../Hooks/useSettingsStore";

export default function LovedRooms(props) {
    const room = props.room;
    const currencySymbol = useSettingsStore(state => state.currencySymbol);
    const displayPrice = currencySymbol === 'DA' ? `${room.price} ${currencySymbol}` : `${currencySymbol}${room.price}`;

    return (
        <div className="col mb-3">
            <div className="card card-cover h-100 overflow-hidden rounded-4 shadow-sm border-0 lovedRooms">
                <div className="d-flex flex-column h-100 p-2 text-black">
                    <div className="position-relative loved-room-img-wrapper">
                        <NavLink to={`/RoomOverview/${room._id}`}>
                            <img 
                                src={getImageUrl(room?.images?.[0])} 
                                className="w-100 rounded-4 loved-room-img" 
                                alt={room.name} 
                            />
                        </NavLink>
                        {room.rating && (
                            <div className="position-absolute top-0 start-0 m-2 rounded-pill bg-warning px-2 py-1 text-dark fw-bold shadow-sm" style={{ fontSize: '0.75rem' }}>
                                ⭐ {room.rating}
                            </div>
                        )}
                    </div>
                    <div className="d-flex flex-column flex-grow-1 pt-2">
                        <NavLink to={`/RoomOverview/${room._id}`} className="text-decoration-none text-dark">
                            <h6 className="pt-1 mb-1 fw-bold text-truncate" title={`Room ${room.name}`}>Room {room.name}</h6>
                        </NavLink>
                        <small className="text-muted mb-2">
                            {room.guests_number || room.places || 1} people • {room.bed_type}
                        </small>
                        <ul className="d-flex list-unstyled mb-0 mt-auto">
                            <li className="w-100">
                                <NavLink to={`/RoomOverview/${room._id}`} className="text-decoration-none text-body-emphasis">
                                    <small className="d-flex justify-content-between align-items-center fw-medium py-1">
                                        <span>from {displayPrice}/night</span>
                                        <img src={rightChevrone} alt="" width={14} height={14} />
                                    </small>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}