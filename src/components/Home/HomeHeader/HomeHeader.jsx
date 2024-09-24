import React from 'react';
import styles from './HomeHeader.module.css'; 

const HomeHeader = ({ user, goToNotifications, goToLogoutPage }) => {
    return (
            <div className={styles.welcomeContainer}>
                <div className={styles.buttons}>
                    <button onClick={goToNotifications} className={styles.notificationsButton}>
                        <i className="fas fa-bell"></i>
                    </button>
                    <button onClick={goToLogoutPage} className={styles.perfilButton}>
                        Perfil
                    </button>
                </div>
                <div className={styles.welcome}>
                    <h1>Bienvenido</h1>
                    <div className={styles.sucursalContainer}>
                        <i className="fas fa-map-marker-alt"></i>
                        <p className={styles.sucursal}>Sucursal</p>
                    </div>
                </div>
             </div>
    );
};

export default HomeHeader;
