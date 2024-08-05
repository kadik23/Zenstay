import { useEffect, useState } from 'react';
import image from '../../assets/room1.jpg';
import useBookRoomStore from '../../Hooks/useBookRoomStore';
import "react-datepicker/dist/react-datepicker.css";
import useUserStore from '../../Hooks/useUserStore';

export default function RoomBookingInfo({ room }) {
    const { handleSubmit, firstStep, setTotalPrice, totalPrice, cityTax, serviceFee, bookedAppointments, secondStep } = useBookRoomStore();
    const [error, setError] = useState('');
    const {user} = useUserStore()
    const calculateNights = (check_in, check_out) => {
        const checkInDate = new Date(check_in);
        const checkOutDate = new Date(check_out);
        const timeDiff = Math.abs(checkOutDate - checkInDate);
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    };

    const numberOfNights = firstStep.check_in && firstStep.check_out ? calculateNights(firstStep.check_in, firstStep.check_out) : 0;
    useEffect(()=>{
        setTotalPrice((parseInt(room?.price) * numberOfNights) + cityTax + serviceFee);
        
    },[numberOfNights])

    const checkDate = () => {
        if (!firstStep.check_in || !firstStep.check_out) {
            setError('Please select both check-in and check-out dates.');
            return;
        }

        if(!secondStep.card_name && !secondStep.card_number && !secondStep.exp_date && !secondStep.cvc){
            setError('Fill payment details please.');
            return;
        }

        const checkInDate = new Date(firstStep.check_in);
        const checkOutDate = new Date(firstStep.check_out);
        console.log(bookedAppointments)
        if(bookedAppointments.data){
            // Convert object to array of values
            const appointments = Object.values(bookedAppointments);

            // Check for overlapping dates
            for (const booked of appointments) {
                const bookedCheckIn = new Date(booked.check_in);
                const bookedCheckOut = new Date(booked.check_out);
                if (
                    (checkInDate >= bookedCheckIn && checkInDate < bookedCheckOut) ||
                    (checkOutDate > bookedCheckIn && checkOutDate <= bookedCheckOut) ||
                    (checkInDate <= bookedCheckIn && checkOutDate >= bookedCheckOut)
                ) {
                    setError('Selected dates are already booked.');
                    return;
                }
            }
        }
        setError('');
        handleSubmit(user._id,room._id);
    };

    return (
        <div>
            <div className='p-4 rounded-3 shadow'>
                <img src={image} height={250} style={{ objectFit: 'cover' }} className='w-100 rounded-4' alt="" />
                <div className='mt-4'>
                    <h4 className="mb-5 fw-bold">Room </h4>
                    <div>
                        <div className='d-flex gap-3 border-bottom pb-3'>
                            <div className='d-flex flex-column'>
                                <span className='pe-0' style={{ fontWeight: '500' }}>
                                    Check-in
                                </span>
                                <span className='pe-0' style={{ fontWeight: '500' }}>
                                    Check-out
                                </span>
                            </div>
                            <div className='d-flex flex-column'>
                                <span className=''>
                                    {firstStep.check_in}
                                </span>
                                <span className=''>
                                    {firstStep.check_out}
                                </span>
                            </div>
                        </div>
                        <div className='pb-3 border-bottom'>
                            <span className='pe-0' style={{ fontWeight: '500' }}>
                                Standard double room
                            </span>
                            <div className='mb-3'>
                                <div className='row'>
                                    <span className='col-4'>Price per night</span>
                                    <span className='col-4'>${room?.price}</span>
                                </div>
                                <div className='row'>
                                    <span className='col-4'>{numberOfNights} nights</span>
                                    <span className='col-4'>${room?.price * numberOfNights}</span>
                                </div>
                            </div>
                            <div>
                                <div className='row'>
                                    <span className='col-4'>City tax</span>
                                    <span className='col-4'>${cityTax}</span>
                                </div>
                                <div className='row'>
                                    <span className='col-4'>Service fee</span>
                                    <span className='col-4'>${serviceFee}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='row'>
                                <strong className='col-4'>Total</strong>
                                <span className='col-4'>${totalPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            <button onClick={checkDate} className="btn btn-primary rounded-pill w-100 mt-3">Book now</button>
        </div>
    );
}
