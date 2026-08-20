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
import useUserStore from "../../Hooks/useUserStore";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { formatDisplayDate } from "../../Utils/formatDate";
import { getAuthHeader } from "../../Utils/auth";

export default function UserInfoSideBar({room}) {

    const { firstStep, secondStep, handleFirstStepChange, handleSecondStepChange, selectedPaymentMethod, setSelectedPaymentMethod } = useBookRoomStore();
    const [settings, setSettings] = useState(null);
    const [savedCards, setSavedCards] = useState([]);
    const [useNewCard, setUseNewCard] = useState(true);
    const checkInRef = useRef(null);
    const checkOutRef = useRef(null);
    const currentUser = useUserStore(state => state.user);

    useEffect(() => {
        axios.get('/settings').then(res => setSettings(res.data)).catch(console.error);
        fetchSavedCards();
    }, []);

    const fetchSavedCards = async () => {
        try {
            const response = await axios.get('/get_saved_cards', {
                headers: getAuthHeader()
            });
            if (response.data && response.data.length > 0) {
                setSavedCards(response.data);
                setUseNewCard(false);
                setSelectedPaymentMethod(response.data[0].id);
            }
        } catch (e) {
            console.error("Failed to fetch saved cards", e);
        }
    };

    const handleCardSelection = (e) => {
        const val = e.target.value;
        if (val === 'new') {
            setUseNewCard(true);
            setSelectedPaymentMethod(null);
        } else {
            setUseNewCard(false);
            setSelectedPaymentMethod(val);
        }
    };

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
                                    <label className="form-label">Check-in date</label>
                                    <div onClick={() => checkInRef.current?.showPicker()} className="position-relative overflow-hidden border border-secondary rounded-pill form-control d-flex align-items-center" style={{height: "38px", cursor: "pointer"}}>
                                        {firstStep.check_in ? formatDisplayDate(firstStep.check_in) : <span className="text-muted">Friday, 09 December 2022</span>}
                                        <input ref={checkInRef} name="check_in" value={firstStep.check_in} onChange={handleFirstStepChange} type="date" className="position-absolute" style={{width: "1px", height: "1px", opacity: 0, bottom: "0", right: "0"}} />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <label className="form-label">Check-out date</label>
                                    <div onClick={() => checkOutRef.current?.showPicker()} className="position-relative overflow-hidden border border-secondary rounded-pill form-control d-flex align-items-center" style={{height: "38px", cursor: "pointer"}}>
                                        {firstStep.check_out ? formatDisplayDate(firstStep.check_out) : <span className="text-muted">Monday, 12 December 2022</span>}
                                        <input ref={checkOutRef} name="check_out" value={firstStep.check_out} onChange={handleFirstStepChange} type="date" className="position-absolute" style={{width: "1px", height: "1px", opacity: 0, bottom: "0", right: "0"}} />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <hr />
                    <div className="py-4">
                        <h5 className="mb-3">Step 2: Payment details</h5>
                        {!settings || settings.payment_gateway_active ? (
                            <>
                                {savedCards.length > 0 && (
                                    <div className="mb-4">
                                        <label className="form-label" style={{ fontWeight: "500" }}>Select Payment Method</label>
                                        <select 
                                            className="form-select border-secondary rounded-pill w-75"
                                            value={useNewCard ? 'new' : selectedPaymentMethod || ''}
                                            onChange={handleCardSelection}
                                        >
                                            {savedCards.map(card => (
                                                <option key={card.id} value={card.id}>
                                                    {card.card.brand.toUpperCase()} ending in {card.card.last4}
                                                </option>
                                            ))}
                                            <option value="new">Use a different card</option>
                                        </select>
                                    </div>
                                )}

                                {useNewCard && (
                                    <div className="p-3 border rounded-3 bg-light w-75 mb-3">
                                        <div className="mb-3">
                                            <label htmlFor="card_name" className="form-label px-2" style={{ fontWeight: "500" }}>Name on card</label>
                                            <input name="card_name" value={secondStep.card_name} onChange={handleSecondStepChange} type="text" className="border border-secondary rounded-pill form-control" id="card_name" placeholder="e.g. Maria Lost" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="card_number" className="form-label px-2" style={{ fontWeight: "500" }}>Card number</label>
                                            <input name="card_number" value={secondStep.card_number} onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, '').slice(0, 16);
                                                e.target.value = val;
                                                handleSecondStepChange(e);
                                            }} type="text" className="border border-secondary rounded-pill form-control" id="card_number" placeholder="**** **** **** ****" />
                                        </div>
                                        <div className="d-flex gap-3">
                                            <div className="w-50">
                                                <label htmlFor="exp_date" className="form-label px-2" style={{ fontWeight: "500" }}>Valid until</label>
                                                <input  name="exp_date" value={secondStep.exp_date} onChange={handleSecondStepChange} type="month" className="border border-secondary rounded-pill form-control" id="exp_date" placeholder="MM/YY" />
                                            </div>
                                            <div className="w-50">
                                                <label htmlFor="cvc" className="form-label px-2" style={{ fontWeight: "500" }}>CVC</label>
                                                <input minLength={3} maxLength={3} name="cvc" value={secondStep.cvc} onChange={handleSecondStepChange} type="password" className="border border-secondary rounded-pill form-control" id="cvc" placeholder="***" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="bg-light p-4 rounded-4 border border-warning">
                                <h6 className="fw-bold text-dark mb-2">Pay Outside the Platform</h6>
                                <p className="text-secondary mb-0">Online credit card payments are currently disabled. Please confirm your booking, and the property management will contact you to arrange payment.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
