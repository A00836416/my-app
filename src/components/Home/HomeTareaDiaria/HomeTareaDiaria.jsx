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
                return <span className={styles.completedText}>Tarea Completada</span>;
            case 'Verified':
                return <span className={styles.completedText}>Tarea Verificada</span>;
            case 'Rejected':
                return <button onClick={() => handleRetryTask(tarea)} className={styles.retryButton}>Reintentar</button>;
            default:
                return null;
        }
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
                            <h3>{tarea.nombreTarea}</h3>
                            <p>{tarea.descripcionTarea}</p>
                            <p className={styles.dimensionName}>{tarea.dimension.nombre}</p>
                            <p className={styles.taskStatus}>Estado: {getTaskStatus(tarea)}</p>
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
                            <h3>{tareasFiltradas[activeCard].nombreTarea}</h3>
                            <p>{tareasFiltradas[activeCard].descripcionTarea}</p>
                            <p className={styles.dimensionName}>{tareasFiltradas[activeCard].dimension.nombre}</p>
                            <p className={styles.taskStatus}>Estado: {getTaskStatus(tareasFiltradas[activeCard])}</p>
                            {renderTaskButton(tareasFiltradas[activeCard])}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HomeTareaDiaria;