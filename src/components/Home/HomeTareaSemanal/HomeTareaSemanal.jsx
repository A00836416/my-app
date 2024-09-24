import React from 'react';
import styles from './HomeTareaSemanal.module.css'; // Asegúrate de importar los estilos

const TareaSemanal = () => (
    <div>
        <div className={styles.weeklyTasksHeader}>
            <h2 className={styles.weeklyTasksTitle}>Tareas semanales</h2>
        </div>

        {/* Contenedor de los cards */}
        <div className={styles.weeklycardsContainer}>
            <div className={styles.weeklycard}>
                <p>Card 1</p>
            </div>
        </div>
    </div>
);

export default TareaSemanal;
