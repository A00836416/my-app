import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../App';
import styles from './ProfileHeader.module.css';
import FotoPerfil from '../ProfileHeader/img/cars.png';
import { logout, getUserInfo } from '../../../services/api';
import { message } from 'antd';


const ProfileHeader = () => {
    const { setAuthState } = useContext(AuthContext);
    const navigate = useNavigate(); // Inicializa el hook useNavigate
    const [profilePic, setProfilePic] = useState(FotoPerfil); // Estado para manejar la imagen de perfil
    const fileInputRef = React.useRef(null); // Referencia al input file

    // New state for employee data
    const [employeeData, setEmployeeData] = useState({
        name: '',
        level: 0,
        progress: 0
    });

    // Simulated API call
    useEffect(() => {
        const fetchEmployeeData = async () => {
    
            const data = await getUserInfo();
            
            setEmployeeData(data);
        };

        fetchEmployeeData();
    }, []);



    // Manejador de la imagen seleccionada
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Crear una URL temporal para la imagen
            setProfilePic(imageUrl); // Establece la imagen seleccionada como la nueva foto de perfil
        }
    };

    // Función para simular el clic en el input file cuando se hace clic en la imagen
    const handleProfilePicClick = () => {
        fileInputRef.current.click(); // Simula el clic en el input de tipo file
    };

    const goToHome = () => {
        navigate('/home'); // Redirige a la página de inicio
    };

    const handleLogout = async () => {
        try {
            await logout();
            message.success('Sesión cerrada exitosamente');
            setAuthState({ isAuthenticated: false, userRole: null, userId: null, user: null });
            navigate('/login');
        } catch (error) {
            message.error('Error al cerrar sesión');
        }
    };

    const goToSettings = () => {
        navigate('/settings');
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
            <div className={styles.ProfilePic} onClick={handleProfilePicClick}>
                <img src={profilePic} alt="foto perfil" />
                {/* Input para cambiar la imagen de perfil (oculto) */}
                <input
                    type="file"
                    accept="image/*"
                    className={styles.FileInput}
                    ref={fileInputRef} // Asigna la referencia al input
                    onChange={handleImageChange}
                    style={{ display: 'none' }} // Oculta el input
                />
            </div>
            <div className={styles.EmployeeLevel}>
                <p className={styles.Name}>{employeeData.userName}</p>
                <p className={styles.Kian}>Kian</p>
                <div className={styles.ProgressBar}>
                    <div className={styles.Progress} style={{ width: `${employeeData.experienciaTotal}%` }}></div>
                </div>
                <p className={styles.Nivel}>Nivel {employeeData.numeroNivel}</p>
            </div>
        </div>
    );
};

export default ProfileHeader;
