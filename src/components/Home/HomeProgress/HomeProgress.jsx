import React, { useState, useEffect } from 'react';
import styles from './HomeProgress.module.css';

const HomeProgress = () => {
    const [completedTasks, setCompletedTasks] = useState(0);
    const [totalTasks, setTotalTasks] = useState(0);

    useEffect(() => {
        // Simular una llamada a la base de datos para obtener las tareas
        const fetchData = async () => {
            // Aquí deberías hacer la llamada real para obtener las tareas completadas y totales
            const data = { completed: 3, total: 5 }; // Simulando la respuesta
            setCompletedTasks(data.completed);
            setTotalTasks(data.total);
        };

        fetchData();
    }, []);

    const renderStages = () => {
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
                <h1 className={styles.progressTitle}>Progreso </h1>
            </div>
            <div className={styles.cardsContainer }>
                <div className={styles.card }>
                    <div className={styles.stagesContainer}>
                        {renderStages()}
                    </div>
                    <div className={styles.taskInfo}>
                        <p>Tareas completadas: {completedTasks} de {totalTasks}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeProgress;