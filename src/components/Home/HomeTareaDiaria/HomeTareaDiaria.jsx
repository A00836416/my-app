import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './HomeTareaDiaria.module.css';
import modalStyles from './TaskModal.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressChart from './ProgressChart';
import { taskService } from '../../../services/taskService';
import { employeeService } from '../../../services/employeeService';
import TaskCard from './TaskCard';

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

    const handleStartTask = async (tarea) => {
        try {
            setActiveCard(null); // Close the modal immediately
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
            setActiveCard(null); // Close the modal immediately
            const response = await taskService.completeTask(tarea.tareaID);
            if (response.status === 200) {
                await fetchTareas();
            } else {
                console.error('Failed to complete task');
            }
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    const handleRetryTask = async (tarea) => {
        try {
            setActiveCard(null); // Close the modal immediately
            const response = await taskService.retryTask(tarea.tareaID);
            if (response.status === 200) {
                await fetchTareas();
            } else {
                console.error('Failed to retry task');
            }
        } catch (error) {
            console.error('Error retrying task:', error);
        }
    };

    // Reintroduce the renderTaskButton function
    const renderTaskButton = (tarea) => {
        const status = getTaskStatus(tarea);
        switch (status) {
            case 'Not Started':
                return <button onClick={() => handleStartTask(tarea)} className={styles.startButton}>Empezar</button>;
            case 'In Progress':
                return <button onClick={() => handleCompleteTask(tarea)} className={styles.completeButton}>Terminar</button>;
            case 'Completed':
                return <span className={styles.completedText}>Esperando por verificación </span>;
            case 'Verified':
                return <span className={styles.completedText}>Verificada</span>;
            case 'Rejected':
                return <button onClick={() => handleRetryTask(tarea)} className={styles.retryButton}>Reintentar</button>;
            default:
                return null;
        }
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


    // Reintroduce the getDimensionName function
    const getDimensionName = (dimension) => {
        return <span className={styles.culture}>{dimension}</span>;
    };

    // Reintroduce the getTaskStatus function
    const getTaskStatus = (tarea) => {
        if (!tarea.progresoEmpleado) return 'Not Started';
        return tarea.progresoEmpleado.estado;
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDuration = (minutes) => {
        if (minutes === 0) return '0 minutos';
        if (minutes < 60 && minutes < 1) return `${minutes} minutos`;
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours} hora${hours > 1 ? 's' : ''} ${remainingMinutes} minuto${remainingMinutes !== 1 ? 's' : ''}`;
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
                <ProgressChart tareas={tareasFiltradas} />
                {isUpdating && <div className={styles.updatingOverlay}>Actualizando...</div>}
                {tareasFiltradas.length === 0 ? (
                    <p className={styles.noTasksMessage}>No hay tareas para esta fase</p>
                ) : (
                    tareasFiltradas.map((tarea, index) => (
                        <TaskCard
                            key={tarea.tareaID}
                            tarea={tarea}
                            index={index}
                            activeCard={activeCard}
                            handleCardClick={handleCardClick}
                            handleStartTask={handleStartTask}
                            handleCompleteTask={handleCompleteTask}
                            handleRetryTask={handleRetryTask}
                            renderTaskButton={renderTaskButton}
                            getDimensionName={getDimensionName}
                            getTaskStatus={getTaskStatus}
                        />
                    ))
                )}
            </div>
            <AnimatePresence>
                {activeCard !== null && (
                    <motion.div
                        className={modalStyles.activeCardOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleOutsideClick}
                    >
                        <motion.div
                            className={modalStyles.activeCard}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.3 }}
                            ref={activeCardRef}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={modalStyles.taskHeader}>
                                <h3 className={modalStyles.taskName}>{tareasFiltradas[activeCard].nombreTarea}</h3>
                                <span className={modalStyles.dimensionName}>
                                    {getDimensionName(tareasFiltradas[activeCard].dimension.nombre)}
                                </span>
                            </div>
                            <div className={modalStyles.taskDescription}>
                                {tareasFiltradas[activeCard].descripcionTarea}
                            </div>
                            <div className={modalStyles.taskInfo}>
                                <span className={modalStyles.experiencePoints}>XP: {tareasFiltradas[activeCard].experienciaBase}</span>
                                <span className={modalStyles.estimatedDuration}>
                                    Duración: {formatDuration(tareasFiltradas[activeCard].duracionEstimada * 60)}
                                </span>
                                <span className={modalStyles.mandatoryTask}>
                                    {tareasFiltradas[activeCard].esObligatoria ? 'Obligatoria' : 'Opcional'}
                                </span>
                                <span className={modalStyles.taskLevel}>
                                    Nivel: {tareasFiltradas[activeCard].nivel.nombre} (Fase {tareasFiltradas[activeCard].nivel.numero})
                                </span>
                            </div>
                                <span className={modalStyles.rewardImage}>
                                    {tareasFiltradas[activeCard] && tareasFiltradas[activeCard].objetos && tareasFiltradas[activeCard].objetos.length > 0 ? (
                                        (() => {
                                        const images = [];
                                        const objetos = tareasFiltradas[activeCard].objetos;

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
                            {tareasFiltradas[activeCard].fechaLimite && (
                                <div className={modalStyles.fechaLimite}>
                                    Fecha Límite: {formatDate(tareasFiltradas[activeCard].fechaLimite)}
                                </div>
                            )}
                            <div className={modalStyles.taskStatus}>
                                <span className={`${modalStyles.statusBadge} ${getStatusBadgeClass(getTaskStatus(tareasFiltradas[activeCard]))}`}>
                                    {getTaskStatus(tareasFiltradas[activeCard])}
                                </span>
                                <div className={modalStyles.containerButton}>
                                    {renderTaskButton(tareasFiltradas[activeCard])}
                                </div>
                            </div>
                            {tareasFiltradas[activeCard].progresoEmpleado && (
                                <div className={modalStyles.taskProgress}>
                                    <span className={modalStyles.startDate}>
                                        Iniciada: {formatDate(tareasFiltradas[activeCard].progresoEmpleado.fechaInicio)}
                                    </span>
                                    {tareasFiltradas[activeCard].progresoEmpleado.fechaFinalizacion && (
                                        <span className={modalStyles.endDate}>
                                            Finalizada: {formatDate(tareasFiltradas[activeCard].progresoEmpleado.fechaFinalizacion)}
                                        </span>
                                    )}
                                    {tareasFiltradas[activeCard].progresoEmpleado.tiempoCompletado && (
                                        <span className={modalStyles.completionTime}>
                                            Tiempo completado: {formatDuration(tareasFiltradas[activeCard].progresoEmpleado.tiempoCompletado)}
                                        </span>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HomeTareaDiaria;