import { create } from 'zustand';
import axios from 'axios';

const useNotificationStore = create((set) => ({
    notifications: [],
    
    fetchNotifications: async () => {
        try {
            const response = await axios.get('/notifications');
            set({ notifications: response.data });
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    },
    
    addNotification: (notification) => {
        set((state) => ({
            notifications: [notification, ...state.notifications]
        }));
    },
}));

export default useNotificationStore;
