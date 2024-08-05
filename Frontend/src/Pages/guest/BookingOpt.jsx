import { useParams } from "react-router-dom";
import RoomBookingInfo from "../../Components/guest/RoomBookingInfo";
import UserInfoSideBar from "../../Components/guest/UserInfoSideBar";
import useRoomStore from "../../Hooks/useRoomStore";
import { useEffect } from "react";
import axios from "axios";
import useBookRoomStore from "../../Hooks/useBookRoomStore";

export default function BookingOpt(){
    const { id } = useParams();
    const { room, fetchRoomById } = useRoomStore();
    const {getBookedAppointments} = useBookRoomStore()

    useEffect(() => {
        fetchRoomById(id);
        getBookedAppointments(id)
    }, [id]);
    return(
        <div className="w-100">
            <div className="row row-cols-2 w-100">
                <div className="col-5">
                    <UserInfoSideBar room={room}/>
                </div>
                <div className="col-7 border-start px-5">
                    <div style={{marginTop:"80px"}}>
                        <RoomBookingInfo room={room}/>
                    </div>
                </div>
            </div>
        </div>
    )
}