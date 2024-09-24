import React, { useState, useEffect, useContext } from 'react';
import styles from '../ProfilePage/ProfilePage.module.css';
import ProfileHeader from '../../components/Profile/ProfileHeader/ProfileHeader';
import ProfileTareas from '../../components/Profile/ProfileTareas/ProfileTareas';


const ProfilePage = () => {
    return(
        <div className={styles.ProfileContainer}>
            <ProfileHeader></ProfileHeader>
            <ProfileTareas></ProfileTareas>

        </div>


    );



};

export default ProfilePage;