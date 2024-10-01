import React, { useState } from 'react';
import styles from '../ProfileLogros/ProfileLogros.module.css';

const ProfileLogros = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    // Array de ejemplo con varios logros
    const logros = [
        { id: 1, titulo: "Logro 1", descripcion: "Descripción del logro 1" },
        { id: 2, titulo: "Logro 2", descripcion: "Descripción del logro 2" },
        { id: 3, titulo: "Logro 3", descripcion: "Descripción del logro 3" },
        { id: 4, titulo: "Logro 4", descripcion: "Descripción del logro 4" },
        { id: 5, titulo: "Logro 5", descripcion: "Descripción del logro 5" },
    ];

    return (
        <div className={styles.LogrosContainer}>
            <div className={styles.LogrosTitle}>
                <h2>Logros</h2>
                <button onClick={toggleExpand} className={styles['expand-button']}>
                    {isExpanded ? 'Ver menos' : 'Ver más'}
                </button>
            </div>
            <div className={styles.CardLogrosContainer}>
                <div className={styles.CardLogrosScroller}>
                    {logros.map((logro) => (
                        <div key={logro.id} className={styles.CardLogro}>
                            <h3>{logro.titulo}</h3>
                            
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileLogros;