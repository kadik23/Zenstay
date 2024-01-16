import SideBar from "../Components/SideBar";
import RoomsCards from "../Components/RoomsCards";
import axios from 'axios'
export default function PreviewRooms() {
    var params = {
        check_in:"2/2/2",
        check_out:"3/3/3",
        guests:2,
        bed_type:"1 room"
    }
    async function get_rooms_by_search(){
        try{
            let response = await axios.post('/getRoomsBySearch/',params)
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
        <div>
            <div className="d-flex">
                <div>
                    <SideBar />
                </div>
                <div className="flex-grow-1 px-4" style={{marginLeft:"36opx"}}>
                    <div className="d-flex justify-content-between align-items-center" style={{marginTop:"60px"}}>
                        <h4>Room Services</h4>
                        <select className="form-select rounded-pill" style={{width:"110px"}} id="state">
                            <option value="">sort by</option>
                            <option></option>
                        </select>
                    </div>
                    <div className="row row-cols-md-2 row-cols-sm-1 row-cols-lg-1 mt-3">
                        <RoomsCards />
                        <RoomsCards />
                        <RoomsCards />
                        <RoomsCards />
                    </div>
                </div>
            </div>
        </div>
    )
}