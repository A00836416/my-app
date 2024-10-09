import React from 'react';
import LeaderboardHeader from '../../components/Leaderboard/LeaderboardHeader/LeaderboardHeader';
import LeaderboardStandings from '../../components/Leaderboard/LeaderboardStandings/LeaderboardStandings';
import styles from './Leaderboard.module.css';

const Leaderboard = () => {
    return (
        <div className={styles.container}>
            <LeaderboardHeader></LeaderboardHeader>
            <LeaderboardStandings></LeaderboardStandings>
        </div>
    );
};

export default Leaderboard;
