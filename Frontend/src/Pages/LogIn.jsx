import { NavLink } from 'react-router-dom';
import fbicon from '../assets/icons/facebook.png'
import googleicon from '../assets/icons/google.png'
export default function LogIn(){

    return(
        <>
            <div className="modal modal-sheet position-static d-block p-4 py-md-5" tabIndex="-1" role="dialog" id="modalSignin">
                <div className="modal-dialog" role="document">
                    <div className="modal-content rounded-4 shadow">
                        <div className="modal-header p-5 pb-4 border-bottom-0"> 
                            <h1 className="fw-bold mb-0 fs-2">Login</h1>
                            <NavLink to='/' className="btn-close"></NavLink>
                        </div>
                        <div className="modal-body p-5 pt-0">
                            <form className="">
                                <div className="border border-secondary rounded-2 form-floating mb-3">
                                    <input type="email" className="form-control rounded-3" id="floatingInput" placeholder="name@example.com"/>
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="border border-secondary rounded-2 form-floating mb-3">
                                    <input type="password" className="form-control rounded-3" id="floatingPassword" placeholder="Password"/>
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Log in</button>
                                <small className="text-body-secondary">By clicking Sign up, you agree to the terms of use.</small>
                                <hr className="my-4"/>
                                <h2 className="fs-5 fw-bold mb-3">Or use a third-party</h2>
                                <button className="d-flex justify-content-center align-items-center w-100 py-2 mb-2 btn btn-outline-secondary rounded-3" type="submit">
                                    <img src={googleicon} width={20} alt="Twitter" className='me-2' />
                                    Login with Google
                                </button>
                                <button className="d-flex justify-content-center align-items-center w-100 py-2 mb-2 btn btn-outline-primary rounded-3" type="submit">
                                    <img src={fbicon} width={20} alt="facebook" className='me-2' />
                                    Login with Facebook
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}