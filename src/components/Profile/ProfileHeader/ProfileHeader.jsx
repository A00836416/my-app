import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../App';
import styles from './ProfileHeader.module.css';
import FotoPerfil from '../ProfileHeader/img/cars.png';

const ProfileHeader = () => {
    const { setAuthState } = useContext(AuthContext);
    const navigate = useNavigate(); // Inicializa el hook useNavigate
    const [profilePic, setProfilePic] = useState(FotoPerfil); // Estado para manejar la imagen de perfil
    const fileInputRef = React.useRef(null); // Referencia al input file

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

    const goLogin = () => {
        setAuthState({
            isAuthenticated: false,
            userRole: null,
            userId: null,
            user: null,
            loading: false
          });
        navigate('/login');
    };

    return (
        <div className={styles.ProfileHeader}>
            <div className={styles.TabBar}>
                <button className={styles.goToHomebutton} onClick={goToHome}>
                    <i className="fas fa-angle-left"></i>
                </button>
                <h1 className={styles.HomeTitle}>Profile</h1>
                <button className={styles.LogOut} onClick={goLogin}>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
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
                <p className={styles.Name}>Zara Luna</p>
                <p className={styles.Kian}>Kian</p>
                <div className={styles.ProgressBar}>
                    <div className={styles.Progress}></div>
                </div>
                <p className={styles.Nivel}>Nivel 20</p>
            </div>
        </div>
    );
};

export default ProfileHeader;
