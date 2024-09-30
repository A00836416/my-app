import React from 'react';
import styles from './HomeTabBar.module.css';

const HomeTabBar = () => (
    <div className={styles.smallSections}>
        <div className={styles.fase1}>
            <p>Fase 1</p>
        </div>
        <div className={styles.fase2}>
            <p>Fase 2</p>
        </div>
        <div className={styles.fase3}>
            <p>Fase 3</p>
        </div>
        <div className={styles.fase4}>
            <p>Fase 4</p>
        </div>
    </div>
);

export default HomeTabBar;