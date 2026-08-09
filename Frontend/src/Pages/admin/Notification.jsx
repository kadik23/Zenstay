import React from 'react'
import search from '../../assets/icons/search.png'
import notificationmessage from '../../assets/icons/discussion.png'
import useNotificationStore from '../../Hooks/useNotificationStore'

function Notification() {
  const { notifications, markAsRead } = useNotificationStore();

  return (
    <div>
        <div className='mb-5 d-flex align-items-center justify-content-between'>
            <div className='d-flex flex-column gap-1'>
                <h3 className='fw-bold mb-0' style={{color:"#2b2b2b"}}>Notifications</h3>
                <small className='fw-medium' style={{color:"#8a8d9d"}}>With all of the styling tool options availablein today's market</small>
            </div>
        </div>
        <div className='mb-4'>
            <div className='shadow bg-white rounded-3 px-4 py-4'>
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
                    {notifications.length === 0 && <div className="p-3 text-muted">No recent notifications.</div>}
                    {notifications.map((notif, idx) => (
                        <div key={notif._id || idx} 
                             onClick={() => !notif.isRead && markAsRead(notif._id)}
                             style={{ cursor: notif.isRead ? 'default' : 'pointer', background: notif.isRead ? 'transparent' : '#f0f8ff', borderRadius: '8px' }}
                             className='mb-2'>
                            <div className='p-3 d-flex align-items-center justify-content-between'>
                                <div className='d-flex gap-4 align-items-start' style={{width:"80%"}}>
                                    <img src={notificationmessage} alt="" />
                                    <div className=''>
                                        <strong className=''>System Alert</strong>
                                        {!notif.isRead && <span className="badge bg-primary ms-2 rounded-pill">New</span>}
                                        <small className='mt-2 mb-2 fw-bold d-block' style={{color:"#c7c9d9"}}>
                                            {new Date(notif.createdAt).toLocaleString()}
                                        </small>
                                        <div className='fw-bold' style={{color:"#b0b3c9"}}>
                                            {notif.message}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {idx !== notifications.length - 1 && <hr className='w-100 my-0'/>}
                        </div>
                    ))}
                </div>
            </div>
        </div>

    </div>
  )
}

export default Notification