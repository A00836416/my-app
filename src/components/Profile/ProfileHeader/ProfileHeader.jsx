import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileHeader.module.css';
import FotoPerfil from '../ProfileHeader/img/cars.png';


const ProfileHeader = () => {
    const navigate = useNavigate(); // Inicializa el hook useNavigate

    const goToHome = () => {
        navigate('/home'); // Redirige a la página de inicio
    };
    return(
        <div className={styles.ProfileHeader}>
            <button className={styles.goToHomebutton} onClick={goToHome}>
                    <i className="fas fa-angle-left"></i>
                </button>
            <div className={styles.ProfilePic}>
                <img src={FotoPerfil} alt="foto perfil" />
            </div>
            <div className={styles.EmployeeLevel}>
                <p className={styles.Name}>Zara Luna</p>
                <p className={styles.Kian}>Kian</p>
                <div className={styles.ProgressBar}>
                    <div className={styles.Progress}></div>
                </div>
                <p className={styles.Nivel}>Nivel 20</p>
            </div>
            
        </div>
    );
};

export default ProfileHeader;