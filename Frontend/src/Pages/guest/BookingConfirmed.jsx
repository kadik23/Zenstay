import RoomBooked from "../../Components/guest/RoomBooked";
import Confirmed from "../../assets/icons/correct.png"
import checkin from '../../assets/icons/check-in.png'
import checkout from '../../assets/icons/check-out.png'
import useBookRoomStore from "../../Hooks/useBookRoomStore";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useUserStore from "../../Hooks/useUserStore";
import useAlertMessageStore from "../../Hooks/useAlertMessage";
import ALertMessage from "../../Components/guest/ALertMessage";
import axios from "axios";
import useSettingsStore from "../../Hooks/useSettingsStore";

import RatingComponent from "../../Components/guest/RatingComponent";

export default function BookingOpt(){
    const currencySymbol = useSettingsStore(state => state.currencySymbol);
    const settings = useSettingsStore(state => state.settings);
    const {getBookedAppointments, bookedAppointments, cancelReservation} = useBookRoomStore();
    const {user} = useUserStore()
    const {id} = useParams();
    const [appointment, setAppointment] = useState(null)
    const {alert} = useAlertMessageStore()
    const [adminContact, setAdminContact] = useState({ email: 'desk@hotelmitte.dk', telephone: '+49 002 001 030' });

    useEffect(() => {
        const fetchAdminContact = async () => {
            try {
                const response = await axios.get('/getAdminContact');
                if (response.data) {
                    setAdminContact(response.data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchAdminContact();
    }, []);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await axios.get(`/getBookingById/${id}`);
                if (response.data && response.data.data) {
                    setAppointment(response.data.data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchBooking();
    }, [id]);

    return(
        <div className="container">
            <div className="row w-100">
                <div className="col-sm-12 col-md-8 col-xl-5 order-2 order-md-1" style={{ marginTop: "100px" }}>
                    {appointment && (<RoomBooked appointment={appointment}/>)}
                    <div className="mt-5 pb-4 border-bottom">
                        {appointment &&(<h5 className="mb-3">Your trip starts {appointment.check_in}</h5>)}
                        <div className="d-flex gap-4">
                            <div className="d-flex flex-column gap-2">
                                <div className="pe-0 d-flex align-items-center" style={{ fontWeight: "500" }}>
                                    <img src={checkin} width={20} alt="" />
                                    <span className="ms-2">Check-in</span>
                                </div>
                                <div className="pe-0 d-flex align-items-center" style={{ fontWeight: "500" }}>
                                    <img src={checkout} width={20} alt="" />
                                    <span className="ms-2">Check-out</span>
                                </div>
                            </div>
                            {appointment && (
                                <div className="d-flex flex-column gap-2">
                                    <div className="">
                                        <span>{appointment.check_in}</span>
                                    </div>
                                    <div className="">
                                        <span>{appointment.check_out}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="pt-4">
                        <div className="d-flex gap-4 pb-4 border-bottom">
                            <div className="d-flex flex-column gap-2">
                                <div className="pe-0 d-flex align-items-center" style={{ fontWeight: "500" }}>
                                    <span className="ms-2">Hotel address</span>
                                </div>
                                <div className="pe-0 d-flex align-items-center" style={{ fontWeight: "500" }}>
                                    <span className="ms-2">E-mail</span>
                                </div>
                                <div className="pe-0 d-flex align-items-center" style={{ fontWeight: "500" }}>
                                    <span className="ms-2">Telephone</span>
                                </div>
                            </div>
                            <div className="d-flex flex-column gap-2">
                                <div className="">
                                    <span>Norrebrogade 9, 10178 Copenhagen, Denmark</span>
                                </div>
                                <div className="">
                                    <span>{adminContact.email}</span>
                                </div>
                                <div className="">
                                    <span>{adminContact.telephone}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-4 mb-5">
                        <div className="d-flex gap-5 pb-3">
                            <div className="d-flex flex-column gap-2">
                                <div className="pe-0 d-flex align-items-center" style={{ fontWeight: "500" }}>
                                    <span className="ms-2">Total Price</span>
                                </div>
                            </div>
                            <div className="d-flex flex-column gap-2">
                                <div className=" d-flex gap-3 align-items-center">
                                    {appointment && (<span>{currencySymbol === 'DA' ? `${appointment.totalPrice} ${currencySymbol}` : `${currencySymbol}${appointment.totalPrice}`}</span>)}
                                    <span className="rating rounded-pill px-3">paid</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {settings?.cancellation_policy && (
                        <div className='mb-4 p-3 bg-light rounded-3 text-secondary border' style={{ fontSize: '0.9rem' }}>
                            <strong className="d-block mb-1 text-dark">Cancellation Policy</strong>
                            {settings.cancellation_policy}
                        </div>
                    )}
                    <div className="d-flex flex-column flex-md-row gap-3 align-items-center mb-5">
                        {appointment && (<a href="tel:+213798816073" style={{ fontWeight: "500" }} className="btn btn-primary rounded-pill w-100 w-md-50">Contact property</a>)}
                        <button 
                            onClick={() => cancelReservation(appointment._id)} 
                            style={{ fontWeight: "500" }} 
                            className="btn btn-outline-primary rounded-pill w-100 w-md-50"
                            disabled={appointment?.status === 'Canceled' || appointment?.status === 'cancelled'}
                        >
                            {appointment?.status === 'Canceled' || appointment?.status === 'cancelled' ? 'Already Canceled' : 'Cancel reservation'}
                        </button>
                    </div>

                    {appointment && appointment.status !== 'Canceled' && appointment.status !== 'canceled' && appointment.status !== 'cancelled' && (
                        <div className="mb-5">
                            <RatingComponent 
                                bookingId={appointment._id} 
                                roomId={appointment.room_id} 
                                bookingStatus={appointment.status}
                            />
                        </div>
                    )}
                </div>
                <div className="col-sm-12 col-md-4 col-xl-7 px-md-5 text-center order-1 order-md-2">
                    <div style={{ marginTop: "100px" }} className="d-flex justify-content-center">
                        <div className="d-flex flex-column align-items-center">
                            <img src={Confirmed} width={90} alt="" />
                            <strong>Your booking is now confirmed!</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}