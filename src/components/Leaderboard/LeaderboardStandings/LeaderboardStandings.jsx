import React from 'react';
import styles from './LeaderboardStandings.module.css';
import StandingsTable from './StandingsTable';

const LeaderboardStandings = () => {
    return (
        <div className={styles.standingsContainer}>
            <h2 className={styles.standings}>Clasificación</h2>

            {/* Contenedor separado para los títulos */}
            <div className={styles.headerContainer}>
                <div className={styles.headerItem}>Posición</div>
                <div className={styles.headerItem}>Nombre</div>
                <div className={styles.headerItem}>Puntuación</div>
            </div>

            {/* Contenedor para la tabla */}
            <div className={styles.tableContainer}>
                <table>
                    <tbody>
                        <StandingsTable />
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeaderboardStandings;
