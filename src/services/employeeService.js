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

    getTaskByEmployee: async () => {
        try {
            const response = await axios.get(`${API_URL}/tareas/empleado`);
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

    getEmployeeDetails: async (employeeId) => {
        try {
            const response = await axios.get(`${API_URL}/empleados/${employeeId}/detalles`);
            return response.data;
        } catch (error) {
            console.error('Error fetching employee details:', error);
            throw error;
        }

    },

    getEmployeeTasks: async (employeeId) => {
        try {
            const response = await axios.get(`${API_URL}/empleados/${employeeId}/tareas-en-progreso`);
            return response.data;
        } catch (error) {
            console.error('Error fetching employee tasks:', error);
            throw error;
        }
    },

    verifyTask: async (progresoID) => {
        try {
            const response = await axios.post(`${API_URL}/tareas/verificar`, {
                progresoID: progresoID
            });
            return response.data;
        } catch (error) {
            console.error('Error verifying task:', error);
            throw error;
        }
    },
    // Añade más métodos según sea necesario
};