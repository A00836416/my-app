// src/services/departmentsService.js
import axios from 'axios';

const API_URL = 'http://localhost:3002/api';

// Configurar axios para incluir credenciales (cookies) en cada solicitud
axios.defaults.withCredentials = true;

export const departmentService = {
    getDepartments: async () => {
        try {
            const response = await axios.get(`${API_URL}/departamentos`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching departments:', error);
            throw error;
        }
    },

    createDepartment: async (deparmentData) => {
        try {
            const response = await axios.post(`${API_URL}/departamentos`, deparmentData);
            return response.data;
        } catch (error) {
            console.error('Error adding departments:', error);
            throw error;
        }
    },
};