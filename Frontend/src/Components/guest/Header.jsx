import { NavLink } from "react-router-dom";
import user from '../../assets/icons/user.png'
import logout from '../../assets/icons/logout.png'
import setting from '../../assets/icons/setting.png'
import {useContext, useEffect ,useState} from 'react'
import { userContext } from "../../Pages/guest/UserContext";

export default function Header() {

    const [user,setUser] = useContext(userContext)
    const [signin,setSignin] = useState(true);
    useEffect(()=>{
        if(user) setSignin(false)
        console.log(user)
    },[user])
    const toogleSignin = () => {
        setSignin((value) => value = !value);
    }

    return(
        <div>
            <nav className="navbar navbar-expand-md navbar-light bg-white bg-opacity-75 fixed-top ">
                <div className="container">
                    <NavLink to='/' className="navbar-brand text-body-emphasis me-lg-4">Zenstay</NavLink>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item me-lg-4">
                                <NavLink to='/' className="nav-link active" aria-current="page">Home</NavLink>
                            </li>
                            <li className="nav-item me-lg-4">
                                <NavLink to='PreviewRooms' className="nav-link">Search</NavLink>
                            </li>
                            <li className="nav-item me-lg-4">
                                <NavLink className="nav-link" >Popular</NavLink>
                            </li>
                        </ul>
                        { 
                            JSON.stringify(signin) == 'true' ? 
                                <div className="text-end">
                                    <NavLink to='SignUp' className="btn btn-outline-primary me-3 rounded-pill px-5">Sign up</NavLink>
                                    <NavLink to='LogIn' className="btn btn-primary rounded-pill px-5">Log In</NavLink>
                                </div> 
                            : 
                            <div className="flex-shrink-0 dropdown">
                                <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle"/>
                                </a>
                                <ul className="dropdown-menu text-small shadow">
                                <li>
                                    <button className="dropdown-item">
                                        <div className="d-flex align-items-center">
                                            <img src={setting} width={30} alt="user icon" className="pe-2" />
                                            Settings
                                        </div>
                                    </button>
                                </li>
                                <li>
                                    <NavLink to='/Profile' className="dropdown-item">
                                        <div className="d-flex align-items-center">
                                            <img src={user} width={30} alt="user icon" className="pe-2" />
                                            Profile
                                        </div>
                                    </NavLink>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <button className="dropdown-item d-flex align-items-center" onClick={toogleSignin}>
                                        <img src={logout} width={30} alt="user icon" className="pe-2" />
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