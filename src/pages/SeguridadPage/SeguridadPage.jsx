import React from 'react';
import styles from '../SeguridadPage/SeguridadPage.module.css';
import SeguridadHeader from '../../components/Seguridad/SeguridadHeader/SeguridadHeader';
import SeguridadContraseña from '../../components/Seguridad/SeguridadContraseña/SeguridadContraseña';

const SeguridadPage = () => {

    return(
        <div className={styles.container}>
            <SeguridadHeader></SeguridadHeader>
            <SeguridadContraseña></SeguridadContraseña>
        </div>

    );
};

export default SeguridadPage;