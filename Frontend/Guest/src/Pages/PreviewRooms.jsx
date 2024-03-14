import SideBar from "../Components/SideBar";
import RoomsCards from "../Components/RoomsCards";
import axios from 'axios'
import { useEffect } from "react";
export default function PreviewRooms() {
    const [rooms,setRooms] = useState()
    useEffect(() =>{
        getPreviewRooms()
    },[])
    async function getPreviewRooms(){
        try{
            let response = await axios.get('getAllRooms')
            if(response){
                console.log(response.data)
                setRooms(response.data)
            }else{
                console.log('some issues')
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
                        {rooms.map(room => <RoomsCards room={room}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}