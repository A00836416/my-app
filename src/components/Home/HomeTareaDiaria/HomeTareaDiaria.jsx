import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './HomeTareaDiaria.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressChart from './ProgressChart';
import { taskService } from '../../../services/taskService';
import { employeeService } from '../../../services/employeeService';

const HomeTareaDiaria = () => {
    const [tareas, setTareas] = useState([]);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [activeCard, setActiveCard] = useState(null);
    const [selectedFase, setSelectedFase] = useState(1);
    const activeCardRef = useRef(null);
    const fasesDesbloqueadas = [0, 1, 2, 3, 4];

    const fetchTareas = useCallback(async (isInitial = false) => {
        try {
            if (isInitial) {
                setIsInitialLoading(true);
            } else {
                setIsUpdating(true);
            }
            const tasksData = await employeeService.getTaskByEmployee();
            setTareas(tasksData);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setIsInitialLoading(false);
            setIsUpdating(false);
        }
    }, []);

    const getTaskDuration = (tarea) => {
        const duracion = tarea.duracionEstimada;
    
        if (duracion === 1) {
            return `${duracion} hora estimada`;
        } else {
            return `${duracion} horas estimadas`;
        }
    };

    useEffect(() => {
        fetchTareas(true);
    }, [fetchTareas]);

    const tareasFiltradas = tareas.filter((tarea) => tarea.nivel.numero === selectedFase);

    const handleCardClick = (cardIndex) => {
        setActiveCard(activeCard === cardIndex ? null : cardIndex);
    };

    const handleOutsideClick = (event) => {
        if (activeCardRef.current && !activeCardRef.current.contains(event.target)) {
            setActiveCard(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const getTaskStatus = (tarea) => {
        if (!tarea.progresoEmpleado) return 'Not Started';
        return tarea.progresoEmpleado.estado;
    };

    const getTaskStyle = (tarea) => {
        const status = getTaskStyle(tarea);
        switch (status) {
            case 'Not Started':
                return styles.taskNotStarted;
            case 'In Progress':
                return styles.taskInProgress;
            case 'Completed':
                return styles.taskCompleted;
            case 'Verified':
                return styles.taskVerified;
            case 'Rejected':
                return styles.taskRejected;
            default:
                return '';
        }
    };

    const handleStartTask = async (tarea) => {
        try {
            const response = await taskService.startTask(tarea.tareaID);
            if (response.status === 200) {
                await fetchTareas();
            } else {
                console.error('Failed to start task');
            }
        } catch (error) {
            console.error('Error starting task:', error);
        }
    };

    const handleCompleteTask = async (tarea) => {
        try {
            const response = await taskService.completeTask(tarea.tareaID);
            if (response.status === 200) {
                await fetchTareas();
                setActiveCard(null);
            } else {
                console.error('Failed to complete task');
            }
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    const handleRetryTask = async (tarea) => {
        try {
            const response = await taskService.retryTask(tarea.tareaID);
            if (response.status === 200) {
                await fetchTareas();
                setActiveCard(null);
            } else {
                console.error('Failed to retry task');
            }
        } catch (error) {
            console.error('Error retrying task:', error);
        }
    };

    const renderTaskButton = (tarea) => {
        const status = getTaskStatus(tarea);
        switch (status) {
            case 'Not Started':
                return <button onClick={() => handleStartTask(tarea)} className={styles.startButton}>Empezar</button>;
            case 'In Progress':
                return <button onClick={() => handleCompleteTask(tarea)} className={styles.completeButton}>Terminar</button>;
            case 'Completed':
                return <span className={styles.completedText}></span>;
            case 'Verified':
                return <span className={styles.completedText}></span>;
            case 'Rejected':
                return <button onClick={() => handleRetryTask(tarea)} className={styles.retryButton}>Reintentar</button>;
            default:
                return null;
        }
    };

    const stylesMap = {
        Culture: styles.culture,
        Connection: styles.connection,
        Compliance: styles.compliance,
        Clarification: styles.clarification,
        
        NotStarted: styles.taskNotStarted,
        InProgress: styles.taskInProgress,
        Completed: styles.taskCompleted,
        Verified: styles.taskVerified,
        Rejected: styles.taskRejected,
    };

    const getDimensionName = (dimension) => {
        const styleClass = stylesMap[dimension];
        if (styleClass) {
            return <span className={styleClass}>{dimension}</span>;
        }
        return null;
    };

    const truncateText = (text, limit = 50) => {
        if (text.length > limit) {
            return text.substring(0, limit) + '...';
        }
        return text;
    };

    if (isInitialLoading) return <div className={styles.loading}>Cargando tareas...</div>;

    return (
        <div className={styles.tasksWrapper}>
            <div className={styles.dailyTasksHeader}>
                <h2 className={styles.dailyTasksTitle}>Tareas</h2>
            </div>

            <div className={styles.smallSections}>
                {fasesDesbloqueadas.map((fase) => (
                    <button
                        key={fase}
                        className={`${styles.faseButton} ${selectedFase === fase ? styles.activeTab : ''}`}
                        onClick={() => setSelectedFase(fase)}
                    >
                        Fase {fase}
                    </button>
                ))}
            </div>

            <div className={styles.cardsContainer}>
                <ProgressChart tareas={tareas} />
                {isUpdating && <div className={styles.updatingOverlay}>Actualizando...</div>}
                {tareasFiltradas.length === 0 ? (
                    <p className={styles.noTasksMessage}>No hay tareas para esta fase</p>
                ) : (
                    tareasFiltradas.map((tarea, index) => (
                        <motion.div
                            key={tarea.tareaID}
                            className={styles.card}
                            onClick={() => handleCardClick(index)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className={styles.taskHeader}>
                                <h3 className={styles.taskName}>{tarea.nombreTarea}</h3> 
                                <span className={styles.dimensionName}>{getDimensionName(tarea.dimension.nombre)}</span>
                            </div>
                            {/* Mostrar la descripción truncada si la tarjeta no está activa */}
                            <div className={styles.taskDescription}>
                                {activeCard === index
                                    ? tarea.descripcionTarea.split(',').map((line, i) => <p key={i}>{line.trim()}</p>)
                                    : truncateText(tarea.descripcionTarea, 50)}
                            </div>
                            <p className={styles.taskStatus}>
                                {getTaskStatus(tarea)}
                                {/* Mostrar el botón solo si la tarjeta está expandida */}
                                {activeCard === index && (
                                    <div className={styles.containerButton}>
                                        
                                        {renderTaskButton(tarea)}
                                    </div>
                                )}
                            </p>
                        </motion.div>
                    ))
                )}
            </div>
            <AnimatePresence>
                {activeCard !== null && (
                    <motion.div
                        className={styles.activeCardOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleOutsideClick}
                    >
                        <motion.div
                        className={styles.activeCard}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                        ref={activeCardRef}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.taskHeader}>
                            <h3 className={styles.taskName}>{tareasFiltradas[activeCard].nombreTarea}</h3>
                            <span className={styles.dimensionName}>{getDimensionName(tareasFiltradas[activeCard].dimension.nombre)}</span>
                        </div>
                        {/* Mostrar la descripción completa en líneas separadas */}
                        <div className={styles.taskDescription}>
                            {tareasFiltradas[activeCard].descripcionTarea.split(',').map((line, index) => (
                                <p key={index}>{line.trim()}</p>
                            ))}
                        </div>
                        <p className={styles.taskDuration}>{getTaskDuration(tareasFiltradas[activeCard])}</p>
                        <p className={styles.fechaLimite}>Fecha Límite: {tareasFiltradas[activeCard].fechaLimite}</p>
                        <p className={styles.containerButton}>
                             {getTaskStatus(tareasFiltradas[activeCard])}
                                {renderTaskButton(tareasFiltradas[activeCard])}

                        </p>
                    </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HomeTareaDiaria;
