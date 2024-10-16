import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Carro1 from '../../../images/profile/kiacarro1.png';
import Carro2 from '../../../images/profile/kiacarro2.png';
import Carro3 from '../../../images/profile/kiacarro3.png';
import styles from '../SettingsHeader/SettingsHeader.module.css';

// Lista de imágenes disponibles en la carpeta con sus clases específicas
const profileImages = [
    { src: Carro1, className: styles.Carro1 },
    { src: Carro2, className: styles.Carro2 },
    { src: Carro3, className: styles.Carro3 },
];

const SettingsHeader = () => {
    const navigate = useNavigate();
    const [profilePicIndex, setProfilePicIndex] = useState(0); // Controla el índice de la imagen seleccionada
    const [showEditOptions, setShowEditOptions] = useState(false); 

    const goToProfile = () => {
        navigate('/profile'); // Redirige a la página de perfil
    };

    const handleProfilePicClick = () => {
        setShowEditOptions(!showEditOptions); // Alterna la visibilidad del modo de edición
    };

    const handleNextPic = () => {
        setProfilePicIndex((prevIndex) => (prevIndex + 1) % profileImages.length);
    };

    const handlePrevPic = () => {
        setProfilePicIndex((prevIndex) =>
            prevIndex === 0 ? profileImages.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className={styles.SettingsHeader}>
            <div className={styles.TabBarSettings}>
                <button className={styles.goToHomebutton} onClick={goToProfile}>
                    <i className="fas fa-angle-left"></i>
                </button>
                <h1 className={styles.SettingsTitle}>Settings</h1>
            </div>

            <div className={styles.ProfilePicContainer}>
                {/* Flecha de la izquierda */}
                {showEditOptions && (
                    <div className={styles.PrevEdit}>
                        <button className={styles.PrevButton} onClick={handlePrevPic}>
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                    </div>
                )}

                {/* Imagen de perfil */}
                <div className={styles.ProfilePicEdit}>
                    <img
                        src={profileImages[profilePicIndex].src}
                        alt="foto perfil"
                        className={profileImages[profilePicIndex].className}
                    />
                </div>

                {/* Flecha de la derecha */}
                {showEditOptions && (
                    <div className={styles.NextEdit}>
                        <button className={styles.NextButton} onClick={handleNextPic}>
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                )}
            </div>

            <div className={styles.Edit}>
                <button className={styles.EditButton} onClick={handleProfilePicClick}>
                    {showEditOptions ? (
                        <i className="fa-solid fa-check"></i> // Cambia a botón de "Aceptar"
                    ) : (
                        <i className="fa-solid fa-pencil"></i> // Botón de "Editar"
                    )}
                </button>
            </div>
        </div>
    );
};

export default SettingsHeader;
