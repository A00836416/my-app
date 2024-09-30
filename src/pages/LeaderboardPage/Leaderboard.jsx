import React from 'react';
import LeaderboardHeader from '../../components/Leaderboard/LeaderboardHeader/LeaderboardHeader';
import LeaderboardPodium from '../../components/Leaderboard/LeaderboardPodium/LeaderboardPodium';
import LeaderboardStandings from '../../components/Leaderboard/LeaderboardStandings/LeaderboardStandings';
import styles from './Leaderboard.module.css';

const Leaderboard = () => {
    return (
        <div className={styles.container}>
            <LeaderboardHeader></LeaderboardHeader>
            <LeaderboardPodium></LeaderboardPodium>
            <LeaderboardStandings></LeaderboardStandings>
        </div>
    );
};

export default Leaderboard;
