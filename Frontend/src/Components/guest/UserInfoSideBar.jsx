import { NavLink, useParams } from "react-router-dom";
import backarrow from "../../assets/icons/back-arrow.png";
import wifiicon from '../../assets/icons/wi-fi.png';
import airconicon from '../../assets/icons/air-conditioner.png';
import keycardicon from "../../assets/icons/card-key.png";
import smarttvicon from "../../assets/icons/smart-tv.png";
import bathroom from "../../assets/icons/bathroom.png";
import bedicon from "../../assets/icons/sleeping.png";
import kingbedicon from "../../assets/icons/bed.png";
import useBookRoomStore from "../../Hooks/useBookRoomStore";

export default function UserInfoSideBar({room}) {

    const { firstStep, secondStep, handleFirstStepChange, handleSecondStepChange } = useBookRoomStore();

    return (
        <div className="d-flex flex-column p-4 text-dark h-100">
            <div style={{ marginTop: "60px" }}>
                <NavLink to='/PreviewRooms' href="#"><img src={backarrow} alt="Back" /></NavLink>
            </div>
            <h4 className="mt-3">Book Room</h4>
            {room && (
                <div>
                    <div className="py-4">
                        <h5 className="mb-3">Step 1:</h5>
                        <span style={{ fontWeight: '500' }}>Property amenities</span>
                        <div className="mb-3 d-flex flex-wrap align-items-center justify-content-start gap-3">
                            {room.free_wifi && (
                                <div>
                                    <img src={wifiicon} width={20} className="me-2" alt="Free wifi" />
                                    <span>Free wifi</span>
                                </div>
                            )}
                            {room.air_conditioning && (
                                <div>
                                    <img src={airconicon} width={20} className="me-2" alt="Air conditioning" />
                                    <span>Air conditioning</span>
                                </div>
                            )}
                            {room.key_card_access && (
                                <div>
                                    <img src={keycardicon} width={20} className="me-2" alt="Key and card access" />
                                    <span>Key and card access</span>
                                </div>
                            )}
                            {room.smart_tv && (
                                <div>
                                    <img src={smarttvicon} width={20} className="me-2" alt="Smart TV" />
                                    <span>Smart TV</span>
                                </div>
                            )}
                            {room.bathroom && (
                                <div>
                                    <img src={bathroom} width={20} className="me-2" alt="Private bathroom" />
                                    <span>Private bathroom</span>
                                </div>
                            )}
                        </div>
                        <div className="my-4">
                            {room.bed_type === "king size bed" || room.bed_type === "queen size bed"
                                ? (
                                    <div>
                                        <img src={kingbedicon} width={20} className="me-2" alt="Bed type" />
                                        <span>{room.bed_type}</span>
                                    </div>
                                ) : (
                                    <div>
                                        <img src={bedicon} width={20} className="me-2" alt="Bed type" />
                                        <span>{room.bed_type}</span>
                                    </div>
                                )}
                        </div>
                        <span className="mb-2">Choose a time option</span>
                        <ul className="list-unstyled flex-column">
                            <li>
                                <div>
                                    <label htmlFor="check_in" className="form-label">Check-in date</label>
                                    <input name="check_in" value={firstStep.check_in} onChange={handleFirstStepChange} type="text" className="border border-secondary rounded-pill form-control" id="check_in" placeholder="Friday, 09 December 2022" />
                                </div>
                            </li>
                            <li>
                                <div>
                                    <label htmlFor="check_out" className="form-label">Check-out date</label>
                                    <input name="check_out" value={firstStep.check_out} onChange={handleFirstStepChange} type="text" className="border border-secondary rounded-pill form-control" id="check_out" placeholder="Monday, 12 December 2022" />
                                </div>
                            </li>
                        </ul>
                    </div>
                    <hr />
                    <div className="py-4">
                        <h5 className="mb-3">Step 2: Payment details</h5>
                        <div className="mb-3">
                            <label htmlFor="card_name" className="form-label px-2" style={{ fontWeight: "500" }}>Name on card</label>
                            <input name="card_name" value={secondStep.card_name} onChange={handleSecondStepChange} type="text" className="border border-secondary rounded-pill form-control w-75" id="card_name" placeholder="e.g. Maria Lost" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="card_number" className="form-label px-2" style={{ fontWeight: "500" }}>Card number</label>
                            <input name="card_number" value={secondStep.card_number} onChange={handleSecondStepChange} type="password" className="border border-secondary rounded-pill form-control w-75" id="card_number" placeholder="**** **** **** ****" />
                        </div>
                        <div className="d-flex gap-3 w-75">
                            <div>
                                <label htmlFor="exp_date" className="form-label px-2" style={{ fontWeight: "500" }}>Valid until</label>
                                <input name="exp_date" value={secondStep.exp_date} onChange={handleSecondStepChange} type="text" className="border border-secondary rounded-pill form-control" id="exp_date" placeholder="MM/YY" />
                            </div>
                            <div>
                                <label htmlFor="cvc" className="form-label px-2" style={{ fontWeight: "500" }}>CVC</label>
                                <input name="cvc" value={secondStep.cvc} onChange={handleSecondStepChange} type="password" className="border border-secondary rounded-pill form-control" id="cvc" placeholder="***" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
