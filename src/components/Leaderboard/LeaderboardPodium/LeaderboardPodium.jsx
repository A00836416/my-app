import React from 'react';
import styles from './LeaderboardPodium.module.css';

const LeaderboardPodium = () => {
    return (
        <div className={styles.podiumContainer}>
            <div className={styles.podium}>Top 3 Players</div>
        </div>
    );
};

export default LeaderboardPodium;
