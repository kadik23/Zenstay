import image from '../assets/room1.jpg'
export default function RoomBooked(){
  return(
    <div className='shadow rounded-4 p-3'>
      <img src={image} height={250} style={{objectFit:'cover'}} className='w-100 rounded-4' alt="" />
      <div className='mt-2'>
          <h4 className="mb-2 fw-bold">Room</h4>
          <div>
              <div className='d-flex gap-3 pb-3 border-bottom'>
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
              <div className='pt-2 '>
                  <span style={{fontWeight:'500'}}>Standard double room</span>
              </div>       
          </div>   
        </div>
    </div>
  )
}