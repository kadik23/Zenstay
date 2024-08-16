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

export default function BookingOpt(){
    const {getBookedAppointments, bookedAppointments, cancelReservation} = useBookRoomStore();
    const {user} = useUserStore()
    const {id} = useParams();
    const [appointment, setAppointment] = useState(null)
    const {alert} = useAlertMessageStore()

    useEffect(() => {
        console.log("id"+id)
        getBookedAppointments(id)
    }, [id])
    
    useEffect(() =>{
        setAppointment(Object.values(bookedAppointments).reduce((acc, appoint) => {
            return appoint.user_id === user._id ? appoint : acc;
        }, null));
        console.log(appointment)
    
    },[bookedAppointments])

    return(
        <div className="container">
            {alert.visible && (
                <ALertMessage type={alert.type} message={alert.message} />
            )}
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
                                    <span>desk@hotelmitte.dk</span>
                                </div>
                                <div className="">
                                    <span>+49 002 001 030</span>
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
                                    {appointment && (<span>${appointment.totalPrice}</span>)}
                                    <span className="rating rounded-pill px-3">paid</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column flex-md-row gap-3 align-items-center mb-5">
                        {appointment && (<a href="tel:+213798816073" style={{ fontWeight: "500" }} className="btn btn-primary rounded-pill w-100 w-md-50">Contact property</a>)}
                        <button onClick={() => cancelReservation(appointment._id)} style={{ fontWeight: "500" }} className="btn btn-outline-primary rounded-pill w-100 w-md-50">Cancel reservation</button>
                    </div>
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