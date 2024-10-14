import React, { useState } from 'react';
import styles from './InformacionPersonal.module.css';
import Input from '../../shared/InputLogin/Input';

const InformacionPersonal = () => {
    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');

    return (
        <div className={styles.InformacionPersonal}>
            <div className={styles.Title}>
                <h2>Información Personal</h2>
            </div>

            <div className={styles.Nombre}>
                <Input
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre"
                    className={styles.InputNombre}
                />
            </div>

            <div className={styles.ApellidoPaterno}>
                <Input
                    type="text"
                    id="apellidoPaterno"
                    value={apellidoPaterno}
                    onChange={(e) => setApellidoPaterno(e.target.value)}
                    placeholder="Apellido Paterno"
                    className={styles.InputPaterno}
                />
            </div>

            <div className={styles.ApellidoMaterno}>
                <Input
                    type="text"
                    id="apellidoMaterno"
                    value={apellidoMaterno}
                    onChange={(e) => setApellidoMaterno(e.target.value)}
                    placeholder="Apellido Materno"
                    className={styles.InputMaterno}
                />
            </div>
        </div>
    );
};

export default InformacionPersonal;