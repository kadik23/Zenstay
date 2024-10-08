import axios from 'axios';
import { create } from 'zustand';
import useAlertMessageStore from './useAlertMessage'; // Ensure this is a Zustand store too

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
    setBookedAppointments: (bookedAppointments) => set({ bookedAppointments }),
    cityTax: 40,
    serviceFee: 20,
    totalPrice: 60,
    setTotalPrice: (totalPrice) => set({ totalPrice }),
    
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
        const { setAlert, clearAlert } = useAlertMessageStore.getState();

        try {
            const response = await axios.post('/booking_room', {
                user_id,
                room_id,
                check_in: get().firstStep.check_in,
                check_out: get().firstStep.check_out,
                secondStep: get().secondStep,
                totalPrice: get().totalPrice,
            });

            if (response.data) {
                console.log("Booking successful");
                setAlert({ message: 'Booking room completed successfully!', type: 'success' });
                setTimeout(() => {
                    clearAlert()
                    window.location.href = `/BookingConfirmed/${room_id}`
                }, 3000)
            }
        } catch (e) {
            console.log(e);
            setAlert({ message: 'Booking room failed. Please try again.', type: 'danger' });
        }
    },

    cancelReservation: async (id) => {
        const { setAlert, clearAlert } = useAlertMessageStore.getState();

        try {
            const response = await axios.delete(`/cancel_reservation/${id}`);

            if (response.data) {
                console.log("Reservation canceled successful");
                setAlert({ message: 'Booking room completed successfully!', type: 'success' });
                setTimeout(() => {
                    clearAlert()
                    window.location.href = `/`
                }, 3000)
            }
        } catch (e) {
            console.log(e);
            setAlert({ message: 'Reservation canceled failed. Please try again.', type: 'danger' });
        }
    },

    getBookedAppointments: async (room_id) => {
        try {
            console.log("room:" +room_id)
            const response = await axios.get(`/getBookedRoomById/${room_id}`, {
                withCredentials: true,
            });
            if (response.data) {
                set({ bookedAppointments: response.data });
            }
        } catch (e) {
            console.log(e);
        }
    },
}));

export default useBookRoomStore;
