import setting from "../../assets/icons/setting.png"
import userIcon from "../../assets/icons/user.png"
import logoutIcon from "../../assets/icons/logout.png"
import room from "../../assets/img/room5.jpg"
import useUserStore from '../../Hooks/useUserStore'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Recent() {
    const [isExpanded, setIsExpanded] = useState(false);
    const user = useUserStore(state => state.user);
    const logout = useUserStore(state => state.logout);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const menuItems = [
        { name: "Settings", path: "/admin/settings", icon: setting },
        { name: "Profile", path: "/admin/profile", icon: userIcon }
    ];

    const imageUrl = user?.image ? (user.image.startsWith('http') ? user.image : `http://localhost:3000/uploads/${user.image}`) : "https://github.com/mdo.png";

    return(
        <div className="w-100">
                <div className="flex-shrink-0 dropdown pb-3 border-bottom mb-4">
                    <a className="d-block px-2 link-body-emphasis text-decoration-none d-flex align-items-center gap-1 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{cursor: "pointer"}}>
                        <img src={imageUrl} alt="admin" width="40" height="40" className="rounded-circle me-2" style={{objectFit: "cover"}}/>
                        <div className="d-flex flex-column user-select-none me-auto">
                            <strong>{user ? `${user.firstname} ${user.lastname}` : "Admin Name"}</strong>
                            <span style={{color:"#adadad", textTransform: "capitalize"}}>{user?.account_type || "Admin"}</span>
                        </div>
                    </a>
                    <ul className="dropdown-menu text-small shadow border-0 rounded-4 p-2" style={{minWidth: "200px"}}>
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <NavLink to={item.path} 
                                    className={({isActive}) => `dropdown-item text-decoration-none rounded-3 py-2 mb-1`}
                                    style={({isActive}) => isActive ? {backgroundColor: "#3d94ff"} : {}}
                                >
                                    {({isActive}) => (
                                        <div className="d-flex align-items-center fw-medium" style={{color: isActive ? "#fff" : "#4a4a4a"}}>
                                            <img src={item.icon} width={24} alt={`${item.name} icon`} className="pe-2" style={isActive ? {filter: "brightness(0) invert(1)"} : {}} />
                                            {item.name}
                                        </div>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                        <li><hr className="dropdown-divider my-1" /></li>
                        <li>
                            <button className="dropdown-item d-flex align-items-center rounded-3 py-2 mt-1 fw-medium" style={{color: "#ff4d4f"}} onClick={handleLogout}>
                                <div className="me-2" style={{
                                    width: "16px", 
                                    height: "16px", 
                                    backgroundColor: "#ff4d4f", 
                                    WebkitMask: `url(${logoutIcon}) no-repeat center / contain`,
                                    mask: `url(${logoutIcon}) no-repeat center / contain`
                                }} />
                                Sign out
                            </button>
                        </li>
                    </ul>
                </div>
                <h5 className="mb-3">Zenstay Hotel</h5>
                <div className="w-100 row gap-2 mb-3" >
                    <div className="col-6 pe-0">
                        <img src={room} className="w-100 h-100 p-0 rounded-3" style={{objectFit:"cover"}} alt="" />
                    </div>
                    <div className="col w-50 pe-0 d-flex flex-column gap-2">
                        <div className="row">
                            <img src={room} className="p-0 rounded-3 w-100" style={{objectFit:"cover"}} alt="" />
                        </div>
                        <div className="row h-auto">
                            <img src={room} className="p-0 w-100 rounded-3" style={{objectFit:"cover"}} alt="" />
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <strong>Overview</strong>
                    <p className="mt-2 text-muted" style={{fontSize: "0.9rem", lineHeight: "1.6"}}>
                        Manage your hotel's daily operations, monitor incoming guest bookings, and track room availability in real-time. 
                        {isExpanded ? (
                            <>
                                {" "}Keep your business running smoothly by analyzing performance metrics, organizing staff schedules, and ensuring a high-quality experience for all Zenstay guests.
                                <a className="text-decoration-none ms-1" style={{color:"#3d94ff",fontWeight:"500", cursor:"pointer"}} onClick={(e) => { e.preventDefault(); setIsExpanded(false); }}>Show less</a>
                            </>
                        ) : (
                            <>
                                ...<a className="text-decoration-none ms-1" style={{color:"#3d94ff",fontWeight:"500", cursor:"pointer"}} onClick={(e) => { e.preventDefault(); setIsExpanded(true); }}>Read more</a>
                            </>
                        )}
                    </p>
                </div>
                <div className="w-100 p-0">
                    <strong>Place</strong>
                    <div className="mt-3 w-100 p-0">
                        <iframe className="rounded-3 w-100" src="https://maps.google.com/maps?q=chicago&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe>
                    </div>
                </div>
        </div>
    )
}