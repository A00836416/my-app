import React, { useState, useEffect, useContext } from 'react';
import { checkAuthStatus } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import NotificationsHeader from '../../components/Notifications/NotificationsHeader/NotificationsHeader';
import NotificationsList from '../../components/Notifications/NotificationsList/NotificationsList';
import styles from './NotificationsPage.module.css';
import '@fortawesome/fontawesome-free/css/all.css';

const NotificationsPage = () => {
    const [user, setUser] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        const fetchAuthStatus = async () => {
            try {
                const userData = await checkAuthStatus();
                setUser(userData);
                // Aquí puedes cargar las notificaciones del usuario
                loadNotifications(userData.id);
            } catch (error) {
                setIsAuthenticated(false);
                navigate('/login');
            }
        };
        fetchAuthStatus();
    }, [navigate, setIsAuthenticated]);

    const loadNotifications = async (userId) => {
        // Simulación de una llamada a la API para obtener notificaciones
        // Aquí deberías hacer la llamada real a tu API
        const mockNotifications = [
            { id: 1, message: 'Tienes una nueva tarea asignada.' },
            { id: 2, message: 'Tu reunión comienza en 15 minutos.' },
            { id: 3, message: 'Nuevo comentario en tu tarea.' },
        ];
        setNotifications(mockNotifications);
    };

    if (!user) return <div className={styles.loading}>Loading...</div>;

    return (
        <div className={styles.container}>
            <NotificationsHeader />
            <NotificationsList notifications={notifications} />
    

       
            
        </div>
    );
};

export default NotificationsPage;
