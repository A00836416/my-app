import React from 'react';
import { motion } from 'framer-motion';
import styles from './TaskCard.module.css';
import modalStyles from './TaskModal.module.css';
import { useLocation } from 'react-router-dom';

const TaskCard = ({ tarea, index, activeCard, handleCardClick, handleStartTask, handleCompleteTask, handleRetryTask }) => {
    const location = useLocation(); // Obtén la ubicación actual

    // Verifica si está en ProfilePage y establece inProfile
    const inProfile = location.pathname === '/profile'; // Cambia '/profile' según tu ruta
    const inHome = location.pathname === '/home'; // Cambia '/home' según tu ruta

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
        if (minutes === 0) return '0 minutos';
        if (minutes < 60 && minutes < 1) return `${minutes} minutos`;
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours} hora${hours > 1 ? 's' : ''} ${remainingMinutes} minuto${remainingMinutes !== 1 ? 's' : ''}`;
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
            {inProfile && (
    <span className={modalStyles.rewardImage}>
        {tarea && tarea.objetos && tarea.objetos.length > 0 ? (
            (() => {
                const images = [];
                const objetos = tarea.objetos;

                for (let i = 0; i < objetos.length; i++) {
                    images.push(
                        <img 
                            key={objetos[i].objetoID}
                            src={`/${objetos[i].path.replace('my-app/public/', '')}`} 
                            alt={objetos[i].nombre} 
                        />
                    );
                }

                return images;
            })()
        ) : (
            <p>No hay imágenes disponibles</p>
        )}
    </span>
)}
            {tarea.progresoEmpleado && tarea.progresoEmpleado.tiempoCompletado && (
                <div className={styles.completionTime}>
                    Tiempo completado: {formatDuration(tarea.progresoEmpleado.tiempoCompletado)}
                </div>
            )}
        </motion.div>
    );
};

export default TaskCard;