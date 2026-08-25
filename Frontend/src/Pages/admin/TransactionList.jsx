import React, { useEffect, useState } from 'react';
import axios from 'axios';
import search from '../../assets/icons/search.png';
import ALertMessage from '../../Components/guest/ALertMessage';
import useAlertMessageStore from '../../Hooks/useAlertMessage';
import useSettingsStore from '../../Hooks/useSettingsStore';

export default function TransactionList() {
    const currencySymbol = useSettingsStore(state => state.currencySymbol);
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { alert } = useAlertMessageStore();

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const res = await axios.get('/transactions');
            setTransactions(res.data);
            setFilteredTransactions(res.data);
        } catch (err) {
            console.error("Failed to fetch transactions:", err);
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = transactions.filter(tx => 
            tx.stripe_id?.toLowerCase().includes(term) ||
            tx.booking_id?.toLowerCase().includes(term)
        );
        setFilteredTransactions(filtered);
    };

    const getStatusBadge = (status) => {
        switch (status?.toLowerCase()) {
            case 'succeeded': return <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">Succeeded</span>;
            case 'pending': return <span className="badge bg-warning-subtle text-warning rounded-pill px-3 py-2">Pending</span>;
            case 'failed': return <span className="badge bg-danger-subtle text-danger rounded-pill px-3 py-2">Failed</span>;
            default: return <span className="badge bg-secondary-subtle text-secondary rounded-pill px-3 py-2">{status || 'Unknown'}</span>;
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="container-fluid p-0">
            <div className='mb-4 d-flex align-items-center justify-content-between'>
                <div className='d-flex flex-column gap-1'>
                    <h3 className='fw-bold mb-0' style={{color:"#2b2b2b"}}>Transactions</h3>
                    <span className="text-secondary">Manage and view all payments</span>
                </div>
            </div>

            <div className='d-flex align-items-center justify-content-between mb-4'>
                <div className="position-relative w-25">
                    <img src={search} className="position-absolute" style={{left: "15px", top: "50%", transform: "translateY(-50%)", width: "18px"}} alt="search" />
                    <input 
                        type="text" 
                        className="form-control rounded-pill ps-5 bg-white border-0 shadow-sm" 
                        placeholder="Search by ID..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            <div className="bg-white rounded-4 shadow-sm p-4">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0 border-0">
                        <thead>
                            <tr className="text-muted" style={{fontSize: "0.9rem"}}>
                                <th className="border-0 pb-3 font-weight-normal">Transaction ID</th>
                                <th className="border-0 pb-3 font-weight-normal">Date</th>
                                <th className="border-0 pb-3 font-weight-normal">Amount</th>
                                <th className="border-0 pb-3 font-weight-normal">Booking ID</th>
                                <th className="border-0 pb-3 font-weight-normal">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map((tx) => (
                                <tr key={tx._id} className="border-bottom" style={{borderColor: "#f0f0f0"}}>
                                    <td className="py-3 border-0">
                                        <div className="fw-medium text-dark">{tx.stripe_id || 'N/A'}</div>
                                    </td>
                                    <td className="py-3 border-0 text-secondary">{formatDate(tx.createdAt)}</td>
                                    <td className="py-3 border-0">
                                        <div className="fw-bold">{currencySymbol === 'DA' ? `${tx.amount} ${currencySymbol}` : `${currencySymbol}${tx.amount}`}</div>
                                    </td>
                                    <td className="py-3 border-0 text-secondary">{tx.booking_id}</td>
                                    <td className="py-3 border-0">{getStatusBadge(tx.status)}</td>
                                </tr>
                            ))}
                            {filteredTransactions.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center py-5 text-muted border-0">
                                        No transactions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
