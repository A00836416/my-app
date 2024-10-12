import React from 'react';
import styles from './HomeProgress.module.css';

const HomeProgress = ({ totalTasks, completedTasks }) => {
    const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    const renderStages = () => {
        if (totalTasks === 0) {
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
                    <div
                        className={`${styles.circle} ${i <= completedTasks ? styles.completed : ''}`}
                    ></div>
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
                <h1 className={styles.progressTitle}>Progreso General</h1>
            </div>
            <div className={styles.cardsContainer}>
                <div className={styles.card}>
                    <div className={styles.stagesContainer}>
                        {renderStages()}
                    </div>
                    {totalTasks > 0 && (
                        <div className={styles.taskInfo}>
                            <p>Tareas completadas: {completedTasks} de {totalTasks}</p>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progressFill}
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                            <p>{percentage.toFixed(1)}% completado</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeProgress;