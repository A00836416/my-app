import React, { useState, useEffect } from 'react';
import styles from '../ProfilePage/ProfilePage.module.css';
import ProfileHeader from '../../components/Profile/ProfileHeader/ProfileHeader';
import TaskCard from '../../components/Home/HomeTareaDiaria/TaskCard';
import { employeeService } from '../../services/employeeService';
import '@fortawesome/fontawesome-free/css/all.css';

const ProfilePage = () => {
    const [tareas, setTareas] = useState([]);
    const [activeCard, setActiveCard] = useState(null);

    // Fetch tasks from the service
    useEffect(() => {
        const fetchTareas = async () => {
            try {
                const tasksData = await employeeService.getTaskByEmployee();
                const tareasVerificadas = tasksData.filter(tarea => tarea.progresoEmpleado && tarea.progresoEmpleado.estado === 'Verified');
                setTareas(tareasVerificadas);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTareas();
    }, []);

    const handleCardClick = (index) => {
        setActiveCard(index); // Actualiza la tarjeta activa
    };

    const handleStartTask = (tarea) => {
        console.log('Iniciar tarea:', tarea);
    };

    const handleCompleteTask = (tarea) => {
        console.log('Completar tarea:', tarea);
    };

    const handleRetryTask = (tarea) => {
        console.log('Reintentar tarea:', tarea);
    };

    return (
        <div className={styles.container}>
            <ProfileHeader />
            <div className={styles.cardsContainer}>
                {tareas.length === 0 ? (
                    <p>No hay tareas verificadas</p>
                ) : (
                    tareas.map((tarea, index) => (
                        <TaskCard
                            key={index}
                            tarea={tarea}
                            index={index}
                            activeCard={activeCard}
                            handleCardClick={handleCardClick}
                            handleStartTask={handleStartTask}
                            handleCompleteTask={handleCompleteTask}
                            handleRetryTask={handleRetryTask}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
