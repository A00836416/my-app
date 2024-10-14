import React from 'react';
import styles from '../EditProfilePage/EditProfile.module.css';
import EditProfileHeader from '../../components/EditProfile/EditProfileHeader/EditProfileHeader';
import InformacionPersonal from '../../components/EditProfile/InformacionPersonal/InformacionPersonal';

const EditProfilePage = () => {

    return(
        <div className={styles.container}>
            <EditProfileHeader></EditProfileHeader>
            <InformacionPersonal></InformacionPersonal>
        </div>
    );
};

export default EditProfilePage;