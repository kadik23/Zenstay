import SideBar from "../Components/SideBar";
import RoomsCards from "../Components/RoomsCards";

export default function PreviewRooms() {
    return(
        <div>
            <div className="d-flex">
                <div>
                    <SideBar />
                </div>
                <div className="flex-grow-1 px-4" style={{marginLeft:"36opx"}}>
                    <div className="d-flex justify-content-between align-items-center" style={{marginTop:"60px"}}>
                        <h4>Room Services</h4>
                        <select className="form-select rounded-pill" style={{width:"110px"}} id="state" required="">
                            <option value="">sort by</option>
                            <option></option>
                        </select>
                    </div>
                    <div className="row row-cols-md-2 row-cols-sm-1 row-cols-lg-1  mt-3">
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