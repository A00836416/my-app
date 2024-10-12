import React, { useState, useRef, useEffect } from 'react';
import styles from './HomeTareaDiaria.module.css';
import { employeeService } from '../../../services/employeeService';
import { motion } from 'framer-motion'; // Importar Framer Motion

const TareaDiaria = () => {
    const [activeCard, setActiveCard] = useState(null);
    const [selectedFase, setSelectedFase] = useState(1);
    const [tareas, setTareas] = useState([]);
    const [loading, setLoading] = useState(true);
    const activeCardRef = useRef(null);
    const fasesDesbloqueadas = [1, 2]; 

    const tareasFiltradas = tareas.filter((tarea) => tarea.nivel.numero === selectedFase);

    // Estado para el progreso de las tareas
    const [tareasEnProgreso, setTareasEnProgreso] = useState({});

    const handleCardClick = (cardIndex) => {
        setActiveCard(activeCard === cardIndex ? null : cardIndex); // Toggle card visibility
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

    useEffect(() => {
        const fetchTareas = async () => {
            setLoading(true);
            try {
                const response = await employeeService.getTaskByEmployee();
                setTareas(response);
            } catch (error) {
                console.error('Error al obtener las tareas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTareas();
    }, []);

    // Función para iniciar una tarea
    const startTask = (tareaId) => {
        setTareasEnProgreso((prev) => ({
            ...prev,
            [tareaId]: 'in progress' // Cambia el estado a 'in progress'
        }));
    };

    // Función para terminar una tarea
    const completeTask = (tareaId) => {
        setTareasEnProgreso((prev) => ({
            ...prev,
            [tareaId]: 'completed' // Cambia el estado a 'completed'
        }));
    };

    return (
        <>
            <div className={styles.smallSections}>
                {Array.from({ length: 5 }, (_, i) => (
                    <button
                        key={i}
                        className={`${selectedFase === i ? styles.activeTab : ''} ${fasesDesbloqueadas.includes(i) ? '' : styles.bloqueadaTab}`}
                        onClick={() => fasesDesbloqueadas.includes(i) && setSelectedFase(i)}
                        disabled={!fasesDesbloqueadas.includes(i)}
                    >
                        Fase {i}
                    </button>
                ))}
            </div>
            <div className={`${styles.tasksWrapper} ${activeCard !== null ? 'blurBackground' : ''}`}>
                <div className={styles.dailyTasksHeader}>
                    <h2 className={styles.dailyTasksTitle}>Tareas de la fase {selectedFase}</h2>
                </div>
                {loading ? (
                    <p>Cargando tareas...</p>
                ) : (
                    <div className={styles.cardsContainer}>
                        {tareasFiltradas.length === 0 ? (
                            <p>No hay tareas para esta fase</p>
                        ) : (
                            tareasFiltradas.map((tarea, index) => (
                                <div
                                    key={tarea.id}
                                    className={`${styles.card} ${activeCard === index ? styles.activeCard : ''}`}
                                    onClick={() => handleCardClick(index)}
                                >
                                    <div className={styles.cardContent}>
                                        <h3>{tarea.nombreTarea}</h3>
                                        <p>{tarea.descripcionTarea}</p>
                                        <p>{tarea.dimension.nombre}</p>
                                    </div>
                                </div>
                            ))
                        )}
                        {activeCard !== null && (
                            <motion.div
                                ref={activeCardRef}
                                className={`${styles.card} ${styles.activeCard}`}
                                initial={{ scale: 0 }} // Estado inicial
                                animate={{ scale: 1 }} // Estado final
                                exit={{ scale: 0 }} // Estado al salir
                                transition={{ duration: 0.5 }} // Duración de la animación de salida aumentada
                            >
                                <div className={styles.cardContent}>
                                    <h3>{tareasFiltradas[activeCard].nombreTarea}</h3>
                                    <p>{tareasFiltradas[activeCard].descripcionTarea}</p>
                                    <p2>{tareasFiltradas[activeCard].dimension.nombre}</p2>
                                    
                                    {tareasEnProgreso[tareasFiltradas[activeCard].id] !== 'in progress' ? (
                                        <button
                                            onClick={() => startTask(tareasFiltradas[activeCard].id)}
                                            className={styles.startButton}
                                        >
                                            Empezar
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => completeTask(tareasFiltradas[activeCard].id)}
                                            className={styles.completeButton}
                                        >
                                            Terminar
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default TareaDiaria;
