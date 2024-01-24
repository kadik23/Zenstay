import SideBar from '../Components/SideBar'
import { Outlet  } from 'react-router-dom'
export default function RootLayout(){

    return(
        <div className="d-flex">
            <div style={{maxWidth:"300px"}}>
                <SideBar />
            </div>
            <div className="flex-fill ps-3 pe-5 py-4 " style={{background:"#fbfbfb"}}>
                <Outlet />
            </div>
        </div>
    )
}