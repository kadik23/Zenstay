import { useState, useEffect } from "react";
import axios from "axios";
import useUserStore from "../../Hooks/useUserStore";
import paymentIcon from "../../assets/icons/credit-card.png";
import ConfirmModal from "../ConfirmModal"; 

export default function PaymentInfo() {
    const [savedCards, setSavedCards] = useState([]);
    const [cardNumber, setCardNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, cardId: null });
    const currentUser = useUserStore(state => state.user);

    const getAuthHeader = () => currentUser?.token ? { Authorization: `Bearer ${currentUser.token}` } : {};

    useEffect(() => {
        fetchSavedCards();
    }, []);

    const fetchSavedCards = async () => {
        try {
            const response = await axios.get('/get_saved_cards', { headers: getAuthHeader() });
            setSavedCards(response.data);
        } catch (e) {
            console.error("Failed to fetch saved cards", e);
        }
    };

    const handleSaveCard = async (e) => {
        e.preventDefault();
        if (cardNumber.length < 15) {
            setError('Please enter a valid card number');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await axios.post('/save_card', { card_number: cardNumber }, { headers: getAuthHeader() });
            setCardNumber('');
            fetchSavedCards();
        } catch (e) {
            setError('Failed to save card. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCard = async () => {
        if (!confirmModal.cardId) return;
        try {
            await axios.delete(`/delete_card/${confirmModal.cardId}`, { headers: getAuthHeader() });
            setConfirmModal({ isOpen: false, cardId: null });
            fetchSavedCards();
        } catch (e) {
            console.error("Failed to delete card", e);
        }
    };

    return (
        <div className="p-md-5 row">
            <div className="col-12 col-md-8">
                <div className="mb-5">
                    <h3>Payment information</h3>
                    <span className="text-secondary">Manage your saved cards for faster checkout</span>
                </div>

                <div className="mb-5">
                    <h5 className="mb-3">Saved Cards</h5>
                    {savedCards.length === 0 ? (
                        <p className="text-muted">You have no saved cards.</p>
                    ) : (
                        <div className="d-flex flex-column gap-3">
                            {savedCards.map(method => (
                                <div key={method.id} className="p-3 border rounded-3 d-flex justify-content-between align-items-center bg-white shadow-sm">
                                    <div className="d-flex align-items-center gap-3">
                                        <img src={paymentIcon} width={24} alt="card" />
                                        <div>
                                            <strong className="d-block text-capitalize">{method.card.brand}</strong>
                                            <span className="text-secondary">**** **** **** {method.card.last4}</span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setConfirmModal({ isOpen: true, cardId: method.id })} 
                                        className="btn btn-outline-danger btn-sm rounded-pill"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-4 bg-light rounded-4 border">
                    <h5 className="mb-3">Add a New Card</h5>
                    {error && <div className="alert alert-danger py-2">{error}</div>}
                    <form onSubmit={handleSaveCard}>
                        <div className="mb-3">
                            <label className="form-label" style={{ fontWeight: '500' }}>Card Number (Test Cards Only)</label>
                            <input 
                                type="text" 
                                className="form-control rounded-pill border-secondary" 
                                placeholder="e.g. 4242 4242 4242 4242" 
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                            />
                            <small className="text-muted mt-2 d-block">
                                This is a test environment. Try starting with <strong>4242</strong> for Visa, <strong>4000</strong> for Mastercard, or <strong>3782</strong> for Amex.
                            </small>
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-primary rounded-pill px-4"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save Card'}
                        </button>
                    </form>
                </div>
            </div>
            
            <ConfirmModal 
                isOpen={confirmModal.isOpen}
                title="Remove Card"
                message="Are you sure you want to remove this saved card? This action cannot be undone."
                onConfirm={handleDeleteCard}
                onCancel={() => setConfirmModal({ isOpen: false, cardId: null })}
                confirmText="Yes, Remove"
            />
        </div>
    );
}
