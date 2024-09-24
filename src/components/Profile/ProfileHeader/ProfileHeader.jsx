import React, { useState, useEffect, useContext } from 'react';
import styles from './ProfileHeader.module.css';
import FotoPerfil from '../ProfileHeader/img/cars.png';


const ProfileHeader = () => {
    return(
        <div className={styles.ProfilePic}>
            <img src={FotoPerfil} alt="foto perfil" />
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