import React from 'react';
import styles from '../ProfileLogros/ProfileLogros.module.css';

const ProfileLogros = () =>{

    return(
        <div className={styles.LogrosContainer}>
            <div className={styles.LogrosTitle}>
                <h2>Logros</h2>
                <a href="#">Ver más</a>
            </div>
            <div className={styles.CardLogros}>
                
            </div>
        </div>
    );
};

export default ProfileLogros;