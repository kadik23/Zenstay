import ProfileSideBar from "../Components/ProfileSideBar";

export default function Profile() {
    return(
        <div>
            <div className="d-flex">
                <div>
                    <ProfileSideBar />
                </div>
                <div className="flex-grow-1 px-4" style={{marginLeft:"36opx"}}>
                    
                </div>
            </div>
        </div>
    )
}