import React from 'react';
import styles from './NotificationsList.module.css';

const NotificationsList = ({ groupedNotifications }) => {
    // Mapeo de claves a encabezados con espacios
    const headerMap = {
        hoy: 'Hoy',
        ayer: 'Ayer',
        ultimos7Dias: 'Últimos 7 Días',
        ultimoMes: 'Último Mes',
    };

    return (
        <div className={styles.notificationsContainer}>
            {Object.keys(groupedNotifications).map((key) => (
                <div key={key}>
                    <h2 className={styles.TituloFechas}>{headerMap[key]}</h2> {/* Usar el mapeo aquí */}
                    <ul className={styles.Grupo}>
                        {groupedNotifications[key].map((notification) => (
                            <li key={notification.id} className={styles.Notificaciones}>
                                <h3 className={styles.notificationTitle}>{notification.title}</h3>
                                <p className={styles.notificationDescription}>{notification.description}</p>
                                <span className={styles.notificationTime}>{getTimeAgo(notification.date)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

// Función para calcular el tiempo relativo
const getTimeAgo = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // Diferencia en segundos

    const dayDiff = Math.floor(diff / 86400); // Diferencia en días
    if (dayDiff === 0) {
        const hourDiff = Math.floor(diff / 3600);
        if (hourDiff === 0) {
            const minuteDiff = Math.floor(diff / 60);
            return minuteDiff === 0 ? 'Justo ahora' : `${minuteDiff} minutos atrás`;
        }
        return `${hourDiff} horas atrás`;
    } else if (dayDiff === 1) {
        return 'Ayer';
    } else {
        return `${dayDiff} días atrás`;
    }
};

export default NotificationsList;
