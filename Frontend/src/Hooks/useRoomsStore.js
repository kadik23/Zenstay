import { create } from 'zustand';
import axios from 'axios';

const useRoomsStore = create((set, get) => ({
    rooms: null,
    setRooms: (rooms) => set({ rooms }),
    clearRooms: () => set({ rooms: null }),
    guests: '',
    bedType: '',
    checkIn: '',
    checkOut: '',
    priceRange: [],
    ratingRange: [],
    filteredRooms: null,
    sortBy: '',
    
    setSortBy: (sortBy) => {
        set({ sortBy });
        get().applyFilters();
    },

    fetchRooms: async () => {
        try {
            const { checkIn, checkOut } = get();
            let url = '/getAllRooms';
            if (checkIn && checkOut) {
                url += `?check_in=${checkIn}&check_out=${checkOut}`;
            }
            const response = await axios.get(url);
            if (response.data) {
                set({ rooms: response.data });
                get().applyFilters();
            } else {
                console.log('Something went wrong');
            }
        } catch (e) {
            console.log(e);
        }
    },
    
    setGuests: (guests) => {
        set({ guests });
    },

    setBedType: (bedType) => {
        set({ bedType });
    },

    setCheckIn: (checkIn) => {
        set({ checkIn });
    },

    setCheckOut: (checkOut) => {
        set({ checkOut });
    },

    setPriceRange: (priceRange) => {
        set({ priceRange });
        get().applyFilters();
    },

    setRatingRange: (ratingRange) => {
        set({ ratingRange });
        get().applyFilters();
    },

    applyFilters: () => {
        const { rooms, guests, bedType, priceRange, ratingRange } = get();

        const filteredRooms = rooms?.filter(room => {
            let matchesPrice = true;
            if (priceRange.length) {
                if (priceRange === "<50") {
                    matchesPrice = room.price <= 50;
                } else if (priceRange === "50-100") {
                    matchesPrice = room.price >= 50 && room.price <= 100;
                } else if (priceRange === "100-150") {
                    matchesPrice = room.price >= 100 && room.price <= 150;
                } else if (priceRange === ">150") {
                    matchesPrice = room.price >= 150;
                }
            }

            let matchesGuestsRating = true;
            if (ratingRange.length) {
                if (ratingRange === "<5.0") {
                    matchesGuestsRating = room.rating <= 5.0;
                } else if (ratingRange === "5.0-6.0") {
                    matchesGuestsRating = room.rating >= 5.0 && room.rating <= 6.0;
                } else if (ratingRange === "6.0-7.0") {
                    matchesGuestsRating = room.rating >= 6.0 && room.rating <= 7.0;
                } else if (ratingRange === ">7.0") {
                    matchesGuestsRating = room.rating >= 7.0;
                }
            }

            let matchesGuests = guests ? room.guests_number == guests : true;
            let matchesBedType = bedType ? room.bed_type === bedType : true;

            return matchesGuestsRating && matchesPrice && matchesGuests && matchesBedType;
        });

        if (get().sortBy === 'price') {
            filteredRooms.sort((a, b) => a.price - b.price);
        } else if (get().sortBy === 'rating') {
            filteredRooms.sort((a, b) => b.rating - a.rating);
        }

        set({ filteredRooms });
    }
}));

export default useRoomsStore;
