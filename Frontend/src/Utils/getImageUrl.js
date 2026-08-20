import axios from "axios";

// Default room images to fallback on
import defaultRoom1 from "../assets/room1.jpg";
import defaultRoom2 from "../assets/room2.jpg";

export const getImageUrl = (imageName, fallbackIndex = 1) => {
    if (!imageName) {
        return fallbackIndex === 2 ? defaultRoom2 : defaultRoom1;
    }
    
    // Check if it's already a full URL
    if (imageName.startsWith('http')) {
        return imageName;
    }

    const baseURL = axios.defaults.baseURL || 'http://localhost:3000/';
    const url = baseURL.endsWith('/') ? baseURL : baseURL + '/';
    return `${url}uploads/${imageName}`;
};
