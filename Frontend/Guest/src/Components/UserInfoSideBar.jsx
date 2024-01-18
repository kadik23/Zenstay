import { NavLink } from "react-router-dom"
import backarrow from "../assets/icons/back-arrow.png"
import wifiicon from '../assets/icons/wi-fi.png'
import airconicon from '../assets/icons/air-conditioner.png'
export default function UserInfoSideBar(){

    return(
        <div className="d-flex flex-column p-4 text-dark h-100">
            <div style={{marginTop:"60px"}}>
                <NavLink to='/PreviewRooms' href="#"><img src={backarrow} alt="" /></NavLink>
            </div>
            <h4 className="mt-3">Book Room</h4>
            <div className="py-4">
                <h5 className="mb-3">Step 1:</h5>
                <span style={{fontWeight:'500'}}>Property amenities</span>
                <div className="mb-3 d-flex align-items-center justify-content-between ">
                    <div>
                        <img src={wifiicon} width={20} className="me-2" alt="" />
                        <span>free wifi</span>
                    </div>
                    <div>
                        <img src={airconicon} width={20} className="me-2" alt="" />
                        <span>Air conditioning</span>
                    </div>
                </div>
                <strong className="">Breakfast included</strong>
                <div className="mt-4">
                    <span className="">Choose a bed option</span>
                    <select className="mt-1 form-select rounded-pill">
                        <option>2 seperate beds</option>
                        <option>3 seperate beds</option>
                        <option>4 seperate beds</option>
                    </select>
                </div>
            </div>
            <hr className="" />
            <div className="py-4">
            <h5 className="mb-3">Step 2: Personal data</h5>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label px-2" style={{fontWeight:"500"}}>First and Last name</label>
                    <input type="text" className="border border-secondary rounded-pill form-control w-75" id="name" placeholder="e.g. Maria Lost"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label px-2" style={{fontWeight:"500"}}>Email address</label>
                    <input type="email" className="border border-secondary rounded-pill form-control w-75" id="email" placeholder="email@email.com"/>
                </div>
                <div className="">
                    <label htmlFor="phone" className="form-label px-2" style={{fontWeight:"500"}}>Phone number</label>
                    <input type="phone" className="border border-secondary rounded-pill form-control w-75" id="phone" placeholder="+123 001 234 567"/>
                </div>
            </div>
            <hr className="" />
            <div className="py-4">
            <h5 className="mb-3">Step 3: Payment details</h5>
                <div className="mb-3">
                    <label htmlFor="card-name" className="form-label px-2" style={{fontWeight:"500"}}>Name on card</label>
                    <input type="text" className="border border-secondary rounded-pill form-control w-75" id="card-name" placeholder="e.g. Maria Lost"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="card-number" className="form-label px-2" style={{fontWeight:"500"}}>Card number</label>
                    <input type="password" className="border border-secondary rounded-pill form-control w-75" id="card-number" placeholder="**** **** **** ****"/>
                </div>
                <div className="d-flex gap-3 w-75">
                    <div>
                        <label htmlFor="exp-date" className="form-label px-2" style={{fontWeight:"500"}}>valid until</label>
                        <input type="text" className="border border-secondary rounded-pill form-control" id="exp-date" placeholder="MM/YY"/>
                    </div>
                    <div>
                        <label htmlFor="cvc" className="form-label px-2" style={{fontWeight:"500"}}>CVC</label>
                        <input type="password" className="border border-secondary rounded-pill form-control " id="cvc" placeholder="***"/>
                    </div>
                </div>
            </div>
        </div>
    )
}