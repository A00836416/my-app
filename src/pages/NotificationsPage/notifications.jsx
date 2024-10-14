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
    const [groupedNotifications, setGroupedNotifications] = useState({});
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        const fetchAuthStatus = async () => {
            try {
                const userData = await checkAuthStatus();
                setUser(userData);
                loadNotifications(userData.id);
            } catch (error) {
                setIsAuthenticated(false);
                navigate('/login');
            }
        };
        fetchAuthStatus();
    }, [navigate, setIsAuthenticated]);

    const loadNotifications = async (userId) => {
        const mockNotifications = [
            { id: 1, title: 'Nueva tarea asignada', description: 'Se te ha asignado una nueva tarea para el proyecto X.', date: new Date() },
            { id: 2, title: 'Recordatorio de reunión', description: 'Tu reunión con el equipo comienza en 15 minutos.', date: new Date() },
            { id: 3, title: 'Comentario en tu tarea', description: 'Alguien ha comentado en tu tarea.', date: new Date(Date.now() - 86400000) },
            { id: 4, title: 'Documento revisado', description: 'La revisión del documento ha sido completada.', date: new Date(Date.now() - 86400000) },
            { id: 5, title: 'Actualización de software', description: 'Hay una nueva actualización de software disponible.', date: new Date(Date.now() - 86400000 * 2) },
            { id: 6, title: 'Recordatorio de pago', description: 'Recuerda realizar el pago de tus servicios.', date: new Date(Date.now() - 86400000 * 3) },
            { id: 7, title: 'Solicitud de conexión', description: 'Has recibido una nueva solicitud de conexión.', date: new Date(Date.now() - 86400000 * 6) },
            { id: 8, title: 'Documento enviado', description: 'Se ha enviado el documento para su revisión.', date: new Date(Date.now() - 86400000 * 10) },
        ];

        setGroupedNotifications(groupNotificationsByDate(mockNotifications));
    };

    const groupNotificationsByDate = (notifications) => {
        const grouped = {
            hoy: [],
            ayer: [],
            ultimos7Dias: [],
            ultimoMes: [],
        };

        notifications.forEach(notification => {
            const notificationDate = notification.date;
            const today = new Date();
            const yesterday = new Date();
            yesterday.setDate(today.getDate() - 1);
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(today.getDate() - 7);
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(today.getDate() - 30);

            if (notificationDate.toDateString() === today.toDateString()) {
                grouped.hoy.push(notification);
            } else if (notificationDate.toDateString() === yesterday.toDateString()) {
                grouped.ayer.push(notification);
            } else if (notificationDate >= sevenDaysAgo) {
                grouped.ultimos7Dias.push(notification);
            } else if (notificationDate >= thirtyDaysAgo) {
                grouped.ultimoMes.push(notification);
            }
        });

        return grouped;
    };

    if (!user) return <div className={styles.loading}>Loading...</div>;

    return (
        <div className={styles.container}>
            <NotificationsHeader />
            <NotificationsList groupedNotifications={groupedNotifications} />
        </div>
    );
};

export default NotificationsPage;
