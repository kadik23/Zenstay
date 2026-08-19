import { useParams } from "react-router-dom";
import RoomBookingInfo from "../../Components/guest/RoomBookingInfo";
import UserInfoSideBar from "../../Components/guest/UserInfoSideBar";
import useRoomStore from "../../Hooks/useRoomStore";
import { useEffect, useState } from "react";
import ALertMessage from "../../Components/guest/ALertMessage";
import useAlertMessageStore from "../../Hooks/useAlertMessage";
import useBookRoomStore from "../../Hooks/useBookRoomStore";
import useRoomsStore from "../../Hooks/useRoomsStore";

export default function BookingOpt(){
    const { id } = useParams();
    const { room, fetchRoomById } = useRoomStore();
    const { getBookedAppointments, setFirstStep, firstStep, fetchTaxes } = useBookRoomStore();
    const { checkIn, checkOut } = useRoomsStore()
    const {alert} = useAlertMessageStore()
    useEffect(() => {
        fetchRoomById(id);
        getBookedAppointments(id);
        fetchTaxes();
    }, [id]);

    useEffect(() => {
        if (!firstStep.check_in && checkIn) {
            setFirstStep({ check_in: checkIn });
        }
        if (!firstStep.check_out && checkOut) {
            setFirstStep({ check_out: checkOut });
        }
    }, [checkIn, checkOut, firstStep.check_in, firstStep.check_out, setFirstStep]);
    return(
        <div className="container-fluid">
            {alert.visible && (
                <ALertMessage type={alert.type} message={alert.message} />
            )}
            <div className="row flex-column flex-md-row w-100">
                <div className="col-md-5 col-12">
                    <UserInfoSideBar room={room} />
                </div>
                <div className="col-md-7 col-12 border-start px-5">
                    <div style={{ marginTop: "80px" }}>
                        <RoomBookingInfo room={room} />
                    </div>
                </div>
            </div>
        </div>
    )
}