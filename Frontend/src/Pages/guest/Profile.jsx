import { useState } from "react";
import ProfileSideBar from "../../Components/guest/ProfileSideBar";
import PersonalDetails from "../../Components/guest/PersonalDetails";
import PaymentInfo from "../../Components/guest/PaymentInfo";
import BookingsList from "../../Components/guest/BookingsList";

export default function Profile() {
    const [activeTab, setActiveTab] = useState('personal');

    return(
        <div className="" style={{minHeight:"100vh"}}>
            <div className="d-flex flex-md-row flex-column h-100">
                <div >
                    <ProfileSideBar activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
                <div className="flex-grow-1 p-4">
                    {activeTab === 'personal' && <PersonalDetails />}
                    {activeTab === 'payment' && <PaymentInfo />}
                    {activeTab === 'bookings' && <BookingsList />}
                </div>
            </div>
        </div>
    )
}