import React from 'react';
import styles from './LeaderboardHeader.module.css';

const LeaderboardHeader = () => {
    return (
        <div className={styles.headerContainer}>
            <h1 className={styles.title}>Leaderboard</h1>
            <p className={styles.week}>Week 1</p>
        </div>
    );
};

export default LeaderboardHeader;
