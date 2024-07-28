import { create } from 'zustand';
import axios from 'axios';

const useRoomsStore = create((set) => ({
    rooms: null,
    setRooms: (rooms) => set({ rooms }),
    clearRooms: () => set({ rooms: null }),
    fetchRooms: async () => {
        try {
        const response = await axios.get('/getAllRooms');
        if (response.data) {
            set({ rooms: response.data });
        } else {
            console.log('Something went wrong');
        }
        } catch (e) {
        console.log(e);
        }
    },
}));

export default useRoomsStore;
