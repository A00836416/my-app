// src/services/employeeService.js
import axios from 'axios';

const API_URL = 'http://localhost:3002/api';

// Configurar axios para incluir credenciales (cookies) en cada solicitud
axios.defaults.withCredentials = true;

export const employeeService = {
    getEmployees: async () => {
        try {
            const response = await axios.get(`${API_URL}/empleados`);
            return response.data;
        } catch (error) {
            console.error('Error fetching employees:', error);
            throw error;
        }
    },

    addEmployee: async (employeeData) => {
        try {
            const response = await axios.post(`${API_URL}/empleados/crear-usuario-empleado`, employeeData);
            return response.data;
        } catch (error) {
            console.error('Error adding employee:', error);
            throw error;
        }
    },

    // Añade más métodos según sea necesario
};