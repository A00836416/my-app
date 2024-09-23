import React from 'react';
import styles from '../LoginPage/LoginPage.module.css';
import Login from '../../components/Login/Login';



const LoginPage = () => {
    return (
        <div className={styles.LoginContainer}>
            <Login />
        </div>
    );
};

export default LoginPage;