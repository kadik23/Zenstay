import bed from "../../assets/icons/sleeping.png"
import calender from "../../assets/icons/calendar.png"
import room from "../../assets/img/room5.jpg"
import { NavLink } from "react-router-dom"
import axios from "axios";
import {useState,useEffect} from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useSettingsStore from "../../Hooks/useSettingsStore";

export default function Dashboard(){
    const currencySymbol = useSettingsStore(state => state.currencySymbol);
    const [isLoading, setIsLoading] = useState(false);
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [searchName, setSearchName] = useState("");
    const [activeTab, setActiveTab] = useState("popular"); // 'popular' or 'special'
    const [dashboardData, setDashboardData] = useState({
        availableRooms: [],
        popularRooms: [],
        specialOfferRooms: []
    });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    async function fetchDashboardData(e) {
        if(e) e.preventDefault();
        setIsLoading(true);
        try {
            let response = await axios.post('/getDashboardRooms', {
                searchName,
                startDate: startDate ? startDate.toISOString().split('T')[0] : "",
                endDate: endDate ? endDate.toISOString().split('T')[0] : ""
            });
            if(response.data) {
                setDashboardData(response.data);
            }
        } catch(err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    const roomsToDisplay = activeTab === 'popular' ? dashboardData.popularRooms.slice(0, 4) : dashboardData.specialOfferRooms.slice(0, 4);

    return(
        <div className="">
            <div className="mb-5 d-flex align-items-center justify-content-between">
                <div className='d-flex flex-column gap-1'>
                    <h3 className='fw-bold mb-0 d-flex align-items-center gap-2' style={{color:"#2b2b2b"}}>
                        Dashboard <img src={bed} width={24} alt="" />
                    </h3>
                    <small className='fw-medium' style={{color:"#8a8d9d"}}>Find room to stay</small>
                </div>
            </div>
            <form onSubmit={fetchDashboardData} className="d-flex gap-3 mb-5">
                <div className="">
                    <h4 className="fw-bold mb-3">Date</h4>
                    <div className="bg-white rounded-4 p-2 d-flex align-items-center">
                        <img src={calender} width={25} alt="" />
                        <DatePicker
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update) => setDateRange(update)}
                            className="ms-2 border-0 p-1 bg-transparent w-100"
                            placeholderText="Jul 12 - Jul 14"
                            dateFormat="MMM d"
                        />
                    </div>
                </div>
                <div>
                <h4 className="fw-bold mb-3 text-end">Room Name</h4>
                    <div className="bg-white rounded-4 p-2 d-flex align-items-center">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.33333 14.1666V5.83331L9.16666 14.1666V5.83331M12.5 14.1666H16.6667M12.5 8.33331C12.5 8.99635 12.7195 9.63224 13.1102 10.1011C13.5009 10.5699 14.0308 10.8333 14.5833 10.8333C15.1359 10.8333 15.6658 10.5699 16.0565 10.1011C16.4472 9.63224 16.6667 8.99635 16.6667 8.33331C16.6667 7.67027 16.4472 7.03439 16.0565 6.56555C15.6658 6.09671 15.1359 5.83331 14.5833 5.83331C14.0308 5.83331 13.5009 6.09671 13.1102 6.56555C12.7195 7.03439 12.5 7.67027 12.5 8.33331Z" stroke="#71B0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <input className="ms-2 border-0 p-1 bg-transparent" style={{fontWeight:"500", outline: "none"}} type="text" placeholder="Search by room name..." value={searchName} onChange={e => setSearchName(e.target.value)} />
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <div style={{height:"45%"}}></div>
                    <button type="submit" className="btn btn-primary h-50 px-4 rounded-4" disabled={isLoading}>
                        {isLoading ? (
                            <div className="d-flex align-items-center gap-2">
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Searching...
                            </div>
                        ) : (
                            "Search"
                        )}
                    </button>
                </div>
            </form>
            
            <div className="mb-5">
                <div className="d-flex align-items-center justify-content-between">
                    <h4 className="fw-bold mb-3">Lodging available</h4>
                    <NavLink to="/admin/RoomList" className="text-decoration-none" style={{color:"#3d94ff"}}>View All</NavLink>
                </div>
                <div className="overflow-hidden pb-2">
                    <div className="d-flex flex-nowrap gap-3 w-100">
                        {dashboardData.availableRooms.length > 0 ? dashboardData.availableRooms.map((r, index) => (
                            <div key={index} className="rounded-4 p-3 bg-white d-flex flex-column gap-3 shadow-sm border-0" style={{flex: "1 1 0"}}>
                                <div>
                                    <img src={r.image || room} className="w-100 rounded-4" style={{height: "150px", objectFit: "cover"}} alt={r.name} />
                                    <h5 className="mt-3 text-capitalize">{r.name}</h5>
                                </div>
                                <div className="fw-bold fs-5 text-primary">
                                    {currencySymbol === 'DA' ? `${r.price} ${currencySymbol}` : `${currencySymbol}${r.price}`}
                                </div>
                            </div>
                        )) : (
                            <div className="text-muted p-3">No rooms available for the selected dates.</div>
                        )}
                    </div>
                </div>
            </div>

            <div className="">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex gap-5">
                        <h4 className="cursor-pointer m-0" style={{cursor: "pointer", color: activeTab === 'popular' ? "#000" : "#adadad", transition: "0.2s"}} onClick={() => setActiveTab('popular')}>Most Popular</h4>
                        <h4 className="cursor-pointer m-0" style={{cursor: "pointer", color: activeTab === 'special' ? "#000" : "#adadad", transition: "0.2s"}} onClick={() => setActiveTab('special')}>Special Offers</h4>
                    </div>
                    <div>
                        <NavLink to="/admin/RoomList" className="text-decoration-none" style={{color:"#3d94ff"}}> View All</NavLink>
                    </div>
                </div>
                
                <div className="row g-3">
                    {roomsToDisplay.map((r, idx) => (
                        <div key={idx} className="col-6">
                            <div className="bg-white rounded-4 py-2 ps-2 pe-4 d-flex justify-content-between align-items-center h-100 shadow-sm border-0">
                                <div className="d-flex gap-3 align-items-center">
                                    <img src={r.image || room} style={{width: "80px", height: "80px", objectFit: "cover"}} className="rounded-4" alt={r.name} />
                                    <h5 className="m-0 text-capitalize">{r.name}</h5>
                                </div>
                                <div className="fw-bold fs-5 text-primary">
                                    {currencySymbol === 'DA' ? `${r.price} ${currencySymbol}` : `${currencySymbol}${r.price}`}
                                </div>
                            </div>
                        </div>
                    ))}
                    {roomsToDisplay.length === 0 && (
                        <div className="col-12 text-muted p-2">No rooms found.</div>
                    )}
                </div>
            </div>
        </div>
    )
}