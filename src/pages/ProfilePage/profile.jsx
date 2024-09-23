import React, { useState, useEffect, useContext } from 'react';
import styles from '../ProfilePage/ProfilePage.module.css';
import ProfileHeader from '../../components/Profile/ProfileHeader/ProfileHeader';


const ProfilePage = () => {
    return(
        <div className={styles.ProfileContainer}>
            <ProfileHeader></ProfileHeader>

        </div>


    );



};

export default ProfilePage;