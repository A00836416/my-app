import React from 'react';
import styles from '../ProfilePage/ProfilePage.module.css';
import ProfileHeader from '../../components/Profile/ProfileHeader/ProfileHeader';
import ProfileTareas from '../../components/Profile/ProfileTareas/ProfileTareas';
import ProfileLogros from '../../components/Profile/ProfileLogros/ProfileLogros';
import '@fortawesome/fontawesome-free/css/all.css';


const ProfilePage = () => {
    return(
        <div className={styles.ProfileContainer}>
            <ProfileHeader></ProfileHeader>
            <ProfileTareas></ProfileTareas>
            <ProfileLogros></ProfileLogros>
        </div>


    );



};

export default ProfilePage;