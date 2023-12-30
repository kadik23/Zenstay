import backarrow from "../assets/back-arrow.png"
export default function roomsPreview() {
    return(
        <div className="d-flex flex-column flex-shrink-0 p-4 text-dark h-100" style={{color:"black",background:"#F8F8F8",width: "320px"}}>
            <div style={{marginTop:"60px"}}>
                <a href="#"><img src={backarrow} alt="" /></a>
            </div>
            <strong className="py-3">Your Search</strong>
            <ul className="list-unstyled flex-column">
                <li>
                    <div>
                        <label htmlFor="email" className="form-label px-2">Check-in date</label>
                        <input type="email" className="rounded-pill form-control" id="checkIn-date" placeholder="Friday, 09 December 2022"/>
                    </div>
                </li>
                <li>
                    <div>
                        <label htmlFor="email" className="form-label px-2">Check-out date</label>
                        <input type="email" className="rounded-pill form-control" id="checkOut-date" placeholder="Monday, 12 December 2022"/>
                    </div>
                </li>
                <li>
                    <div>
                        <label htmlFor="email" className="form-label px-2">Guests</label>
                        <input type="email" className="rounded-pill form-control" id="" placeholder="2 adults, 1 room"/>
                    </div>
                </li>
                <li>
                    <button className="btn btn-primary rounded-pill w-100 mt-3">Search</button>
                </li>
            </ul>

            <strong className="py-2">Price per night</strong>
            <form action="">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="price" id="price1"/>
                    <label className="form-check-label" htmlFor="price1">
                        less than $50
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="price" id="price2"/>
                    <label className="form-check-label" htmlFor="price2">
                        $50 to 100$
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="price" id="price3"/>
                    <label className="form-check-label" htmlFor="price3">
                        $100 to 150$
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="price" id="price4"/>
                    <label className="form-check-label" htmlFor="price4">
                        150$ and more
                    </label>
                </div>
            </form>

            <strong className="py-2 mt-1">Guest rating</strong>
            <form  action="">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="price" id="price1"/>
                    <label className="form-check-label" htmlFor="price1">
                        less than $50
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="price" id="price2"/>
                    <label className="form-check-label" htmlFor="price2">
                        $50 to $100
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="price" id="price3"/>
                    <label className="form-check-label" htmlFor="price3">
                        $100 to $150
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="price" id="price4"/>
                    <label className="form-check-label" htmlFor="price4">
                        $150 and more
                    </label>
                </div>
            </form>
        </div>
    )
}