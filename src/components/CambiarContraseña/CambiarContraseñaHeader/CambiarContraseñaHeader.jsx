import React from 'react';
import styles from '../CambiarContraseñaHeader/CambiarContraseñaHeader.module.css';
import { useNavigate } from 'react-router-dom';

const CambiarContraseñaHeader = () =>{
    const navigate = useNavigate();

    const goToSeguridad = () =>{
        navigate('/security')
    };
    return(
        <div className={styles.CambiarContraseñaHeader}>
            <div className={styles.TabBarContraseña}>
                <button className={styles.goToSeguridad} onClick={goToSeguridad}>
                    <i className="fas fa-angle-left"></i>
                </button>
                <h1 className={styles.CambiarContraseñaTitle}>Cambiar contraseña</h1>
            </div>
        </div>
    );
};

export default CambiarContraseñaHeader;