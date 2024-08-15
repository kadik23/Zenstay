import { create } from 'zustand';

const useAlertMessageStore = create((set, get) => ({
    alert: {
        message: '',
        type: '',
        visible: false,
    },
    setAlert: ({ message, type }) => set({
        alert: {
            message,
            type,
            visible: true,
        }
    }),
    clearAlert: () => set({
        alert: {
            message: '',
            type: '',
            visible: false,
        }
    })
}));

export default useAlertMessageStore;
