import React from 'react';
import styles from '../CambiarContraseñaPage/CambiarContraseña.module.css';
import CambiarContraseñaHeader from '../../components/CambiarContraseña/CambiarContraseñaHeader/CambiarContraseñaHeader';
import CambiarContraseñaInput from '../../components/CambiarContraseña/CambiarContraseñaInput/CambiarContraseñaInput';

const CambiarContraseña = () =>{

    return(
        <div className={styles.container}>
            <CambiarContraseñaHeader></CambiarContraseñaHeader>
            <CambiarContraseñaInput></CambiarContraseñaInput>
        </div>
    );
};

export default CambiarContraseña;