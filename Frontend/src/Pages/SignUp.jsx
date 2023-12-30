import fbicon from '../assets/icons/facebook.png'
import githubicon from '../assets/icons/github.png'
import Xicon from '../assets/icons/twitter.png'
export default function SingUp(){

    return(
        <>
            <div className="SignUp-form modal modal-sheet position-static d-block p-4 py-md-5" tabindex="-1" role="dialog" id="modalSignin">
                <div className="modal-dialog" role="document">
                    <div className="modal-content rounded-4 shadow-lg">
                        <div className="modal-header p-5 pb-4 border-bottom-0">
                            <h1 className="fw-bold mb-0 fs-2 text-white">Sign up</h1>
                            <button type="button" className="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-5 pt-0">
                            <form className="">
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control rounded-3" id="floatingInput" placeholder="name@example.com"/>
                                    <label for="floatingInput">Username</label>
                                </div>
                                <div className='d-lg-flex'>
                                    <div className="form-floating mb-3 me-lg-2">
                                        <input type="email" className="form-control rounded-3" id="floatingInput" placeholder="name@example.com"/>
                                        <label for="floatingInput">First Name </label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control rounded-3" id="floatingInput" placeholder="name@example.com"/>
                                        <label for="floatingInput">Last Name</label>
                                    </div>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control rounded-3" id="floatingInput" placeholder="name@example.com"/>
                                    <label for="floatingInput">Email</label>
                                </div>
                                <div className='d-lg-flex'>
                                    <div className="form-floating mb-3 me-lg-2">
                                        <input type="password" className="form-control rounded-3" id="floatingPassword" placeholder="Password"/>
                                        <label for="floatingPassword">Password</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control rounded-3" id="floatingPassword" placeholder="Password"/>
                                        <label for="floatingPassword">Confirm Password</label>
                                    </div>
                                </div>
                                <div className="w-100 d-flex justify-content-center">
                                    <button className="my-4 btn btn-lg rounded-pill px-5 btn-primary" type="submit">Sign up</button>
                                </div>
                                <small className="text-white">By clicking Sign up, you agree to the terms of use.</small>
                                <hr className="my-4"/>
                                <h2 className="fs-5 fw-bold mb-3 text-white">Or use a third-party</h2>
                                <button className="d-flex justify-content-center align-items-center w-100 py-2 mb-2 btn btn-outline-secondary rounded-3" type="submit">
                                    <img src={Xicon} alt="Twitter" className='me-2' />
                                    Sign up with Twitter
                                </button>
                                <button className="d-flex justify-content-center align-items-center w-100 py-2 mb-2 btn btn-outline-primary rounded-3" type="submit">
                                    <img src={fbicon} alt="facebook" className='me-2' />
                                    Sign up with Facebook
                                </button>
                                <button className="d-flex justify-content-center align-items-center w-100 py-2 mb-2 btn btn-outline-secondary rounded-3" type="submit">
                                    <img src={githubicon} alt="facebook" className='me-2' />
                                    Sign up with GitHub
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}