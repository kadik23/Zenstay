import Recent from '../Components/Recent'
import SideBar from '../Components/SideBar'
import { Outlet  } from 'react-router-dom'
export default function RootLayout(){

    return(
        <div className="d-flex">
            <div style={{maxWidth:"300px"}}>
                <SideBar />
            </div>
            <div className="flex-fill px-3 py-4 " style={{background:"#fbfbfb"}}>
                <Outlet />
            </div>
            <div className="ps-3 py-4" style={{maxWidth:"280px"}}>
                <Recent/>
            </div>

        </div>
    )
}