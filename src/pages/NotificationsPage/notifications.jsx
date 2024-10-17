import React, { useState, useEffect, useContext } from 'react';
import { checkAuthStatus } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import NotificationsHeader from '../../components/Notifications/NotificationsHeader/NotificationsHeader';
import NotificationsList from '../../components/Notifications/NotificationsList/NotificationsList';
import styles from './NotificationsPage.module.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { notificationsService } from '../../services/notificationsService';

const NotificationsPage = () => {
    const [user, setUser] = useState(null);
    const [groupedNotifications, setGroupedNotifications] = useState({
        hoy: [],
        ayer: [],
        ultimos7Dias: [],
        ultimoMes: [],
    });
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        const fetchAuthStatus = async () => {
            try {
                const userData = await checkAuthStatus();
                console.log(userData);
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
        try {
            const response = await notificationsService.getnotifications();
            const data = await response;
    
            // Transforma las notificaciones solo con título y fecha
            const transformedNotifications = data.map(notification => ({
                id: notification.notificacionID,
                title: notification.mensaje,
                date: new Date(notification.fechaCreacion),
            }));
    
            setGroupedNotifications(groupNotificationsByDate(transformedNotifications));
        } catch (error) {
            console.error('Error al cargar las notificaciones:', error);
        } finally {
            setIsLoading(false);
        }
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

    if (isLoading) {
        return <div className={styles.loading}>Cargando notificaciones...</div>;
    }

    const noNotifications = !groupedNotifications.hoy.length && !groupedNotifications.ayer.length &&
                            !groupedNotifications.ultimos7Dias.length && !groupedNotifications.ultimoMes.length;

    return (
        <div className={styles.container}>
            <NotificationsHeader />
            {noNotifications ? (
                <div className={styles.noNotifications}>No tienes notificaciones</div>
            ) : (
                <NotificationsList groupedNotifications={groupedNotifications} />
            )}
        </div>
    );
};

export default NotificationsPage;
