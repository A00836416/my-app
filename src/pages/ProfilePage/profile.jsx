import React, { useState, useEffect, useContext } from 'react';
import styles from '../ProfilePage/ProfilePage.module.css';
import ProfileHeader from '../../components/Profile/ProfileHeader/ProfileHeader';
import ProfileTareas from '../../components/Profile/ProfileTareas/ProfileTareas';
import ProfileLogros from '../../components/Profile/ProfileLogros/ProfileLogros';


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