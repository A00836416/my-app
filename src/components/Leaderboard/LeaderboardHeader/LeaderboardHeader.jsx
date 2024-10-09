import React, { useState, useEffect } from 'react';
import styles from './LeaderboardHeader.module.css';

const LeaderboardHeader = () => {
    const [currentWeek, setCurrentWeek] = useState(1);

    useEffect(() => {
        // Fecha de inicio de la primera semana
        const startDate = new Date('2024-08-08');
        const today = new Date();
        const diffInTime = today - startDate;
        const diffInWeeks = Math.floor(diffInTime / (1000 * 60 * 60 * 24 * 7));

        // Ajusta la semana actual
        setCurrentWeek(diffInWeeks + 1);
    }, []);

    return (
        <div className={styles.headerContainer}>
            <h1 className={styles.title}>Leaderboard</h1>
            <p className={styles.week}>Week {currentWeek}</p>
        </div>
    );
};

export default LeaderboardHeader;
