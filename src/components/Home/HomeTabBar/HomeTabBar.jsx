import React from 'react';
import styles from './HomeTabBar.module.css'; // Asegúrate de importar los estilos

const HomeTabBar = () => (
    <div className={styles.smallSections}>
        <div className={styles.inicio}>
            <p>Inicio</p>
        </div>
        <div className={styles.tareas}>
            <p>Tareas</p>
        </div>
        <div className={styles.beneficios}>
            <p>Beneficios</p>
        </div>
    </div>
);

export default HomeTabBar;