import React from 'react';
import styles from './LeaderboardStandings.module.css';

// Import medal images
import goldMedal from './gold_medal.png';
import silverMedal from './silver_medal.png';
import bronzeMedal from './bronze_medal.png';

// List of random names
const names = [ 
    'Bernardo', 'Juan Daniel', 'Gavlan', 'Harold', 'Rocha', 
    'Luis', 'Marta', 'Pedro', 'Sofia', 'Miguel',
    'Elena', 'Javier', 'Camila', 'Daniel', 'Lucia',
    'Andres', 'Natalia', 'Diego', 'Valeria', 'Cristian',
    'Laura', 'Alejandro', 'Carolina', 'Felipe', 'Maria',
    'Carlos', 'Isabel', 'Esteban', 'Juliana', 'Santiago',
];

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const StandingsTable = () => {
    // Shuffle the names and slice the first 30 unique names
    const uniqueNames = shuffleArray([...names]).slice(0, 30);

    // Generate example data for 30 rows
    const standingsData = uniqueNames.map((name) => ({
        name,
        score: Math.floor(Math.random() * 100), // Generate a random score
    }));

    // Sort players by score (highest to lowest)
    const sortedStandings = standingsData.sort((a, b) => b.score - a.score);

    // Add position and medals to the top three positions
    const finalStandings = sortedStandings.map((player, index) => ({
        ...player,
        position: index + 1, // Update the position
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
                                    {player.position > 3 ? player.position : ''} {/* Show position number only if greater than 3 */}
                                </div>
                            </td>
                            <td>{player.name}</td>
                            <td>{player.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StandingsTable;
