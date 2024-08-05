import axios from 'axios';
import { create } from 'zustand';

const useBookRoomStore = create((set, get) => ({
    firstStep: {
        check_in: '',
        check_out: ''
    },
    secondStep: {
        card_name: '',
        card_number: '',
        exp_date: '',
        cvc: ''
    },
    bookedAppointments: [],
    setBookedAppointments:(bookedAppointments) => set({bookedAppointments}),
    cityTax:40,
    serviceFee: 20,
    totalPrice: 60,
    setTotalPrice:(totalPrice) => set({totalPrice}),
    handleFirstStepChange: (e) => {
        const { name, value } = e.target;
        set((state) => ({
            firstStep: {
                ...state.firstStep,
                [name]: value
            }
        }));
    },
    handleSecondStepChange: (e) => {
        const { name, value } = e.target;
        set((state) => ({
            secondStep: {
                ...state.secondStep,
                [name]: value
            }
        }));
    },
    setFirstStep: (newValues) => {
        set((state) => ({
            firstStep: {
                ...state.firstStep,
                ...newValues
            }
        }));
    },
    handleSubmit: async (user_id, room_id) => {
        try{
            const response = await axios.post('/booking_room',{
                user_id,
                room_id,
                check_in: get().firstStep.check_in,
                check_out: get().firstStep.check_out,
                secondStep: get().secondStep
            })
            if(response.data){
                console.log("Booking successful")
            }
        }catch(e){
            console.log(e)
        }
    },
    getBookedAppointments: async (room_id) => {
        try{
            const response = await axios.get(`/getBookedRoomById/${room_id}`, {
                withCredentials: true,
            })
            if(response.data){
                set({bookedAppointments:response.data})
            }
        }catch(e){
            console.log(e)
        }
    },
}));

export default useBookRoomStore;
