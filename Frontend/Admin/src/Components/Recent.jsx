import setting from "../assets/icons/setting.png"
import user from "../assets/icons/user.png"
import logout from "../assets/icons/logout.png"
import room from "../assets/img/room5.jpg"
export default function Recent() {

    return(
        <div className="w-100">
                <div className="flex-shrink-0 dropdown pb-3 border-bottom mb-4">
                    <a className="d-block px-2 link-body-emphasis text-decoration-none d-flex align-items-center gap-1 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="mdo" width="40" height="40" className="rounded-circle me-2"/>
                        <div className="d-flex flex-column user-select-none me-auto">
                            <strong>Jhonathen Smith</strong>
                            <span style={{color:"#adadad"}}>Traveller Enthusiast</span>
                        </div>
                    </a>
                    <ul className="dropdown-menu text-small shadow">
                        <li>
                            <button className="dropdown-item">
                                <div className="d-flex align-items-center">
                                    <img src={setting} width={30} alt="user icon" className="pe-2" />
                                    Settings
                                </div>
                            </button>
                        </li>
                        <li>
                            <button className="dropdown-item">
                                <div className="d-flex align-items-center">
                                    <img src={user} width={30} alt="user icon" className="pe-2" />
                                    Profile
                                </div>
                            </button>
                        </li>
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                            <button className="dropdown-item d-flex align-items-center">
                                <img src={logout} width={30} alt="user icon" className="pe-2" />
                                Sign out
                            </button>
                        </li>
                    </ul>
                </div>
                <h5 className="mb-3">Shikara Hotel</h5>
                <div className="w-100 row gap-2 mb-3" >
                    <div className="col-6 pe-0">
                        <img src={room} className="w-100 h-100 p-0 rounded-3" style={{objectFit:"cover"}} alt="" />
                    </div>
                    <div className="col w-50 pe-0 d-flex flex-column gap-2">
                        <div className="row">
                            <img src={room} className="p-0 rounded-3 w-100" style={{objectFit:"cover"}} alt="" />
                        </div>
                        <div className="row h-auto">
                            <img src={room} className="p-0 w-100 rounded-3" style={{objectFit:"cover"}} alt="" />
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <strong>Overview</strong>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus cupiditate optio quidem in vitae itaque nobis. Voluptas explicabo, modi architecto eius incidunt voluptates consequuntur vero distinctio amet aliquam quas recusandae?</p>
                </div>
                <div className="w-100 p-0">
                    <strong>Location</strong>
                    <div className="mt-3 w-100 p-0">
                        <iframe className="rounded-3 w-100" src="https://maps.google.com/maps?q=chicago&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe>
                    </div>
                </div>
        </div>
    )
}