import ProfileSideBar from "../../Components/guest/ProfileSideBar";
import PersonalDetails from "../../Components/guest/PersonalDetails";

export default function Profile() {
    return(
        <div className="" style={{minHeight:"100vh"}}>
            <div className="d-flex h-100">
                <div >
                    <ProfileSideBar />
                </div>
                <div className="flex-grow-1 p-4" style={{marginLeft:"36opx"}} >
                    <PersonalDetails />
                </div>
            </div>
        </div>
    )
}