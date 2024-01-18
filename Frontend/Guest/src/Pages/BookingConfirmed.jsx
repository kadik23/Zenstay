import RoomBooked from "../Components/RoomBooked";
import Confirmed from "../assets/icons/plus.png"
import checkin from '../assets/icons/check-in.png'
import checkout from '../assets/icons/check-out.png'

export default function BookingOpt(){

    return(
        <div className="container">
            <div className="row row-cols-2 w-100">
                <div className="col-5 " style={{marginTop:"100px"}}>
                    <RoomBooked/>
                    <div className="mt-5 pb-4 border-bottom">
                        <h5 className="mb-3">Your trip starts Friday, 09 December 2022</h5>
                        <div className="d-flex gap-4">
                            <div className="d-flex flex-column gap-2">
                                <div className="pe-0 d-flex align-items-center" style={{fontWeight:"500"}}>
                                    <img src={checkin} width={20} alt="" />
                                    <span className="ms-2">Check-in</span>
                                </div>
                                <div className="pe-0 d-flex align-items-center" style={{fontWeight:"500"}}>
                                    <img src={checkout} width={20} alt="" />
                                    <span className="ms-2">Check-out</span>
                                </div>
                            </div>
                            <div className="d-flex flex-column gap-2">
                                <div className="">
                                    <span>Friday, 09 December 2022</span>
                                </div>
                                <div className="">
                                    <span>Monday, 12 December 2022</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-4">
                        <div className="d-flex gap-4 pb-4 border-bottom">
                            <div className="d-flex flex-column gap-2">
                                <div className="pe-0 d-flex align-items-center" style={{fontWeight:"500"}}>
                                    <span className="ms-2">Hotel adress</span>
                                </div>
                                <div className="pe-0 d-flex align-items-center" style={{fontWeight:"500"}}>
                                    <span className="ms-2">E-mail</span>
                                </div>
                                <div className="pe-0 d-flex align-items-center" style={{fontWeight:"500"}}>
                                    <span className="ms-2">Telephone</span>
                                </div>
                            </div>
                            <div className="d-flex flex-column gap-2">
                                <div className="">
                                    <span>Norrebrogade 9, 10178 Copenhagen, Denmark</span>
                                </div>
                                <div className="">
                                    <span>desk@hotelmitte.dk</span>
                                </div>
                                <div className="">
                                    <span>+49 002 001 030</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-4 mb-5">
                        <div className="d-flex gap-5 pb-3">
                            <div className="d-flex flex-column gap-2">
                                <div className="pe-0 d-flex align-items-center" style={{fontWeight:"500"}}>
                                    <span className="ms-2">Total Price</span>
                                </div>
                            </div>
                            <div className="d-flex flex-column gap-2">
                                <div className=" d-flex gap-3 align-items-center">
                                    <span>$600</span>
                                    <span className="rating rounded-pill px-3">paid</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex gap-3 align-items-center mb-5">
                        <button style={{fontWeight:"500"}} className="px-5 btn btn-primary rounded-pill">Contact property</button>
                        <button style={{fontWeight:"500"}} className="px-5 btn btn-outline-primary rounded-pill">cancel reservation</button>
                    </div>
                </div>
                <div className="col-7 px-5">
                    <div style={{marginTop:"100px"}} className="d-flex justify-content-center">
                        <div className="d-flex flex-column align-items-center">
                            <img src={Confirmed} alt="" />
                            <strong>Your booking is now confirmed!</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}