import React from 'react';
import styles from './LeaderboardStandings.module.css';
import goldMedal from './gold_medal.png';
import silverMedal from './silver_medal.png';
import bronzeMedal from './bronze_medal.png';

const StandingsTable = ({ standingsData }) => {
    // Añade posición y medallas a los primeros tres
    const finalStandings = standingsData.map((player, index) => ({
        ...player,
        position: index + 1,
        medal: index === 0 ? goldMedal :
               index === 1 ? silverMedal :
               index === 2 ? bronzeMedal : null,
    }));

    return (
        <div className={styles.tableContainer}>
            <table>
                <tbody>
                    {finalStandings.map((player) => (
                        <tr key={player.position}>
                            <td>
                                <div className={styles.positionContainer}>
                                    {player.medal && <img src={player.medal} alt="Medal" className={styles.medalImage} />}
                                    {player.position > 3 ? player.position : ''}
                                </div>
                            </td>
                            <td className={player.position <= 3 ? styles.boldText : ''}>
                                {player.nombreEmpleado}
                            </td>
                            <td>{player.experienciaSemanal}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StandingsTable;
