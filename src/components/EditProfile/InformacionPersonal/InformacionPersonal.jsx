import React, { useState } from 'react';
import styles from './InformacionPersonal.module.css';
import Input from '../../shared/InputLogin/Input';

const InformacionPersonal = () => {
    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [genero, setGenero] = useState('');

    return (
        <div className={styles.InformacionPersonal}>
            <div className={styles.Title}>
                <h2>Información Personal</h2>
            </div>
            
            <div className={styles.Casillas}>
                <div className={styles.Nombre}>
                    <h3 className={styles.label}>Nombre</h3>
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
                    <h3 className={styles.label}>Appelido Paterno</h3>
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
                    <h3 className={styles.label}>Apellido Materno</h3>
                    <Input
                        type="text"
                        id="apellidoMaterno"
                        value={apellidoMaterno}
                        onChange={(e) => setApellidoMaterno(e.target.value)}
                        placeholder="Apellido Materno"
                        className={styles.InputMaterno}
                    />
                </div>

                <div className={styles.Email}>
                    <h3 className={styles.label}>Email</h3>
                    <Input
                        type="text"
                        id="email"
                        value={correoElectronico}
                        onChange={(e) => setCorreoElectronico(e.target.value)}
                        placeholder="Email"
                        className={styles.InputEmail}
                    />
                </div>

                <div className={styles.Genero}>
                    <h3 className={styles.label}>Género</h3>
                    <div className={styles.generoOptions}>
                        <label className={styles.generoOption}>
                            <Input
                                type="radio"
                                name="genero"
                                value="male"
                                checked={genero === 'male'}
                                onChange={() => setGenero('male')}
                            />
                            <span className={styles.customRadio}></span>
                            Masculino
                        </label>
                        <label className={styles.generoOption}>
                            <Input
                                type="radio"
                                name="genero"
                                value="female"
                                checked={genero === 'female'}
                                onChange={() => setGenero('female')}
                            />
                            <span className={styles.customRadio}></span>
                            Femenino
                        </label>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default InformacionPersonal;