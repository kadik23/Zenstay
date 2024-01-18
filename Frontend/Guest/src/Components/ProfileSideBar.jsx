import { NavLink } from "react-router-dom"
import backarrow from "../assets/icons/back-arrow.png"
import personalInfo from "../assets/icons/account.png"
import payment from "../assets/icons/credit-card.png"

export default function ProfileSideBar() {
    return(
        <div className="d-flex flex-column flex-shrink-0 p-4 text-dark h-100" style={{color:"black",background:"#F8F8F8",width: "320px"}}>
            <div style={{marginTop:"60px"}}>
                <NavLink to='/' href="#"><img src={backarrow} alt="" /></NavLink>
            </div>
            <strong className="py-3">Profile settings</strong>
            <ul className="list-unstyled flex-column">
                <li className="p-2">
                    <NavLink className="d-flex align-items-center gap-3 text-decoration-none text-dark">
                        <img src={personalInfo} width={20} alt="" />
                        <span>Personal details</span>
                    </NavLink>
                </li>
                <li className="p-2">
                    <NavLink className="d-flex align-items-center gap-3 text-decoration-none text-dark">
                        <img src={payment} width={20} alt="" />
                        <span>Payment information</span>
                    </NavLink>
                </li>
            </ul>

        </div>
    )
}