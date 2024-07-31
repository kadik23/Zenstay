import { NavLink } from "react-router-dom"
import backarrow from "../../assets/icons/back-arrow.png"
import useRoomsStore from "../../Hooks/useRoomsStore";
export default function roomsPreview() {

    const { setRatingRange, setPriceRange, priceRange, ratingRange, setGuests, guests, rooms, applyFilters } = useRoomsStore();

    const handleInputsChanges = () => {
        applyFilters();
    };

    return(
        <div className="d-flex flex-column flex-shrink-0 p-4 text-dark h-100" style={{color:"black",background:"#F8F8F8",width: "320px"}}>
            <div style={{marginTop:"60px"}}>
                <NavLink to='/' href="#"><img src={backarrow} alt="" /></NavLink>
            </div>
            <strong className="py-3">Your Search</strong>
            <ul className="list-unstyled flex-column">
                {/* soon */}
                {/* <li>
                    <div>
                        <label htmlFor="email" className="form-label px-2">Check-in date</label>
                        <input type="text" className="border border-secondary rounded-pill form-control" id="checkIn-date" placeholder="Friday, 09 December 2022"/>
                    </div>
                </li>
                <li>
                    <div>
                        <label htmlFor="email" className="form-label px-2">Check-out date</label>
                        <input type="text" className="border border-secondary rounded-pill form-control" id="checkOut-date" placeholder="Monday, 12 December 2022"/>
                    </div>
                </li> */}
                <li>
                    <div>
                        <label htmlFor="email" className="form-label px-2">Guests</label>
                        <input value={guests} onChange={(ev) => setGuests(ev.target.value)} type="text" className="border border-secondary rounded-pill form-control" id="Guests" placeholder="2 adults, 1 room"/>
                    </div>
                </li>
                <li>
                    <button className="btn btn-primary rounded-pill w-100 mt-3" onClick={handleInputsChanges}>Search</button>
                </li>
            </ul>

            <strong className="py-2">Price per night</strong>
            <form action="">
                <div className="form-check">
                    <input checked={priceRange === "<50"} className="form-check-input" type="checkbox" name="price" id="price1" value="<50" onChange={(e) => setPriceRange(e.target.checked ? "<50" : [])}/>
                    <label className="form-check-label" htmlFor="price1">
                        less than $50
                    </label>
                </div>
                <div className="form-check">
                    <input checked={priceRange === "50-100"} className="form-check-input" type="checkbox" name="price" id="price2" value="50-100" onChange={(e) => setPriceRange(e.target.checked ? "50-100" : [])}/>
                    <label className="form-check-label" htmlFor="price2">
                        $50 to 100$
                    </label>
                </div>
                <div className="form-check">
                    <input checked={priceRange === "100-150"} className="form-check-input" type="checkbox" name="price" id="price3" value="100-150" onChange={(e) => setPriceRange(e.target.checked ? "100-150" : [])}/>
                    <label className="form-check-label" htmlFor="price3">
                        $100 to 150$
                    </label>
                </div>
                <div className="form-check">
                    <input checked={priceRange === ">150"} className="form-check-input" type="checkbox" name="price" id="price4" value=">150" onChange={(e) => setPriceRange(e.target.checked ? ">150" : [])}/>
                    <label className="form-check-label" htmlFor="price4">
                        150$ and more
                    </label>
                </div>
            </form>

            <strong className="py-2 mt-1">Guest rating</strong>
            <form  action="">
                <div className="form-check">
                    <input checked={ratingRange=='<5.0'} className="form-check-input" type="checkbox" name="rate" id="rate1" value="<5.0" onChange={(e) => setRatingRange(e.target.checked ? "<5.0" : [])}/>
                    <label className="form-check-label" htmlFor="rate1">
                        less than 5.0
                    </label>
                </div>
                <div className="form-check">
                    <input checked={ratingRange=='5.0-6.0'} className="form-check-input" type="checkbox" name="rate" id="rate2" value="5.0-6.0" onChange={(e) => setRatingRange(e.target.checked ? "5.0-6.0" : [])}/>
                    <label className="form-check-label" htmlFor="rate2">
                        5.0 to 6.0
                    </label>
                </div>
                <div className="form-check">
                    <input checked={ratingRange=='6.0-7.0'} className="form-check-input" type="checkbox" name="rate" id="rate3" value="6.0-7.0" onChange={(e) => setRatingRange(e.target.checked ? "6.0-7.0" : [])}/>
                    <label className="form-check-label" htmlFor="rate3">
                        6.0 to 7.0
                    </label>
                </div>
                <div className="form-check">
                    <input checked={ratingRange=='>7.0'} className="form-check-input" type="checkbox" name="rate" id="rate4" value=">7.0" onChange={(e) => setRatingRange(e.target.checked ? ">7.0" : [])}/>
                    <label className="form-check-label" htmlFor="rate4">
                        7.0 and more
                    </label>
                </div>
            </form>
        </div>
    )
}