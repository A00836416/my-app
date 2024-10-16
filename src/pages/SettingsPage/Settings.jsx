import React, { useEffect, useState } from 'react';
import styles from '../SettingsPage/Settings.module.css';
import SettingsHeader from '../../components/Settingss/SettingsHeader/SettingsHeader';
import SettingsOptions from '../../components/Settingss/SettingsOptions/SettingsOptions';
import { getUserInfo } from '../../services/api'; // Función que obtiene datos del empleado

const SettingsPage = () => {
    const initialProfileImage = '/static/media/kiacarro3.950c68ff6334e1b067fd.png';

      // New state for employee data
      const [employeeData, setEmployeeData] = useState({
        name: '',
        level: 0,
        progress: 0,
        fotoPerfil: '/static/media/kiacarro3.950c68ff6334e1b067fd.png'
    });

    // Simulated API call
    useEffect(() => {
        const fetchEmployeeData = async () => {
    
            const data = await getUserInfo();
            console.log(data);
            
            setEmployeeData(data);
            console.log(employeeData.fotoPerfil)
        };

        fetchEmployeeData();
    }, []);



    return (
        <div className={styles.container}>
            <SettingsHeader initialImage={employeeData.fotoPerfil ?? initialProfileImage} employeeData={employeeData} />
            <SettingsOptions />
        </div>
    );
};

export default SettingsPage;
