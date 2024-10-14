import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../EditProfileHeader/EditProfileHeader.module.css';

const EditProfileHeader = () =>{
    const navigate = useNavigate();
    const goToSettings = () =>{
        navigate('/settings');
    };

    return(
        <div className={styles.EditProfileHeader}>
            <div className={styles.TabBarEditProfileHeader}>
                <button className={styles.goToSettingsButton} onClick={goToSettings}>
                    <i className="fas fa-angle-left"></i>
                </button>
                <h1 className={styles.EditProfileTitle}>Edit Profile</h1>
                <button className={styles.GuardarDatos}>
                    <h2>Guardar</h2>
                </button>
            </div>

        </div>
    );
};

export default EditProfileHeader;