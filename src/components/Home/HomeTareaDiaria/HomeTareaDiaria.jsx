import React, { useState, useRef, useEffect } from 'react';
import styles from './HomeTareaDiaria.module.css';
import '../../../pages/HomePage/HomePage.module.css'; // Asegúrate de importar el CSS de HomePage

const TareaDiaria = () => {
    const [activeCard, setActiveCard] = useState(null);
    const activeCardRef = useRef(null);

    const handleCardClick = (cardIndex) => {
        setActiveCard(cardIndex); // Establece la tarjeta activa al hacer clic
    };

    const handleOutsideClick = (event) => {
        // Verifica si el clic fue fuera de la tarjeta activa
        if (activeCardRef.current && !activeCardRef.current.contains(event.target)) {
            setActiveCard(null); // Cerrar la tarjeta activa
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick); // Agrega el evento para detectar clics fuera
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick); // Limpia el evento al desmontar
        };
    }, []);

    return (
        <div className={`${styles.tasksWrapper} ${activeCard !== null ? 'blurBackground' : ''}`}>
            <div className={styles.dailyTasksHeader}>
                <h2 className={styles.dailyTasksTitle}>Tareas</h2>
            </div>
            <div className={styles.cardsContainer}>
                {[...Array(7)].map((_, index) => (
                    <div
                        key={index}
                        ref={activeCard === index ? activeCardRef : null} // Asignar el ref a la tarjeta activa
                        className={`${styles.card} ${activeCard === index ? styles.activeCard : ''}`} // Aplicar clase activa
                        onClick={() => handleCardClick(index)} // Al hacer clic, activa la tarjeta
                    >
                        <p>Card {index + 1}</p>
                    </div>
                ))}
                {activeCard !== null && ( // Renderizar la tarjeta activa si existe
                    <div
                        ref={activeCardRef} // Asignar ref a la tarjeta activa
                        className={`${styles.card} ${styles.activeCard}`} // Usar estilos activos
                    >
                        <p>Tarea Detalles</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TareaDiaria;
