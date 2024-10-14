import React from 'react';
import styles from '../CambiarContraseñaPage/CambiarContraseña.module.css';
import CambiarContraseñaHeader from '../../components/CambiarContraseña/CambiarContraseñaHeader/CambiarContraseñaHeader';

const CambiarContraseña = () =>{

    return(
        <div className={styles.container}>
            <CambiarContraseñaHeader></CambiarContraseñaHeader>
        </div>
    );
};

export default CambiarContraseña;