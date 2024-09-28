import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomeHeader.module.css';
import FotoPerfil from '../../Profile/ProfileHeader/img/cars.png';

const HomeHeader = ({ user, goToLogoutPage }) => {
    return (
        <div className={styles.welcomeContainer}>
            <div className={styles.welcome}>
                <h1>Bienvenido</h1>
                <div className={styles.sucursalContainer}>
                    <i className="fas fa-map-marker-alt"></i>
                    <p className={styles.sucursal}>Sucursal</p>
                </div>
            </div>
            <div className={styles.buttons}>
                <Link to="/notifications" className={styles.notificationsButton}>
                    <i className="fas fa-bell"></i>
                </Link>
                <button onClick={goToLogoutPage} className={styles.ProfilePic}>
                    <Link to="/profile" className={styles.ProfilePic}>
                        <img src={FotoPerfil} alt="foto perfil" />
                    </Link>
                </button>
            </div>
        </div>
    );
};

export default HomeHeader;
