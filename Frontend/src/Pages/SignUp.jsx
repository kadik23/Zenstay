import { NavLink } from 'react-router-dom'
import fbicon from '../assets/icons/facebook.png'
import googleicon from '../assets/icons/google.png'
import axios from "axios";
import {useState,useContext} from "react";
import {UserContext} from "./UserContext.jsx";

export default function SingUp(){
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [firstname,setFirstname] = useState('')
    const [lastname,setLastname] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [errorPassword,setErrorPassword] = useState(false)
    const {setUser} = useContext(UserContext);

    async function registerUser(ev){
        ev.preventDefault();
        if(confirmPassword==password){
            try{
                data = await axios.post('/register',{
                    username,email,firstname,lastname,password
                })
                alert('Registration successful. Now you can log in')
                setUser(data)
            }catch(e){
                alert('Registration failed. Please try again later')
            }
        }
        else setErrorPassword(true)
    }
    return(
        <>
            <div className="modal modal-sheet position-static d-block p-4 py-md-5" tabIndex="-1" role="dialog" id="modalSignin" style={{height:"100vh",background:"#111827"}}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content rounded-4">
                        <div className="modal-header p-5 pb-4 border-bottom-0">
                            <h1 className="fw-bold mb-0 fs-2 text-white">Sign up</h1>
                            <NavLink to='/' className="btn-close bg-white"></NavLink>
                        </div>
                        <div className="modal-body p-5 pt-0">
                            <form className="" onSubmit={registerUser}>
                                <div className="form-floating text-secondary mb-3">
                                    <input  
                                            type="text" 
                                            className="border-bottom border-secondary form-control" 
                                            id="floatingInputUsername" 
                                            placeholder="name@example.com"
                                            value={username}
                                            onChange={ev=>setUsername(ev.target.value)}
                                    />
                                    <label htmlFor="floatingInput">Username</label>
                                </div>
                                <div className='d-lg-flex text-secondary'>
                                    <div className="form-floating mb-3 me-lg-2">
                                        <input  
                                                type="text" 
                                                className="border-bottom border-secondary form-control" 
                                                id="floatingInputFirstName" 
                                                value={firstname}
                                                onChange={ev=>setFirstname(ev.target.value)}
                                                placeholder="name@example.com"
                                        />
                                        <label htmlFor="floatingInput">First Name </label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input  
                                                type="text" 
                                                className="border-bottom border-secondary form-control" 
                                                id="floatingInputLastName" 
                                                placeholder="name@example.com"
                                                value={lastname}
                                                onChange={ev=>setLastname(ev.target.value)}
                                        />
                                        <label htmlFor="floatingInput">Last Name</label>
                                    </div>
                                </div>
                                <div className="form-floating text-secondary mb-3">
                                    <input  type="text" 
                                            className="border-bottom border-secondary form-control" 
                                            id="floatingInputEmail" 
                                            placeholder="name@example.com"
                                            value={email}
                                            onChange={ev=>setEmail(ev.target.value)}
                                    />
                                    <label htmlFor="floatingInput">Email</label>
                                </div>
                                <div className='d-lg-flex text-secondary'>
                                    <div className="form-floating me-lg-2">
                                        <input 
                                                type="password" 
                                                className="border-bottom border-secondary form-control" 
                                                id="floatingInputPassword" 
                                                placeholder="Password"
                                                value={password}
                                                onChange={ev=>setPassword(ev.target.value)}
                                        />
                                        <label htmlFor="floatingPassword">Password</label>
                                    </div>
                                    <div className="form-floating">
                                        <input  type="password" 
                                                className="border-bottom border-secondary form-control" 
                                                id="floatingInputConfirmPassword" 
                                                placeholder="Password"
                                                value={confirmPassword}
                                                onChange={ev=>setConfirmPassword(ev.target.value)}
                                        />
                                        <label htmlFor="floatingPassword">Confirm Password</label>
                                        { errorPassword && 
                                        <p className=' text-secondary' >Passwords do not match.</p>
                                        }
                                    </div>
                                </div>
                                <div className="w-100 d-flex justify-content-center">
                                    <button className="my-4 btn btn-lg rounded-pill px-5 btn-primary">Sign up</button>
                                </div>
                                <small className="text-secondary">By clicking Sign up, you agree to the terms of use.</small>
                                <hr className=""/>
                                <h2 className="fs-5 fw-bold mb-3 text-white">Or use a third-party</h2>
                                <button className="d-flex justify-content-center align-items-center w-100 py-2 mb-2 btn btn-outline-light rounded-3" type="submit">
                                    <img src={googleicon} width={20} alt="Twitter" className='me-2' />
                                    Sign up with Google
                                </button>
                                <button className="d-flex justify-content-center align-items-center w-100 py-2 mb-2 btn btn-outline-primary rounded-3" type="submit">
                                    <img src={fbicon} width={20} alt="facebook" className='me-2' />
                                    Sign up with Facebook
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}