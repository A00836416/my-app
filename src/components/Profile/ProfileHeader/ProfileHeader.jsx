import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileHeader.module.css';

import FotoObjeto from '../ProfileHeader/img/trofeo2.webp';
import { getUserInfo } from '../../../services/api';



const profileImagesClasses = {
    '/static/media/kiacarro1.e7abeb30524397ac7a5d.png': styles.Carro1,
    '/static/media/kiacarro2.58a01e82ae41d6887358.png': styles.Carro2,
    '/static/media/kiacarro3.950c68ff6334e1b067fd.png': styles.Carro3
    
};

const ProfileHeader = () => {
    const navigate = useNavigate();

    const [employeeData, setEmployeeData] = useState({
        name: '',
        level: 0,
        progress: 0,
        fotoPerfil: '/static/media/kiacarro3.950c68ff6334e1b067fd.png'
    });

    useEffect(() => {
        const fetchEmployeeData = async () => {
            const data = await getUserInfo();
            setEmployeeData(data);
        };

        fetchEmployeeData();
    }, []);

    const goToHome = () => {
        navigate('/home');
    };

    const goToSettings = () => {
        navigate('/settings', { state: { employeeData } });
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
                <img
                    src={employeeData.fotoPerfil}
                    alt="foto perfil"
                    className={profileImagesClasses[employeeData.fotoPerfil] || styles.defaultProfilePic} 
                />
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
                            <div
                                className={styles.Progress}
                                style={{ width: `${employeeData.experienciaTotal}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
