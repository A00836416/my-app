import React from 'react';
import styles from './HomeTareaDiaria.module.css'; // Asegúrate de importar los estilos

const TareaDiaria = () => (
    <div>
        <div className={styles.dailyTasksHeader}>
            <h2 className={styles.dailyTasksTitle}>Tareas </h2>

        </div>

        {/* Contenedor de los cards */}
        <div className={styles.cardsContainer}>
            <div className={styles.card}>
                <p>Card 1</p>
            </div>
            <div className={styles.card}>
                <p>Card 2</p>
            </div>
            <div className={styles.card}>
                <p>Card 3</p>
            </div>
            <div className={styles.card}>
                <p>Card 4</p>
            </div>
        </div>
    </div>
);

export default TareaDiaria;
