import React, { useState, useEffect } from 'react';
import styles from './LeaderboardStandings.module.css';
import StandingsTable from './StandingsTable';
import { leaderboardService } from '../../../services/leaderboardService';

const LeaderboardStandings = () => {
    const [standingsData, setStandingsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const data = await leaderboardService.getLeaderboard();
                setStandingsData(data);
            } catch (error) {
                console.error('Error loading leaderboard data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLeaderboardData();
    }, []);

    if (isLoading) {
        return <div className={styles.loading}>Cargando clasificaciones...</div>;
    }

    return (
        <div className={styles.standingsContainer}>
            <h2 className={styles.standings}>Clasificación</h2>
            <div className={styles.headerContainer}>
                <div className={styles.headerItem}>Posición</div>
                <div className={styles.headerItem}>Nombre</div>
                <div className={styles.headerItem}>Puntuación</div>
            </div>
            <div className={styles.tableContainer}>
                <StandingsTable standingsData={standingsData} />
            </div>
        </div>
    );
};

export default LeaderboardStandings;
