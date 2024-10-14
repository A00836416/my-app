import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FotoPerfil from '../../Profile/ProfileHeader/img/cars.png';
import styles from '../SettingsHeader/SettingsHeader.module.css';


const SettingsHeader = () => {
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = useState(FotoPerfil); // Estado para manejar la imagen de perfil
    const fileInputRef = React.useRef(null); // Referencia al input file


    const goToProfile = () => {
        navigate('/profile'); // Redirige a la página de inicio
    };


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Crear una URL temporal para la imagen
            setProfilePic(imageUrl); // Establece la imagen seleccionada como la nueva foto de perfil
        }
    };

    const handleProfilePicClick = () => {
        fileInputRef.current.click(); // Simula el clic en el input de tipo file
    };

    return(
        <div className={styles.SettingsHeader}>

            <div className={styles.TabBarSettings}>
                <button className={styles.goToHomebutton} onClick={goToProfile}>
                    <i className="fas fa-angle-left"></i>
                </button>
                <h1 className={styles.SettingsTitle}>Settings</h1>
            </div>

            <div className={styles.ProfilePicEdit}>
                <img src={profilePic} alt="foto perfil" />
            </div>

            <div className={styles.Edit}>
                <button className={styles.EditButton} onClick={handleProfilePicClick}>
                    <i className="fa-solid fa-pencil"></i>
                </button>
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

        </div>

    );
};

export default SettingsHeader;