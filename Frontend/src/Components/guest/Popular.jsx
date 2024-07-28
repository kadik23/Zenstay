import { NavLink } from "react-router-dom";

export default function Popular({room}) {

    return(
        <div>           
            <div className="col">
                <div className="popularCard card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg">
                    <div className="d-flex flex-column h-100 py-3 px-4 pb-3 text-white text-shadow-1">
                        <h3 className="pt-5 mb-4 display-7 lh-1 fw-bold">breakfast</h3>
                        <ul className="d-flex list-unstyled mt-auto">
                            <li className="me-auto">
                                <NavLink to='/' className="text-decoration-none text-white shadow-lg me-lg-4">Zentsy</NavLink>
                            </li>
                            <li className="rounded-pill bg-white px-2 text-black">
                                <small>10$</small>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}