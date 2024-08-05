import { create } from 'zustand';
import axios from 'axios';

const useRoomStore = create((set) => ({
    room: null,
    setRoom: (room) => set({ room }),
    clearRoom: () => set({ room: null }),
    fetchRoomById: async (id) => {
        try {
            const response = await axios.get(`/getOneRoom/${id}`);
            if (response.data) {
                set({ room: response.data });
            } else {
                console.log('Something went wrong');
            }
        } catch (e) {
            console.log(e);
        }
    },
}));

export default useRoomStore;
