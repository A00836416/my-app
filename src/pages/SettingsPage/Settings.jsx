import React from 'react';
import styles from '../SettingsPage/Settings.module.css';
import SettingsHeader from '../../components/Settingss/SettingsHeader/SettingsHeader';
import SettingsOptions from '../../components/Settingss/SettingsOptions/SettingsOptions';

const SettingsPage = () =>{
    

    return(
        <div className={styles.container}>
            <SettingsHeader></SettingsHeader>
            <SettingsOptions></SettingsOptions>
        </div>
    );
};

export default SettingsPage;