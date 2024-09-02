import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';

export const login = async (userName, contrasena) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { userName, contrasena });
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};