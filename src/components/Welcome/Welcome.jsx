import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Welcome.module.css';
import logo from './assets/img/kia-logo-nuevo-blanco-1.png';
import carImage from './assets/img/kiastinger.webp';

const Welcome = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/login'); // navigate to the login page
    };

    return (
        <div className={styles.Welcome}>
            <img src={logo} alt="Kia Logo" className={styles.logo} />
            <p className={styles.lifeText}>LIFE</p>
            <img src={carImage} alt="Kia Car" className={styles.carImage} />
            <div className={styles.card}>
                <h2 className={styles.slogan}>Movimiento que Inspira</h2>
                <button className={styles.startButton} onClick={handleButtonClick}>
                    Comenzar
                </button>
            </div>
        </div>
    );
};

export default Welcome;
