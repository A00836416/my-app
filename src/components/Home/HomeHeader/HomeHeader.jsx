import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomeHeader.module.css';
import FotoPerfil from '../../Profile/ProfileHeader/img/cars.png';

const HomeHeader = ({ user }) => {
    return (
        <header className={styles.welcomeContainer}>
            <div className={styles.welcome}>
                <h1>Bienvenido, {user?.nombre || 'Usuario'}</h1>
                <div className={styles.sucursalContainer}>
                    <i className="fas fa-map-marker-alt"></i>
                    <p className={styles.sucursal}>{user?.sucursal || 'Sucursal'}</p>
                </div>
            </div>
            <div className={styles.buttons}>
                <Link to="/notifications" className={styles.notificationsButton} aria-label="Notificaciones">
                    <i className="fas fa-bell"></i>
                </Link>
                <Link to="/profile" className={styles.profileLink} aria-label="Perfil">
                    <div className={styles.ProfilePic}>
                        <img src={user?.fotoPerfil || FotoPerfil} alt="Foto de perfil" />
                    </div>
                </Link>
            </div>
        </header>
    );
};

export default HomeHeader;