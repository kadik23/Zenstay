import { NavLink } from "react-router-dom"
import backarrow from "../../assets/icons/back-arrow.png"
import personalInfo from "../../assets/icons/account.png"
import payment from "../../assets/icons/credit-card.png"

export default function ProfileSideBar({ activeTab, setActiveTab }) {
    const navItems = [
        {
            id: 'personal',
            label: 'Personal details',
            icon: <img src={personalInfo} width={20} alt="" />
        },
        {
            id: 'payment',
            label: 'Payment information',
            icon: <img src={payment} width={20} alt="" />
        },
        {
            id: 'bookings',
            label: 'My Bookings',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/>
                </svg>
            )
        }
    ];

    return(
        <div className="d-flex flex-column flex-shrink-0 custom-sidebar-width p-4 text-dark h-100" style={{color:"black",background:"#F8F8F8"}}>
            <div style={{marginTop:"60px"}}>
                <NavLink to='/'><img src={backarrow} alt="Go back" /></NavLink>
            </div>
            <strong className="py-3">Profile settings</strong>
            <ul className="list-unstyled flex-column">
                {navItems.map((item) => (
                    <li 
                        key={item.id}
                        className="p-2" 
                        style={{
                            cursor: "pointer", 
                            backgroundColor: activeTab === item.id ? '#e9ecef' : 'transparent', 
                            borderRadius: '8px'
                        }} 
                        onClick={() => setActiveTab(item.id)}
                    >
                        <div className="d-flex align-items-center gap-3 text-decoration-none text-dark">
                            {item.icon}
                            <span>{item.label}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}