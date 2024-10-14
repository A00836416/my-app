import React from 'react';
import styles from '../SeguridadContraseña/SeguridadContraseña.module.css';
import { useNavigate } from 'react-router-dom';

const SeguridadContraseña = () =>{

    const navigate = useNavigate();

    const goToCambiarContraseña = () =>{
        navigate('/change-password');
    };

    return(
        <div className={styles.SeguridadContraseña}>
            <div className={styles.Title}>
                <h2>Seguridad de inicio de sesión</h2>
            </div>

            <div className={styles.CambiarContraseña} onClick={goToCambiarContraseña}>
                <i className="fa-solid fa-lock"></i>
                <h2>Cambiar contraseña</h2>
                <button className={styles.goToCambiarContraseña}>
                    <i className="fas fa-angle-right"></i>
                </button>
            </div>
        </div>
    );
};

export default SeguridadContraseña;