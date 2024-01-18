import ProfileSideBar from "../Components/ProfileSideBar";
import PersonalDetails from "../Components/PersonalDetails";

export default function Profile() {
    return(
        <div className="" style={{height:"100vh"}}>
            <div className="d-flex h-100">
                <div className="h-100">
                    <ProfileSideBar />
                </div>
                <div className="flex-grow-1 px-4" style={{marginLeft:"36opx",marginTop:"60px"}} >
                    <PersonalDetails />
                </div>
            </div>
        </div>
    )
}