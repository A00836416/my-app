// src/services/taskService.js
import axios from 'axios';

const API_URL = 'http://localhost:3002/api/tareas';

// Configurar axios para incluir credenciales (cookies) en cada solicitud
axios.defaults.withCredentials = true;

export const taskService = {

    startTask: async (taskId) => {
        try {
            const response = await axios.post(`${API_URL}/iniciar`, {
                "tareaID": taskId
            });
            return response;
        } catch (error) {
            console.error('Error starting task:', error);
            throw error;
        }
    },

    completeTask: async (taskId) => {
        try {
            const response = await axios.put(`${API_URL}/completar` , {
                "tareaID": taskId
            });
            return response;
        } catch (error) {
            console.error('Error completing task:', error);
            throw error;
        }
    }

};