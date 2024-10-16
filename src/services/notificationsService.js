import axios from 'axios';

const API_URL = 'http://localhost:3002/api';

axios.defaults.withCredentials = true;

export const notificationsService = {
    getnotifications: async () => {
        try {
            const response = await axios.get(`${API_URL}/notificaciones`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching notificaciones:', error);
            throw error;
        }
    }
};