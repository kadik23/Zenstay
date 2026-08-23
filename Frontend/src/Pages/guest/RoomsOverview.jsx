import { getImageUrl } from "../../Utils/getImageUrl";
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
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import useUserStore from "../../Hooks/useUserStore";
import useRoomStore from "../../Hooks/useRoomStore";
import getRatingStatus from "../../Utils/getRatingStatus";

export default function RoomsOverview() {

    const {user,setUser} = useUserStore();
    const {id} = useParams();
    const {room,fetchRoomById} = useRoomStore();
    const [ratingStats, setRatingStats] = useState(null);

    useEffect(() => {
        fetchRoomById(id);
        const fetchRatingStats = async () => {
            try {
                const res = await axios.get(`/getRoomRatingStats/${id}`);
                if (res.data && res.data.data) {
                    setRatingStats(res.data.data);
                }
            } catch (err) {
                console.error("Failed to fetch rating stats", err);
            }
        };
        fetchRatingStats();
    }, [id]);

    const categoryLabels = {
        cleanliness: 'Cleanliness',
        comfort: 'Comfort',
        air_conditioning: 'Air Conditioning',
        free_wifi: 'WiFi Connection',
        smart_tv: 'Smart TV',
        key_card_access: 'Key Card Access',
        bathroom: 'Bathroom',
    };

    return(
        <div className="container">
            <div style={{marginTop:"60px"}} className="pb-4">
                <NavLink to='/PreviewRooms' href="#"><img src={backarrow} alt="" /></NavLink>
            </div>
            <div className="row row-cols-1 row-cols-lg-2 mb-4">
                <div className="col mb-3 mb-lg-0">
                    <img src={getImageUrl(room?.images?.[0])} className="w-100 h-100 rounded-4" style={{objectFit:"cover"}} alt="" />
                </div>
                <div className="col d-flex flex-column gap-3">
                    <div className="row mb-3">
                        <div className="col-6">
                            <img src={getImageUrl(room?.images?.[1])} className="w-100 h-100 rounded-4" style={{objectFit:"cover"}} alt="" />
                        </div>
                        <div className="col-6">
                            <img src={getImageUrl(room?.images?.[2])} className="w-100 h-100 rounded-4" style={{objectFit:"cover"}} alt="" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <img src={getImageUrl(room?.images?.[3])} className="w-100 h-100 rounded-4" style={{objectFit:"cover"}} alt="" />
                        </div>
                        <div className="col-6">
                            <img src={getImageUrl(room?.images?.[4])} className="w-100 h-100 rounded-4" style={{objectFit:"cover"}} alt="" />
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
                <div className="d-flex flex-column justify-content-end align-items-md-end align-items-start w-100 order-1 order-md-2">
                    <div className="d-flex align-items-center mb-2">
                        <span className="flex-1 rounded-pill px-3 room-status">{getRatingStatus(ratingStats?.averageRating || room.rating)}</span>
                        <span className="rating rounded-pill px-3 ms-2">{ratingStats?.averageRating || room.rating}</span>
                    </div>
                    <NavLink to={`/BookingOpt/${room._id}`} className="btn btn-primary rounded-pill px-4">Book Now</NavLink>
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
            <h5 className="mt-4">Reviews & Ratings</h5>
            <div className="row row-clos-md-2 row-cols-1">
                <div className="col-md-5 col">
                    <div className="d-flex align-items-baseline mb-2">
                        <span className="display-6 text-primary me-2"><strong>{ratingStats?.averageRating || room.rating || 0}/10</strong></span>
                        <span className="text-secondary fw-semibold">
                            ({ratingStats?.totalRatingsCount || 0} {ratingStats?.totalRatingsCount === 1 ? 'rating' : 'ratings'})
                        </span>
                    </div>
                    
                    {ratingStats?.categoryAverages && Object.keys(ratingStats.categoryAverages).length > 0 ? (
                        Object.entries(ratingStats.categoryAverages).map(([catKey, avgScore]) => {
                            const label = categoryLabels[catKey] || catKey;
                            const pct = Math.round((avgScore / 10) * 100);
                            return (
                                <div key={catKey}>
                                    <div className="d-flex justify-content-between align-items-center text-secondary mb-1">
                                        <span>{label}</span>
                                        <span className="fw-semibold">{avgScore}/10</span>
                                    </div>
                                    <div className="progress mb-3 rounded-pill" style={{ height: '8px' }}>
                                        <div 
                                            className="progress-bar bg-primary" 
                                            style={{ width: `${pct}%` }} 
                                            role="progressbar" 
                                            aria-valuenow={pct} 
                                            aria-valuemin="0" 
                                            aria-valuemax="100"
                                        ></div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-secondary my-3 small">No category ratings recorded yet for this room.</div>
                    )}
                </div>
            </div>
            </>
        )}
        </div>
    )
}