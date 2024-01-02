import { NavLink } from "react-router-dom";

export default function Header() {

    return(
        <div>
            <nav className="navbar navbar-expand-md navbar-light bg-white bg-opacity-75 fixed-top ">
                <div className="container">
                    <NavLink to='/' className="navbar-brand text-body-emphasis me-lg-4">Zentsy</NavLink>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item me-lg-4">
                                <NavLink to='/' className="nav-link active" aria-current="page">Home</NavLink>
                            </li>
                            <li className="nav-item me-lg-4">
                                <NavLink to='PreviewRooms' className="nav-link">Search</NavLink>
                            </li>
                            <li className="nav-item me-lg-4">
                                <NavLink className="nav-link" >Popualr</NavLink>
                            </li>
                        </ul>
                        <div className="text-end">
                            <NavLink to='SignUp' className="btn btn-outline-primary me-3 rounded-pill px-5">Sign up</NavLink>
                            <NavLink to='LogIn' className="btn btn-primary rounded-pill px-5">Log In</NavLink>
                        </div>
                    </div>
                </div>
            </nav> 
        </div>
    );
}