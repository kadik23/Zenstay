export default function Header() {

    return(
        <div>
            <nav className="navbar navbar-expand-md navbar-light bg-white bg-opacity-75 fixed-top ">
                <div className="container">
                    <a className="navbar-brand text-body-emphasis me-lg-4" href="#">Zentsy</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item me-lg-4">
                                <a className="nav-link active" aria-current="page" href="#">Hotel</a>
                            </li>
                            <li className="nav-item me-lg-4">
                                <a className="nav-link" href="#">Search</a>
                            </li>
                            <li className="nav-item me-lg-4">
                                <a className="nav-link"  href="#">Popualr</a>
                            </li>
                        </ul>
                        <div className="text-end">
                            <button type="button" className="btn btn-outline-primary me-3 rounded-pill px-5">Sign up</button>
                            <button type="button" className="btn btn-primary rounded-pill px-5">Log In</button>
                        </div>
                    </div>
                </div>
            </nav> 
        </div>
    );
}