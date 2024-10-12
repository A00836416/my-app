import React, { useState, useEffect } from 'react';
import styles from './HomeProgress.module.css';
import { employeeService } from '../../../services/employeeService'; // Importa el servicio de empleado

const HomeProgress = () => {
    const [completedTasks, setCompletedTasks] = useState(0);
    const [totalTasks, setTotalTasks] = useState(0);
    const [loading, setLoading] = useState(true); // Estado para manejar la carga

    // Llamada a la API para obtener el progreso de las tareas
    useEffect(() => {
        const fetchProgress = async () => {
            setLoading(true); // Inicia el estado de carga
            try {
                const response = await employeeService.getProgressByEmployee(); // Cambia esto por tu llamada real a la API
                console.log(response); // Para ver la estructura de los datos que recibes
                
                // Ajusta estos valores con base en la respuesta real
                setCompletedTasks(response.completedTasks);
                setTotalTasks(response.totalTasks);
            } catch (error) {
                console.error('Error al obtener el progreso:', error);
            } finally {
                setLoading(false); // Desactiva el estado de carga
            }
        };

        fetchProgress(); // Llama a la función para obtener el progreso
    }, []);

    const renderStages = () => {
        if (totalTasks === 0) {
            // Muestra solo el mensaje si no hay tareas
            return (
                <div className={styles.noTasksMessage}>
                    <p>No hay tareas asignadas aún</p>
                </div>
            );
        }
    
        const stages = [];
        for (let i = 1; i <= totalTasks; i++) {
            stages.push(
                <div className={styles.stageContainer} key={i}>
                    {/* Círculo de la tarea */}
                    <div
                        className={`${styles.circle} ${i <= completedTasks ? styles.completed : ''}`}
                    ></div>
    
                    {/* Línea entre los círculos, no se dibuja para el último */}
                    {i < totalTasks && (
                        <div
                            className={`${styles.line} ${i < completedTasks ? styles.completedLine : ''}`}
                        ></div>
                    )}
                </div>
            );
        }
        return stages;
    };
    

    return (
        <div className={styles.progressContainer}>
            <div className={styles.progressHeader}>
                <h1 className={styles.progressTitle}>Progreso</h1>
            </div>
            <div className={styles.cardsContainer}>
                {loading ? (
                    <p>Cargando progreso...</p> // Mostrar mientras se cargan los datos
                ) : (
                    <div className={styles.card}>
                        <div className={styles.stagesContainer}>
                            {renderStages()}
                        </div>
                        {totalTasks > 0 && (
                            <div className={styles.taskInfo}>
                                <p>Tareas completadas: {completedTasks} de {totalTasks}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomeProgress;
