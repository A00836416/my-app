import React, { useState, useRef, useEffect } from 'react';
import styles from './HomeTareaDiaria.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressChart from './ProgressChart';

const HomeTareaDiaria = ({ tareas }) => {
    const [activeCard, setActiveCard] = useState(null);
    const [selectedFase, setSelectedFase] = useState(1);
    const activeCardRef = useRef(null);
    const fasesDesbloqueadas = [0, 1, 2, 3, 4];

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

    const renderTaskButton = (tarea) => {
        const status = getTaskStatus(tarea);
        switch (status) {
            case 'Not Started':
                return <button className={styles.startButton}>Empezar</button>;
            case 'In Progress':
                return <button className={styles.completeButton}>Terminar</button>;
            case 'Completed':
            case 'Verified':
                return <span className={styles.completedText}>Tarea Completada</span>;
            case 'Rejected':
                return <button className={styles.retryButton}>Reintentar</button>;
            default:
                return null;
        }
    };

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