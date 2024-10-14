import React, { useState, useEffect } from 'react';
import styles from './InformacionPersonal.module.css';
import Input from '../../shared/InputLogin/Input';
import { getUserInfo } from '../../../services/api';

const InformacionPersonal = ({ onSave }) => {
    // Estados para cada campo
    const [usuario, setUsuario] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [posicion, setPosicion] = useState('');
    const [sexo, setSexo] = useState('');

    // Cargar datos del usuario
    useEffect(() => {
        const fetchUserData = async () => {
            const userInfo = await getUserInfo();
            console.log(userInfo);
            
            // Poblamos los estados con los datos del usuario
            setUsuario(userInfo.userName)
            setNombre(userInfo.nombre);
            setApellidoPaterno(userInfo.apellidoPaterno);
            setApellidoMaterno(userInfo.apellidoMaterno);
            setCorreoElectronico(userInfo.correoElectronico);
            setPosicion(userInfo.posicion);
            setSexo(userInfo.sexo); 
        };

        fetchUserData();
    }, []);

    // Cada vez que cambian los valores, actualizamos el estado del componente padre
    useEffect(() => {
        if (onSave) {
            onSave({
                userName: usuario,
                nombre,
                apellidoPaterno,
                apellidoMaterno,
                sexo,
                correoElectronico,
                posicion
            });
        }
    }, [usuario, nombre, apellidoPaterno, apellidoMaterno, sexo, correoElectronico, posicion, onSave]);

    return (
        <div className={styles.InformacionPersonal}>
            <div className={styles.Title}>
                <h2>Información Personal</h2>
            </div>
            
            <div className={styles.Casillas}>

                <div className={styles.Usuario}>
                    <h3 className={styles.label}>Usuario</h3>
                    <Input
                        type="text"
                        id="Usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        placeholder="Usuario"
                        className={styles.InputUsuario}
                    />
                </div>

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
                    <h3 className={styles.label}>Apellido Paterno</h3>
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

                <div className={styles.Posicion}>
                    <h3 className={styles.label}>Posicion</h3>
                    <Input
                        type="text"
                        id="posicion"
                        value={posicion}
                        onChange={(e) => setPosicion(e.target.value)}
                        placeholder="Posicion"
                        className={styles.InputPosicion}
                    />
                </div>

                <div className={styles.Genero}>
                    <h3 className={styles.label}>Sexo</h3>
                    <div className={styles.generoOptions}>
                        <label className={styles.generoOption}>
                            <Input
                                type="radio"
                                name="sexo"
                                value={sexo}
                                checked={sexo === 'Masculino'}
                                onChange={() => setSexo('Masculino')}
                            />
                            <span className={styles.customRadio}>
                                {sexo === 'Masculino' && <i className={`fa-solid fa-check ${styles.checkIcon}`}></i>}
                            </span>
                            Masculino
                        </label>
                        <label className={styles.generoOption}>
                            <Input
                                type="radio"
                                name="sexo"
                                value={sexo}
                                checked={sexo === 'Femenino'}
                                onChange={() => setSexo('Femenino')}
                            />
                            <span className={styles.customRadio}>
                                {sexo === 'Femenino' && <i className={`fa-solid fa-check ${styles.checkIcon}`}></i>}
                            </span>
                            Femenino
                        </label>
                    </div>
                </div> 

            </div>

        </div>
    );
};

export default InformacionPersonal;