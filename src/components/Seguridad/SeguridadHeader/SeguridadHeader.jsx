import React from 'react';
import styles from '../SeguridadHeader/SeguridadHeader.module.css';
import { useNavigate } from 'react-router-dom';

const SeguridadHeader = () =>{
    const navigate = useNavigate();

    const goToSettings = () =>{
        navigate('/settings');
    };

    return(
        <div className={styles.SeguridadHeader}>
            <div className={styles.TabBarSeguridad}>
                <button className={styles.goToSettingsButton} onClick={goToSettings}>
                    <i className="fas fa-angle-left"></i>
                </button>
                <h1 className={styles.SeguridadTitle}>Seguridad</h1>
            </div>
        </div>
    );
};

export default SeguridadHeader;