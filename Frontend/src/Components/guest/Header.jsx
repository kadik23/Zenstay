import { NavLink } from "react-router-dom";
import setting from '../../assets/icons/setting.png';
import { useEffect, useState } from 'react';
import useUserStore from "../../Hooks/useUserStore";
import ALertMessage from "./ALertMessage";
import useAlertMessageStore from "../../Hooks/useAlertMessage";

export default function Header() {

    const { user, logout } = useUserStore();
    const [signin, setSignin] = useState(true);
    const {alert} = useAlertMessageStore()

    useEffect(() => {
        if (user) setSignin(false);
        console.log(user);
    }, [user]);

    const toggleSignin = () => {
        const response = logout();
        if (response) {
            setSignin((value) => !value);
        }
    };

    const imageUrl = user?.image ? (user.image.startsWith('http') ? user.image : `http://localhost:3000/uploads/${user.image}`) : "https://github.com/mdo.png";

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-light bg-white bg-opacity-75 fixed-top">
                {alert.visible && (
                    <ALertMessage type={alert.type} message={alert.message} />
                )}
                <div className="container">
                    <NavLink to='/' className="navbar-brand text-body-emphasis me-lg-4">Zenstay</NavLink>
                    {/* Toggler button for small screens */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item me-lg-4">
                                <NavLink to='/' className="nav-link" aria-current="page">Home</NavLink>
                            </li>
                            <li className="nav-item me-lg-4">
                                <NavLink to='PreviewRooms' className="nav-link">Search</NavLink>
                            </li>
                            <li className="nav-item me-lg-4">
                                <NavLink to="PopularRooms" className="nav-link">Popular</NavLink>
                            </li>
                        </ul>
                        {
                            JSON.stringify(signin) === 'true' ?
                                <div className="text-end">
                                    <NavLink to='SignUp' className="btn btn-outline-primary me-3 rounded-pill px-5">Sign up</NavLink>
                                    <NavLink to='LogIn' className="btn btn-primary rounded-pill px-5">Log In</NavLink>
                                </div>
                                :
                                <div className="flex-shrink-0 dropdown">
                                    <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src={imageUrl} alt="mdo" width="32" height="32" className="rounded-circle" style={{objectFit: "cover"}} />
                                    </a>
                                    <ul className="dropdown-menu text-small shadow">
                                        <li>
                                            <NavLink to='/Profile' className="dropdown-item">
                                                <div className="d-flex align-items-center">
                                                    Profile
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <button className="dropdown-item d-flex align-items-center text-danger" onClick={toggleSignin}>
                                                Sign out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
}
