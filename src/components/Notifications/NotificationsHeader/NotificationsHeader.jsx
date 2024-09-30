import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import styles from './NotificationsHeader.module.css'; // Asegúrate de crear este archivo CSS

const NotificationsHeader = () => {
    const navigate = useNavigate(); // Inicializa el hook useNavigate

    const handleGoHome = () => {
        navigate('/'); // Redirige a la página de inicio
    };

    return (
        <header className={styles.headerContainer}>
            <button className={styles.backButton} onClick={handleGoHome}>
                <i className="fas fa-angle-left"></i>
            </button>
            <h1 className={styles.title}>Notificaciones</h1> {/* Título dentro del contenedor */}
        </header>
    );
};

export default NotificationsHeader;
