import { NavLink } from "react-router-dom";
import { getImageUrl } from "../../Utils/getImageUrl";
import getRatingStatus from "../../Utils/getRatingStatus";
import useSettingsStore from "../../Hooks/useSettingsStore";

export default function RoomsCards({room}) {
    const currencySymbol = useSettingsStore(state => state.currencySymbol);
    const displayPrice = currencySymbol === 'DA' ? `${room.price} ${currencySymbol}` : `${currencySymbol}${room.price}`;

    function getRatingClass(rating) {
        const r = parseFloat(rating) || 0;
        if (r < 5.0) return 'bad';
        if (r < 6.0) return 'alright';
        if (r < 7.0) return 'good';
        return 'excellent';
    }

    function getRatingClassState(rating) {
        const r = parseFloat(rating) || 0;
        if (r < 5.0) return 'bad-room-status';
        if (r < 6.0) return 'alright-room-status';
        if (r < 7.0) return 'good-room-status';
        return 'excellent-room-status';
    }

    return (
        <div className="col mb-3">
            <div className="card card-cover h-100 overflow-hidden rounded-4 shadow-sm border-0 room-listing-card">
                <div className="d-flex flex-column flex-lg-row align-items-stretch justify-content-between h-100 p-3 text-dark text-shadow-1 gap-3">
                    <div className="d-flex flex-column flex-sm-row gap-3 flex-grow-1 align-items-stretch">
                        <div className="Rooms-cards-img">
                            <NavLink to={`/RoomOverview/${room._id}`} className="w-100 h-100 d-block">
                                <img src={getImageUrl(room?.images?.[0])} alt={`Room ${room.name}`} />
                            </NavLink>
                        </div>
                        <div className="d-flex flex-column justify-content-between flex-grow-1 py-1">
                            <div>
                                <NavLink to={`/RoomOverview/${room._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <h4 className="fw-bold mb-2">Room {room.name}</h4>
                                </NavLink>
                                <div className="text-secondary small d-flex flex-column gap-1 mb-2">
                                    {room.air_conditioning && (<span>✓ 1x Air conditioning</span>)}
                                    {room.bathroom && (<span>✓ 1x Bathroom</span>)}
                                    {room.free_wifi && (<span>✓ 1x Free Wifi</span>)}
                                    {room.key_card_access && (<span>✓ 1x Key Card Access</span>)}
                                    {room.smart_tv && (<span>✓ 1x Smart TV</span>)}
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-2 mt-auto">
                                <span className="border border-primary rounded-pill px-3 py-1 text-primary small fw-medium">
                                    #Hot deal
                                </span>
                                <span className="border border-primary rounded-pill px-3 py-1 text-primary small fw-medium">
                                    #Popular
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column justify-content-between align-items-lg-end align-items-center text-lg-end text-center pt-2 pt-lg-0 border-top border-lg-top-0" style={{ minWidth: "200px" }}>
                        <div className="d-flex justify-content-lg-end justify-content-center align-items-center gap-2 mb-2 w-100">
                            <span className={`rounded-pill px-3 py-1 fw-semibold small ${getRatingClassState(room.rating)}`}>
                                {getRatingStatus(room.rating)}
                            </span>
                            <span className={`rounded-pill px-3 py-1 fw-bold ${getRatingClass(room.rating)}`}>
                                {room.rating}
                            </span>
                        </div>
                        <div className="d-flex flex-column align-items-lg-end align-items-center mt-auto w-100">
                            <strong className="fs-5 text-dark">{displayPrice}</strong>
                            <span className="text-muted small mb-2">1x {room.bed_type}</span>
                            <NavLink to={`/BookingOpt/${room._id}`} className="btn btn-primary rounded-pill w-100 py-2 fw-medium">
                                See booking options
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}