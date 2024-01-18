export default function Footer() {

    return(
        <>
            <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-4">
                <div className="col">
                <a className="navbar-brand text-body-emphasis me-lg-4" href="#">Zentsy</a><br />
                <small>Your favourite hotel booking experience since 1997!</small>
                <p className="text-body-secondary mt-5">© 2023</p>
                </div>

                <div className="col ">

                </div>

                <div className="col">
            
                </div>

                <div className="col">
                
                </div>

                <div className="col">
                <ul className="list-unstyled flex-column">
                    <li className="mb-2"><a href="#" className="text-decoration-none fw-bold p-0 text-body-secondary">Help</a></li>
                    <li className="mb-2"><a href="#" className="text-decoration-none p-0 text-body-secondary">FAQ</a></li>
                    <li className="mb-2"><a href="#" className="text-decoration-none p-0 text-body-secondary">Custom service</a></li>
                    <li className="mb-2"><a href="#" className="text-decoration-none p-0 text-body-secondary">How to guide</a></li>
                    <li className="mb-2"><a href="#" className="text-decoration-none p-0 text-body-secondary">Cantact us</a></li>
                </ul>
                </div>
            </footer>
        </>
    )
}