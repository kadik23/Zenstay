import { Outlet } from "react-router-dom";
import Header from "../../Components/guest/Header";

export default function ErrorLayout() {

    return(
        <div>
            <Header/>
            <Outlet/>
        </div>
    )
}