import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useUserStore from '../../Hooks/useUserStore';

export default function Settings() {
    const [activeTab, setActiveTab] = useState('booking');
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const { user } = useUserStore();

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await axios.get('/settings');
            setSettings(response.data);
            setLoading(false);
        } catch (e) {
            console.error('Failed to load settings', e);
            setLoading(false);
        }
    };

    const handleSaveSettings = async () => {
        try {
            // Need token fallback logic if it exists
            const token = user?.token;
            await axios.put('/settings', settings, {
                withCredentials: true,
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            alert('Settings saved successfully!');
        } catch (e) {
            console.error('Failed to save settings', e);
            alert('Failed to save settings');
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            return alert("New passwords don't match!");
        }
        try {
            const token = user?.token;
            await axios.put('/change_password', passwords, {
                withCredentials: true,
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            alert('Password changed successfully!');
            setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } catch (e) {
            alert(e.response?.data || 'Failed to change password');
        }
    };

    if (loading) return <div className="p-5">Loading settings...</div>;
    if (!settings) return <div className="p-5">Failed to load settings.</div>;

    const renderBookingPolicies = () => (
        <div className="bg-white rounded-4 shadow-sm p-4 w-100">
            <h4 className="fw-bold mb-4">Booking & Policies</h4>
            <div className="mb-4">
                <label className="form-label fw-medium">Check-in Time</label>
                <input type="time" className="form-control rounded-3 w-50" 
                    value={settings.check_in_time} 
                    onChange={e => setSettings({...settings, check_in_time: e.target.value})} />
            </div>
            <div className="mb-4">
                <label className="form-label fw-medium">Check-out Time</label>
                <input type="time" className="form-control rounded-3 w-50" 
                    value={settings.check_out_time} 
                    onChange={e => setSettings({...settings, check_out_time: e.target.value})} />
            </div>
            <div className="mb-4">
                <label className="form-label fw-medium">Cancellation Policy</label>
                <textarea className="form-control rounded-3" rows="3"
                    value={settings.cancellation_policy} 
                    onChange={e => setSettings({...settings, cancellation_policy: e.target.value})}></textarea>
            </div>
            <div className="mb-4">
                <label className="form-label fw-medium">Tax Rate (%)</label>
                <input type="number" className="form-control rounded-3 w-25" 
                    value={settings.tax_rate} 
                    onChange={e => setSettings({...settings, tax_rate: Number(e.target.value)})} />
            </div>
            <button onClick={handleSaveSettings} className="btn btn-primary rounded-pill px-4 py-2 fw-bold">Save Settings</button>
        </div>
    );

    const renderPaymentIntegrations = () => (
        <div className="bg-white rounded-4 shadow-sm p-4 w-100">
            <h4 className="fw-bold mb-4">Payment & Integrations</h4>
            <div className="mb-4">
                <label className="form-label fw-medium">Currency</label>
                <select className="form-select rounded-3 w-50" 
                    value={settings.currency} 
                    onChange={e => setSettings({...settings, currency: e.target.value})}>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="DA">DA</option>
                </select>
            </div>
            <div className="mb-4 pt-3 border-top">
                <h6 className="fw-bold mb-3">Payment Gateway</h6>
                <div className="form-check form-switch d-flex align-items-center gap-2 p-0">
                    <label className="form-check-label flex-grow-1" style={{maxWidth: '300px'}}>
                        Enable Credit Card Payments
                        <div className="text-muted small">If disabled, clients will pay at the property or via an external link.</div>
                    </label>
                    <input className="form-check-input ms-0 mt-0" type="checkbox" role="switch" style={{width: '50px', height: '25px', cursor: 'pointer'}}
                        checked={settings.payment_gateway_active} 
                        onChange={e => {
                            const val = e.target.checked;
                            setSettings({...settings, payment_gateway_active: val});
                        }} />
                </div>
            </div>
            <button onClick={handleSaveSettings} className="btn btn-primary rounded-pill px-4 py-2 fw-bold mt-3">Save Settings</button>
        </div>
    );

    const renderSecurityAdmin = () => (
        <div className="d-flex flex-column gap-4 w-100">
            <div className="bg-white rounded-4 shadow-sm p-4">
                <h4 className="fw-bold mb-4">Notification Preferences</h4>
                <div className="d-flex flex-column gap-3">
                    <div className="form-check form-switch d-flex justify-content-between p-0">
                        <label className="form-check-label">New Bookings Alerts</label>
                        <input className="form-check-input ms-0" type="checkbox" role="switch" style={{cursor: 'pointer'}}
                            checked={settings.notification_preferences?.new_booking} 
                            onChange={e => setSettings({
                                ...settings, 
                                notification_preferences: { ...settings.notification_preferences, new_booking: e.target.checked }
                            })} />
                    </div>
                    <div className="form-check form-switch d-flex justify-content-between p-0">
                        <label className="form-check-label">Cancellation Alerts</label>
                        <input className="form-check-input ms-0" type="checkbox" role="switch" style={{cursor: 'pointer'}}
                            checked={settings.notification_preferences?.cancellations} 
                            onChange={e => setSettings({
                                ...settings, 
                                notification_preferences: { ...settings.notification_preferences, cancellations: e.target.checked }
                            })} />
                    </div>
                    <div className="form-check form-switch d-flex justify-content-between p-0">
                        <label className="form-check-label">User Registration Alerts</label>
                        <input className="form-check-input ms-0" type="checkbox" role="switch" style={{cursor: 'pointer'}}
                            checked={settings.notification_preferences?.user_registrations} 
                            onChange={e => setSettings({
                                ...settings, 
                                notification_preferences: { ...settings.notification_preferences, user_registrations: e.target.checked }
                            })} />
                    </div>
                </div>
                <button onClick={handleSaveSettings} className="btn btn-primary rounded-pill px-4 py-2 fw-bold mt-4">Save Notifications</button>
            </div>

            <div className="bg-white rounded-4 shadow-sm p-4">
                <h4 className="fw-bold mb-4">Change Password</h4>
                <form onSubmit={handleChangePassword}>
                    <div className="mb-3">
                        <label className="form-label fw-medium">Current Password</label>
                        <input type="password" required className="form-control rounded-3 w-75" 
                            value={passwords.oldPassword} 
                            onChange={e => setPasswords({...passwords, oldPassword: e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-medium">New Password</label>
                        <input type="password" required minLength={8} className="form-control rounded-3 w-75" 
                            value={passwords.newPassword} 
                            onChange={e => setPasswords({...passwords, newPassword: e.target.value})} />
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-medium">Confirm New Password</label>
                        <input type="password" required minLength={8} className="form-control rounded-3 w-75" 
                            value={passwords.confirmPassword} 
                            onChange={e => setPasswords({...passwords, confirmPassword: e.target.value})} />
                    </div>
                    <button type="submit" className="btn btn-danger rounded-pill px-4 py-2 fw-bold">Update Password</button>
                </form>
            </div>
        </div>
    );

    return (
        <div style={{ minHeight: "80vh" }}>
            <div className='mb-5'>
                <h3 className='fw-bold mb-1' style={{color:"#2b2b2b"}}>Settings</h3>
                <span className="text-secondary">Manage platform configuration and security</span>
            </div>

            <div className="row h-100">
                <div className="col-12 col-md-3 border-end pe-4 mb-4 mb-md-0">
                    <div className="d-flex flex-column gap-2">
                        <div onClick={() => setActiveTab('booking')} 
                             className={`px-3 py-3 rounded-3 fw-bold d-flex align-items-center gap-3 ${activeTab === 'booking' ? 'text-primary' : 'text-dark'}`}
                             style={{ cursor: 'pointer', transition: '0.2s' }}>
                            Booking & Policies
                        </div>
                        <div onClick={() => setActiveTab('payment')} 
                             className={`px-3 py-3 rounded-3 fw-bold d-flex align-items-center gap-3 ${activeTab === 'payment' ? 'text-primary' : 'text-dark'}`}
                             style={{ cursor: 'pointer', transition: '0.2s' }}>
                            Payment & Integrations
                        </div>
                        <div onClick={() => setActiveTab('security')} 
                             className={`px-3 py-3 rounded-3 fw-bold d-flex align-items-center gap-3 ${activeTab === 'security' ? 'text-primary' : 'text-dark'}`}
                             style={{ cursor: 'pointer', transition: '0.2s' }}>
                            Security & Admin
                        </div>
                    </div>
                </div>
                
                <div className="col-12 col-md-8 ps-md-5">
                    {activeTab === 'booking' && renderBookingPolicies()}
                    {activeTab === 'payment' && renderPaymentIntegrations()}
                    {activeTab === 'security' && renderSecurityAdmin()}
                </div>
            </div>
        </div>
    );
}
