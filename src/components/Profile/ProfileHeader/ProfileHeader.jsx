import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileHeader.module.css';

import FotoObjeto from '../ProfileHeader/img/trofeo2.webp';
import { getUserInfo } from '../../../services/api';



const ProfileHeader = () => {
    
    const navigate = useNavigate(); // Inicializa el hook useNavigate

    // New state for employee data
    const [employeeData, setEmployeeData] = useState({
        name: '',
        level: 0,
        progress: 0,
        fotoPerfil: '/static/media/kiacarro3.950c68ff6334e1b067fd.png'
    });

    // Simulated API call
    useEffect(() => {
        const fetchEmployeeData = async () => {
    
            const data = await getUserInfo();
            console.log(data);
            
            setEmployeeData(data);
        };

        fetchEmployeeData();
    }, []);


    const goToHome = () => {
        navigate('/home'); // Redirige a la página de inicio
    };

    

    const goToSettings = () => {
        navigate('/settings', { state: { employeeData } }) ;
    };

    return (
        <div className={styles.ProfileHeader}>
            <div className={styles.TabBar}>
                <button className={styles.goToHomebutton} onClick={goToHome}>
                    <i className="fas fa-angle-left"></i>
                </button>
                <h1 className={styles.HomeTitle}>Profile</h1>
                <button className={styles.Settings} onClick={goToSettings}>
                    <i className="fa-solid fa-gear"></i>
                </button>
            </div>

            <div className={styles.ProfilePic}>
                <img src={employeeData.fotoPerfil} alt="foto perfil" />
            </div>

            <div className={styles.EmployeeLevel}>
                <p className={styles.Name}>{employeeData.userName}</p>
                <p className={styles.Kian}>Kian</p>
                
                <div className={styles.ProgresoUsuario}>
                    <div className={styles.ObjectPic}>
                        <img src={FotoObjeto} alt="objeto nivel" />
                    </div>

                    <div className={styles.InfoContainer}>
                        <p className={styles.Nivel}>Nivel {employeeData.numeroNivel}</p>
                        <div className={styles.ProgressBar}>
                            <div className={styles.Progress} style={{ width: `${employeeData.experienciaTotal}%` }}></div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default ProfileHeader;
