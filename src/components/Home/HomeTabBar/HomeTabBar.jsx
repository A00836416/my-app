import React, { useState, useEffect } from 'react';
import HomeProgress from '../HomeProgress/HomeProgress';
import HomeTareaDiaria from '../HomeTareaDiaria/HomeTareaDiaria';
import styles from './HomeTabBar.module.css';

const getExperiencePoints = async () => {
    return 150; // Simulación de puntos de experiencia
};

// Simulación de un fetch de tareas con sus estados
const fetchTasks = async () => {
    return [
        { id: 1, name: 'Tarea 1', status: 'Completed' },
        { id: 2, name: 'Tarea 2', status: 'In Progress' },
        { id: 3, name: 'Tarea 3', status: 'Not Started' },
        { id: 4, name: 'Tarea 4', status: 'Verified' },
        { id: 5, name: 'Tarea 5', status: 'Rejected' },
    ];
};

const HomeTabBar = () => {
    const [experiencePoints, setExperiencePoints] = useState(0);
    const [unlockedPhases, setUnlockedPhases] = useState([false, false, false, false]);
    const [activeTab, setActiveTab] = useState(0);
    const [tasks, setTasks] = useState([]);

    const requiredExperience = [0, 100, 200, 300, 400];

    useEffect(() => {
        const fetchExperience = async () => {
            const points = await getExperiencePoints();
            setExperiencePoints(points);

            const newUnlockedPhases = requiredExperience.map(req => points >= req);
            setUnlockedPhases(newUnlockedPhases);
        };

        const fetchAndSetTasks = async () => {
            const fetchedTasks = await fetchTasks();
            setTasks(fetchedTasks);
        };

        fetchExperience();
        fetchAndSetTasks();
    }, []);

    return (
        <div className={styles.smallSections}>
            {/* Pestañas */}
            {requiredExperience.map((req, index) => (
                <button
                    key={index}
                    className={`${styles.fase} ${activeTab === index ? styles.activeTab : ''} ${unlockedPhases[index] ? '' : styles.locked}`}
                    onClick={() => unlockedPhases[index] && setActiveTab(index)}
                >
                    <p className={styles.p}>Fase {index}</p>
                </button>
            ))}

            {/* Contenido de las fases */}
            <div className={styles.tareas}>
                {activeTab === 0 && (
                    <div>
                        <HomeTareaDiaria />
                        <HomeProgress />
                    </div>
                )}
                {activeTab === 1 && (
                    <div>
                        <HomeTareaDiaria />
                        <ul>
                            {tasks.map((task) => (
                                <li key={task.id}>
                                    {task.name} - <strong>{task.status}</strong>
                                </li>
                            ))}
                        </ul>
                        <p className={styles.p}>Contenido de la Fase 1</p>
                    </div>
                )}
                {activeTab === 2 && (
                    <div>
                        <HomeProgress />
                        <ul>
                            {tasks.map((task) => (
                                <li key={task.id}>
                                    {task.name} - <strong>{task.status}</strong>
                                </li>
                            ))}
                        </ul>
                        <p className={styles.p}>Contenido de la Fase 2</p>
                    </div>
                )}
                {activeTab === 3 && (
                    <div>
                        <p className={styles.p}>Contenido de la Fase 3</p>
                    </div>
                )}
                {activeTab === 4 && (
                    <div>
                        <p className={styles.p}>Contenido de la Fase 4</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomeTabBar;
