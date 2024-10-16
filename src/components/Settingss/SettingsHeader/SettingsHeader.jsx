import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Carro1 from '../../../images/profile/kiacarro1.png';
import Carro2 from '../../../images/profile/kiacarro2.png';
import Carro3 from '../../../images/profile/kiacarro3.png';
import styles from '../SettingsHeader/SettingsHeader.module.css';

// Lista de imágenes disponibles en la carpeta con sus clases específicas
const profileImages = [
    { src: Carro1, className: styles.Carro1, optionClass: styles.Option1 },
    { src: Carro2, className: styles.Carro2, optionClass: styles.Option2 },
    { src: Carro3, className: styles.Carro3, optionClass: styles.Option3 },
];

const SettingsHeader = () => {
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = useState(profileImages[0]); 
    const [showImageOptions, setShowImageOptions] = useState(false); 

    const goToProfile = () => {
        navigate('/profile'); // Redirige a la página de perfil
    };

    const handleProfilePicClick = () => {
        setShowImageOptions(!showImageOptions); // Alterna la visibilidad de las opciones de imagen
    };

    const handleImageSelect = (image) => {
        setProfilePic(image); // Cambia la imagen de perfil seleccionada
        setShowImageOptions(false); // Oculta las opciones después de seleccionar una imagen
    };

    return (
        <div className={styles.SettingsHeader}>
            <div className={styles.TabBarSettings}>
                <button className={styles.goToHomebutton} onClick={goToProfile}>
                    <i className="fas fa-angle-left"></i>
                </button>
                <h1 className={styles.SettingsTitle}>Settings</h1>
            </div>

            <div className={styles.ProfilePicEdit}>
                <img src={profilePic.src} alt="foto perfil" className={profilePic.className} />
            </div>

            <div className={styles.Edit}>
                <button className={styles.EditButton} onClick={handleProfilePicClick}>
                    <i className="fa-solid fa-pencil"></i>
                </button>
            </div>

            {/* Mostrar opciones de imágenes si se clickea en el botón de editar */}
            {showImageOptions && (
                <div className={styles.ImageOptions}>
                    {profileImages.map((image, index) => (
                        <img
                            key={index}
                            src={image.src}
                            alt={`profile option ${index + 1}`}
                            className={`${styles.ImageOption} ${image.optionClass}`} // Agregar clase de opción
                            onClick={() => handleImageSelect(image)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SettingsHeader;
