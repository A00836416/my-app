import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Carro1 from '../../../images/profile/kiacarro1.png';
import Carro2 from '../../../images/profile/kiacarro2.png';
import Carro3 from '../../../images/profile/kiacarro3.png';
import { message } from 'antd';
import { updateProfilePicture } from '../../../services/api'; 
import styles from '../SettingsHeader/SettingsHeader.module.css';
import { useEffect } from 'react';

// Lista de imágenes disponibles
const profileImages = [
    { src: Carro1, className: styles.Carro1 },
    { src: Carro2, className: styles.Carro2 },
    { src: Carro3, className: styles.Carro3 },
];

const SettingsHeader = ({ initialImage, employeeData }) => {
    const navigate = useNavigate();
    const [profilePicIndex, setProfilePicIndex] = useState(0); // Controla el índice de la imagen seleccionada
    const [showEditOptions, setShowEditOptions] = useState(false); 
    const [isSaving, setIsSaving] = useState(false); // Estado para manejar el guardado


    useEffect(() => {
        const initialIndex = profileImages.findIndex((value) => value.src === initialImage);
    
     
        if (initialIndex !== -1) {
            setProfilePicIndex(initialIndex);
        } else {
            setProfilePicIndex(0); 
        }
    
        console.log("Indice inicial de la imagen:", initialIndex);
    }, [initialImage]);
    

    
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

    const handleSaveProfilePic = async () => {
        setIsSaving(true); // Muestra que está guardando
        const selectedImage = profileImages[profilePicIndex].src; // Obtiene la imagen seleccionada

        try {
            // Llamar a la API para actualizar la imagen de perfil
            const data = await updateProfilePicture(selectedImage);

            console.log('Imagen de perfil actualizada correctamente:', data);
            message.success('Imagen de perfil actualizada');
        } catch (error) {
            console.error('Error al actualizar la imagen de perfil:', error);
            message.error('Error al actualizar');
        } finally {
            setIsSaving(false); // Oculta el estado de guardado
            setShowEditOptions(false); // Salir del modo de edición
        }
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
                {showEditOptions && (
                    <div className={styles.PrevEdit}>
                        <button className={styles.PrevButton} onClick={handlePrevPic}>
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                    </div>
                )}

                <div className={styles.ProfilePicEdit}>
                    <img
                        src={profileImages[profilePicIndex].src}
                        alt="foto perfil"
                        className={profileImages[profilePicIndex].className}
                    />
                </div>

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
                        isSaving ? (
                            <span>Guardando...</span> // Muestra estado de guardado
                        ) : (
                            <i className="fa-solid fa-check" onClick={handleSaveProfilePic}></i> // Botón de "Aceptar" y guardar
                        )
                    ) : (
                        <i className="fa-solid fa-pencil"></i> // Botón de "Editar"
                    )}
                </button>
            </div>
        </div>
    );
};

export default SettingsHeader;
