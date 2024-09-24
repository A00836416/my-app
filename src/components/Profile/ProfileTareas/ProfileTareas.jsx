import React from 'react';
import styles from '../ProfileTareas/ProfileTareas.module.css';

const ProfileTareas = () => {

    return(
        <div className={styles.TareasContainer}>
            <div className={styles.TareasTitle}>
                <h2>Tareas completadas</h2>
                <a href="#">Ver más</a>
            </div>
            <div className={styles.CardTarea}>
                
            </div>
        </div>
    );
};

export default ProfileTareas;