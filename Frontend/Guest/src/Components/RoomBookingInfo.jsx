import { NavLink } from 'react-router-dom'
import image from '../assets/room1.jpg'
export default function RoomBookingInfo(){
    return(
        <div >
            <div className='p-4 rounded-3 shadow'>
                <img src={image} height={250} style={{objectFit:'cover'}} className='w-100 rounded-4' alt="" />
                <div className='mt-4'>
                    <h4 className="mb-5 fw-bold">Room </h4>
                     <div>
                        <div className='d-flex gap-3 border-bottom pb-3'>
                            <div className='d-flex flex-column'>
                                <span className='pe-0' style={{fontWeight:'500'}}>
                                    Check-in
                                </span>
                                <span className='pe-0' style={{fontWeight:'500'}}>
                                    Check-out
                                </span>
                            </div>
                            <div className='d-flex flex-column'>
                                <span className=''>
                                    Friday, 09 December 2022
                                </span>
                                <span className=''>
                                    Monday, 12 December 2022
                                </span>
                            </div>
                        </div>
                        <div className='pb-3 border-bottom'>
                            <span className='pe-0' style={{fontWeight:'500'}}>
                                Standard double room
                            </span>     
                            <div className='mb-3'>
                                <div className='row'>
                                    <span className='col-4'>Price per night</span>
                                    <span className='col-4'>$180</span>
                                </div>
                                <div className='row'>
                                    <span className='col-4'>3 night</span>
                                    <span className='col-4'>$540</span>
                                </div>
                            </div>
                            <div>
                                <div className='row'>
                                    <span className='col-4'>City tax</span>
                                    <span className='col-4'>$40</span>
                                </div>
                                <div className='row'>
                                    <span className='col-4'>Service fee</span>
                                    <span className='col-4'>$20</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='row'>
                                <strong className='col-4'>Total</strong>
                                <span className='col-4'>$600</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NavLink to='/BookingConfirmed' className="btn btn-primary rounded-pill w-100 mt-3">Book now</NavLink>
        </div>
    )
}