import axios from 'axios';

const API_URL = 'http://localhost:3002/api';

axios.defaults.withCredentials = true;

export const leaderboardService = {
    getLeaderboard: async () => {
        try {
            const response = await axios.get(`${API_URL}/ranking-semanal`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            throw error;
        }
    }
};