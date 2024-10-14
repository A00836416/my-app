import React, { useContext } from 'react';
import { AuthContext } from '../../../App';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/api';
import { message } from 'antd';
import styles from '../SettingsOptions/SettingsOptions.module.css';

const SettingsOptions = () => {
    const { setAuthState } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            message.success('Sesión cerrada exitosamente');
            setAuthState({ isAuthenticated: false, userRole: null, userId: null, user: null });
            navigate('/login');
        } catch (error) {
            message.error('Error al cerrar sesión');
        }
    };

    const goToEditProfile = () => {
        navigate('/edit-profile');
    };


    return(
        <div className={styles.OptionsContainer}>
            <div className={styles.EditProfile} onClick={goToEditProfile}>
                <i class="fa-solid fa-user-pen"></i>
                <h2>Editar Perfil</h2>
                <button className={styles.goToEditUser}>
                    <i className="fas fa-angle-right"></i>
                </button>
            </div>

            <div className={styles.Seguridad}>
                <i className="fa-solid fa-lock"></i>
                <h2>Seguridad</h2>
                <button className={styles.goToSeguridad}>
                    <i className="fas fa-angle-right"></i>
                </button>
            </div>

            <div className={styles.LogOut} onClick={handleLogout}>
                
                <button className={styles.LogOutButton}>
                    <h2>Cerrar sesión</h2>
                </button>

            </div>
        </div>

    );
    
};

export default SettingsOptions;