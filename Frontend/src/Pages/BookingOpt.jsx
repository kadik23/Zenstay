import RoomBookingInfo from "../Components/RoomBookingInfo";
import UserInfoSideBar from "../Components/UserInfoSideBar";
import axios from 'axios'

export default function BookingOpt(){
    async function getPreviewRoom(id){
        try{
            let response = await axios.get(`/getOneRoom/${id}`)
            if(response){
                console.log(response.data)
            }else{
                console.log('No data received from the server')
            }
        }catch(e){
            console.log(e)
        }
    }

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