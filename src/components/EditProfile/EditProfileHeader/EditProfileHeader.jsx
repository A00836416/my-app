import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../EditProfileHeader/EditProfileHeader.module.css';

const EditProfileHeader = ({ onSave }) => {
    const navigate = useNavigate();

    const goToSettings = () => {
        navigate('/settings');
    };

    const handleSaveClick = () => {
        if (onSave) {
            onSave();  // Ejecuta la función de guardar cuando se hace clic en el botón
        }
    };

    return (
        <div className={styles.EditProfileHeader}>
            <div className={styles.TabBarEditProfileHeader}>
                <button className={styles.goToSettingsButton} onClick={goToSettings}>
                    <i className="fas fa-angle-left"></i>
                </button>
                <h1 className={styles.EditProfileTitle}>Edit Profile</h1>
                <button className={styles.GuardarDatos} onClick={handleSaveClick}>
                    <h2>Guardar</h2>
                </button>
            </div>
        </div>
    );
};

export default EditProfileHeader;
