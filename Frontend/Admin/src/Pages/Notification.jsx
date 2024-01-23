import React from 'react'
import search from '../assets/icons/search.png'
import message from '../assets/icons/Message.png'
import notificationmessage from '../assets/icons/discussion.png'
import diagram from '../assets/icons/diagram.webp'
import economy from '../assets/icons/economy.png'

function Notification() {
  return (
    <div>
        <div className='mb-5'>
            <h3 className='fw-bold' style={{color:"#494949"}}>Notifications</h3>
            <small className='fw-bold' style={{color:"#c7c9d9"}}>With all of the styling tool options availablein today's market</small>
        </div>
        <div className='p-4'>
            <div className='shadow rounded-3 px-4 py-3'>
                <div className='rounded-3 px-3 py-1 d-flex align-items-center gap-2 mb-5' style={{background:"#eff0f6"}}>
                    <img src={search} width={15} alt="" />
                    <input type="text" name="NotifSearch" id="NotifSearch" 
                        style={{background:"#eff0f6"}} 
                        className='border-0 w-100 p-2'
                        placeholder='Search here...'
                    />
                </div>
                <div className='fw-bolder mb-5'>Recent Notification</div>
                <div className='d-flex flex-column'>
                    <div className='p-3 d-flex align-items-center justify-content-between'>
                        <div className='d-flex gap-4 align-items-start' style={{width:"60%"}}>
                            <img src={notificationmessage} alt="" />
                            <div className=''>
                                <strong className=''>Glenn Gereer</strong>
                                <small className='mt-2 mb-4 fw-bold d-block' style={{color:"#c7c9d9"}}>
                                    Commented on <span style={{color:"#3d94ff"}}>Collab.</span> 12h
                                </small>
                                <div className='fw-bold' style={{color:"#b0b3c9"}}>
                                    "Love this so much! What tools do you use to create your 3d illustration?"
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <img src={message} width={100} className='notif-image p-2 rounded-3' style={{background:"#cfc8ff",boxShadow:"rgba(231, 227, 255) 0px 10px 0px 0px"}} alt="" />
                        </div>
                    </div>
                    <hr className='w-100'/>
                    <div className='p-3 d-flex align-items-center justify-content-between'>
                        <div className='d-flex gap-4 align-items-start' style={{width:"60%"}}>
                            <img src={notificationmessage} alt="" />
                            <div className=''>
                                <strong className=''>Glenn Gereer</strong>
                                <small className='mt-2 mb-4 fw-bold d-block' style={{color:"#c7c9d9"}}>
                                    Commented on <span style={{color:"#3d94ff"}}>Collab.</span> 12h
                                </small>
                                <div className='fw-bold' style={{color:"#b0b3c9"}}>
                                    "Love this so much! What tools do you use to create your 3d illustration?"
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <img src={diagram} width={100} className='notif-image p-2 rounded-3' style={{background:"#bce1d9",boxShadow:"rgba(221, 240, 236) 0px 10px 0px 0px"}} alt="" />
                        </div>
                    </div>
                    <hr className='w-100'/>
                    <div className='p-3 d-flex align-items-center justify-content-between'>
                        <div className='d-flex gap-4 align-items-start' style={{width:"60%"}}>
                            <img src={notificationmessage} alt="" />
                            <div className=''>
                                <strong className=''>Glenn Gereer</strong>
                                <small className='mt-2 mb-4 fw-bold d-block' style={{color:"#c7c9d9"}}>
                                    Commented on <span style={{color:"#3d94ff"}}>Collab.</span> 12h
                                </small>
                                <div className='fw-bold' style={{color:"#b0b3c9"}}>
                                    "Love this so much! What tools do you use to create your 3d illustration?"
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <img src={economy} width={100} className='notif-image p-2 rounded-3' style={{background:"#c4dafb",boxShadow:"rgba(225, 236, 253) 0px 10px 0px 0px"}} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Notification