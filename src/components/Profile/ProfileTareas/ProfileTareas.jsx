import React, { useState } from 'react';
import styles from '../ProfileTareas/ProfileTareas.module.css';

const ProfileTareas = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    // Array de ejemplo con varias tareas
    const tareas = [
        { id: 1, titulo: "Tarea 1" },
        { id: 2, titulo: "Tarea 2" },
        { id: 3, titulo: "Tarea 3" },
        { id: 4, titulo: "Tarea 4" },
        { id: 5, titulo: "Tarea 5" },
        { id: 6, titulo: "Tarea 6" },
    ];

    return(
        <div className={styles.TareasContainer}>
            <div className={styles.TareasTitle}>
                <h2>Tareas completadas</h2>
                <button onClick={toggleExpand} className={styles['expand-button']}>
                    {isExpanded ? 'Ver menos' : 'Ver más'}
                </button>
            </div>
            <div className={styles.CardContenedor}>
                <div className={styles.CardScroller}>
                    {tareas.map((tarea) => (
                        <div key={tarea.id} className={styles.CardTarea}>
                            <ul>
                                <li>{tarea.titulo}</li>
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileTareas;