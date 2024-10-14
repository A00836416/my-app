import React from 'react';
import styles from './ProgressChart.module.css';

const ProgressChart = ({ tareas, fase }) => {
    const calculateProgress = () => {
        const progress = {
            completed: 0,
            verified: 0,
            inProgress: 0,
            notStarted: 0,
            rejected: 0,
        };

        // Filtra las tareas por fase
        const tareasFiltradas = tareas.filter(tarea => tarea.fase === fase);

        tareasFiltradas.forEach(tarea => {
            if (tarea.progresoEmpleado) {
                switch (tarea.progresoEmpleado.estado) {
                    case 'Completed':
                        progress.completed++;
                        break;
                    case 'Verified':
                        progress.verified++;
                        break;
                    case 'In Progress':
                        progress.inProgress++;
                        break;
                    case 'Rejected':
                        progress.rejected++;
                        break;
                    default:
                        progress.notStarted++;
                }
            } else {
                progress.notStarted++;
            }
        });

        const total = tareasFiltradas.length;
        // Asegúrate de no dividir entre cero
        return total > 0 ? [
            { name: 'Verificadas', value: ((progress.verified) / total) * 100, class: styles.barCompleted },
            { name: 'Completadas', value: ((progress.completed) / total) * 100, class: styles.barCompleted },
            { name: 'En Progreso', value: (progress.inProgress / total) * 100, class: styles.barInProgress },
            { name: 'No Iniciadas', value: (progress.notStarted / total) * 100, class: styles.barNotStarted },
        ] : [
            { name: 'Verificadas', value: 0, class: styles.barCompleted },
            { name: 'Completadas', value: 0, class: styles.barCompleted },
            { name: 'En Progreso', value: 0, class: styles.barInProgress },
            { name: 'No Iniciadas', value: 0, class: styles.barNotStarted },
        ];
    };

    const data = calculateProgress();

    return (
        <div className={styles.chartContainer}>
            {data.map((item, index) => (
                <div key={index} className={styles.barContainer}>
                    <div className={styles.barLabel}>{item.name}</div>
                    <div className={styles.barWrapper}>
                        <div
                            className={`${styles.bar} ${item.class}`}
                            style={{ width: `${item.value}%` }}
                        >
                            {item.value.toFixed(1)}%
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProgressChart;
