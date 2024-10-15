import axios from 'axios';

const API_URL = 'http://localhost:3002/auth';

axios.defaults.withCredentials = true;

export const login = async (userName, contrasena) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { userName, contrasena });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const logout = async () => {
    try {
        await axios.post(`${API_URL}/logout`);
    } catch (error) {
        console.error('Error during logout:', error);
        throw error;
    }
};

export const checkAuthStatus = async () => {
    try {
        const response = await axios.get(`${API_URL}/check-auth`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const getUserInfo = async () => {
    try {
        const response = await axios.get(`${API_URL}/user`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
        throw error;
    }
};

export const updateUserInfo = async (userData) => {
    try {
        const response = await axios.put(`${API_URL}/user`, userData);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar la información del usuario:", error);
        throw error;
    }
};


export const changePassword = async (data) => {
    try {
        const response = await axios.put(`${API_URL}/change-password`, data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar la información del usuario:", error);
        throw error;
    }
};