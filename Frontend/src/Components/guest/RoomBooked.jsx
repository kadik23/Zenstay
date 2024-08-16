import { useParams } from 'react-router-dom';
import image from '../../assets/room1.jpg'
import useRoomStore from '../../Hooks/useRoomStore'
import { useEffect } from 'react';
export default function RoomBooked({appointment}){
    const {room, fetchRoomById} = useRoomStore()
    const {id} = useParams();

    useEffect(() => {
        fetchRoomById(id)
    }, [id])

    if (!room) {
        return <div>No room available</div>;
    }    
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
                        <div className="">
                            <span>{appointment.check_in}</span>
                        </div>
                        <div className="">
                            <span>{appointment.check_out}</span>
                        </div>
                    </div>
                </div> 
                <div className='pt-2 '>
                    <span style={{fontWeight:'500'}}>{room.bed_type}</span>
                </div>       
            </div>   
            </div>
        </div>
    )
}