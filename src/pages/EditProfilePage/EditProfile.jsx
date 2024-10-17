import React, { useState } from 'react';
import styles from '../EditProfilePage/EditProfile.module.css';
import EditProfileHeader from '../../components/EditProfile/EditProfileHeader/EditProfileHeader';
import InformacionPersonal from '../../components/EditProfile/InformacionPersonal/InformacionPersonal';
import { message } from 'antd';
import { updateUserInfo } from '../../services/api';

const EditProfilePage = () => {
    const [userInfo, setUserInfo] = useState(null);

    const handleSaveUserInfo = async () => {
        try {
            // Guardar la información del usuario en la API
            if (userInfo) {
                console.log('Datos:', userInfo);
                await updateUserInfo(userInfo);
                message.success('Información guardada exitosamente');
            } else {
                message.error('No hay información para guardar');
            }
        } catch (error) {
            console.error('Error al guardar la información:', error);
        }
    };

    return (
        <div className={styles.container}>
            <EditProfileHeader onSave={handleSaveUserInfo} />
            <InformacionPersonal onSave={setUserInfo} /> {/* Actualiza userInfo cada vez que cambia */}
        </div>
    );
};

export default EditProfilePage;
