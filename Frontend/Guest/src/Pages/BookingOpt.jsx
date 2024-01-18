import RoomBookingInfo from "../Components/RoomBookingInfo";
import UserInfoSideBar from "../Components/UserInfoSideBar";

export default function BookingOpt(){

    return(
        <div className="w-100">
            <div className="row row-cols-2 w-100">
                <div className="col-5">
                    <UserInfoSideBar />
                </div>
                <div className="col-7 border-start px-5">
                    <div style={{marginTop:"80px"}}>
                        <RoomBookingInfo/>
                    </div>
                </div>
            </div>
        </div>
    )
}