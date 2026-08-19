import { create } from 'zustand';
import axios from 'axios';

const useSettingsStore = create((set) => ({
    settings: null,
    currencySymbol: '$', // Default
    fetchSettings: async () => {
        try {
            const response = await axios.get('/settings');
            if (response.data) {
                let symbol = '$';
                if (response.data.currency === 'EUR') symbol = '€';
                if (response.data.currency === 'DA') symbol = 'DA';
                
                set({ 
                    settings: response.data,
                    currencySymbol: symbol
                });
            }
        } catch (e) {
            console.error('Failed to fetch settings:', e);
        }
    }
}));

export default useSettingsStore;
