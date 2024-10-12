import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuthStatus } from '../../services/api';
import { AuthContext } from '../../App';
import { employeeService } from '../../services/employeeService';
import HomeHeader from '../../components/Home/HomeHeader/HomeHeader';
import HomeTareaDiaria from '../../components/Home/HomeTareaDiaria/HomeTareaDiaria';
import styles from './HomePage.module.css';
import '@fortawesome/fontawesome-free/css/all.css';

const HomePage = () => {
    const [user, setUser] = useState(null);
    const [tareas, setTareas] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);

    const fetchData = useCallback(async () => {
        try {
            const [userData, tasksData] = await Promise.all([
                checkAuthStatus(),
                employeeService.getTaskByEmployee()
            ]);
            setUser(userData);
            setTareas(tasksData);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsAuthenticated(false);
            navigate('/login');
        } finally {
            setLoading(false);
        }
    }, [navigate, setIsAuthenticated]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const progressData = useMemo(() => {
        const totalTasks = tareas.length;
        const completedTasks = tareas.filter(tarea =>
            tarea.progresoEmpleado?.estado === 'Completed' ||
            tarea.progresoEmpleado?.estado === 'Verified'
        ).length;

        const progressByPhase = [1, 2, 3, 4].map(phase => {
            const phaseTasks = tareas.filter(tarea => tarea.nivel.numero === phase);
            const phaseCompleted = phaseTasks.filter(tarea =>
                tarea.progresoEmpleado?.estado === 'Completed' ||
                tarea.progresoEmpleado?.estado === 'Verified'
            ).length;
            return { phase, total: phaseTasks.length, completed: phaseCompleted };
        });

        return { totalTasks, completedTasks, progressByPhase };
    }, [tareas]);

    if (loading) return <div className={styles.loading}>Loading...</div>;

    return (
        <div className={styles.container}>
            <HomeHeader user={user} />
            <HomeTareaDiaria tareas={tareas} progressByPhase={progressData.progressByPhase} />
        </div>
    );
};

export default HomePage;