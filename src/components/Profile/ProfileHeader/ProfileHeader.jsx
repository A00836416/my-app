import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileHeader.module.css';
import Trofeo1 from '../../../images/trofeosPerfil/estatua_bronce_01.png';
import Trofeo2 from '../../../images/trofeosPerfil/estatua_plata_01.png';
import Trofeo3 from '../../../images/trofeosPerfil/estatua_oro_01.png';
import Trofeo4 from '../../../images/trofeosPerfil/estatua_diamante_01(1).png';
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
            console.log("data:", data);
        };

        fetchEmployeeData();
    }, []);

    const goToHome = () => {
        navigate('/home');
    };

    const goToSettings = () => {
        navigate('/settings', { state: { employeeData } });
    };

    // Definir el trofeo basado en la fase
    const renderTrofeo = () => {
        switch (employeeData.faseID) {
            case 1:
                return <img src={Trofeo1} alt="Trofeo Bronce" />;
            case 2:
                return <img src={Trofeo2} alt="Trofeo Plata" />;
            case 3:
                return <img src={Trofeo3} alt="Trofeo Oro" />;
            case 4:
                return <img src={Trofeo4} alt="Trofeo Diamante" />;
            default:
                return null; // No mostrar trofeo en la fase 0
        }
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

            <div className={styles.PerfilUser}>

                <div className={styles.ProfilePic}>
                    <img
                        src={employeeData.fotoPerfil}
                        alt="foto perfil"
                        className={profileImagesClasses[employeeData.fotoPerfil] || styles.defaultProfilePic} 
                    />
                </div>

                

               
                    
                <div className={styles.InfoContainer}>
                    <p className={styles.NombreEmpleado}>{employeeData.nombre} {employeeData.apellidoPaterno} {employeeData.apellidoMaterno}</p>
                    <p className={styles.Kian}>Kian</p>
                    <p className={styles.Name}>{employeeData.userName}</p>
                    <p className={styles.Posicion}>{employeeData.posicion}</p>
                        
                </div>
                
                
            </div>
            
            <div className={styles.ContainerProgress}>
                <div className={styles.InfoFase}>
                    <p className={styles.Nivel}>Fase {employeeData.faseID ?? 0}</p>
                    <div className={styles.ObjectPic}>
                            {renderTrofeo()} {/* Mostrar el trofeo según la fase */}
                    </div>
                </div>
                <div className={styles.LineaProgreso}>
                    <div className={styles.ProgressBar}>
                        <div
                            className={styles.Progress}
                            style={{ width: `${employeeData.porcentajeProgresoFase}%` }}
                        ></div>
                    </div>
                    <h2>{Math.round(employeeData.porcentajeProgresoFase)}%</h2>
                </div>
                
            </div>
            <div className={styles.TitleRecompensas}>
                <h2>Recompensas obtenidas</h2>
            </div>
        </div>
    );
};

export default ProfileHeader;
