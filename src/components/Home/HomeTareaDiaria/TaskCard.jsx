import React from 'react';
import { motion } from 'framer-motion';
import styles from './TaskCard.module.css';

const TaskCard = ({ tarea, index, activeCard, handleCardClick, handleStartTask, handleCompleteTask, handleRetryTask }) => {
    const getTaskStatus = (tarea) => {
        if (!tarea.progresoEmpleado) return 'Not Started';
        return tarea.progresoEmpleado.estado;
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Not Started':
                return styles.notStarted;
            case 'In Progress':
                return styles.inProgress;
            case 'Completed':
            case 'Verified':
                return styles.completed;
            case 'Rejected':
                return styles.rejected;
            default:
                return '';
        }
    };

    const renderTaskButton = (tarea) => {
        const status = getTaskStatus(tarea);
        switch (status) {
            case 'Not Started':
                return;
            case 'In Progress':
                return;
            case 'Completed':
                return <span className={styles.completedText}>Esperando verificación</span>;
            case 'Verified':
                return <span className={styles.completedText}>Verificada</span>;
            case 'Rejected':
                return <button onClick={() => handleRetryTask(tarea)} className={styles.retryButton}>Reintentar</button>;
            default:
                return null;
        }
    };

    const getDimensionName = (dimension) => {
        return <span className={styles.culture}>{dimension}</span>;
    };

    const truncateText = (text, limit = 50) => {
        if (text.length > limit) {
            return text.substring(0, limit) + '...';
        }
        return text;
    };

    const formatDuration = (minutes) => {
        if (minutes < 60) return `${minutes} min`;
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    };

    const status = getTaskStatus(tarea);

    return (
        <motion.div
            className={styles.card}
            onClick={() => handleCardClick(index)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
        >
            <div className={styles.taskHeader}>
                <h3 className={styles.taskName}>{tarea.nombreTarea}</h3>
                <span className={styles.dimensionName}>{getDimensionName(tarea.dimension.nombre)}</span>
            </div>
            <div className={styles.taskDescription}>
                {activeCard === index
                    ? tarea.descripcionTarea
                    : truncateText(tarea.descripcionTarea, 50)}
            </div>
            <div className={styles.taskInfo}>
                <span className={styles.experiencePoints}>XP: {tarea.experienciaBase}</span>
                <span className={styles.estimatedDuration}>Duración: {formatDuration(tarea.duracionEstimada * 60)}</span>
            </div>
            <div className={styles.taskStatus}>
                <span className={`${styles.statusBadge} ${getStatusBadgeClass(status)}`}>
                    {status}
                </span>
                <div className={styles.containerButton}>
                    {renderTaskButton(tarea)}
                </div>
            </div>
            {tarea.progresoEmpleado && tarea.progresoEmpleado.tiempoCompletado && (
                <div className={styles.completionTime}>
                    Tiempo completado: {formatDuration(tarea.progresoEmpleado.tiempoCompletado)}
                </div>
            )}
        </motion.div>
    );
};

export default TaskCard;