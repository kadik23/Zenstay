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
    
    markAsRead: async (id) => {
        try {
            await axios.put(`/notifications/${id}/read`);
            set((state) => ({
                notifications: state.notifications.map(notif => 
                    notif._id === id ? { ...notif, isRead: true } : notif
                )
            }));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    }
}));

export default useNotificationStore;
