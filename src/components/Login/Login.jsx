import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import { AuthContext } from '../../App';
import Button from '../shared/Button/Button';
import Input from '../shared/InputLogin/Input';
import styles from './Login.module.css';
import logo from './assets/img/kia-logo-nuevo-blanco-1.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setAuthState } = useContext(AuthContext);

    const decodeToken = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userData = await login(username, password);
            const decodedToken = decodeToken(userData.token);

            if (decodedToken) {
                setAuthState({
                    isAuthenticated: true,
                    userRole: userData.rol,
                    userId: decodedToken.id,
                    user: null,
                    loading: false
                });

                if (userData.rol === 'administrador') {
                    navigate('/admin');
                } else {
                    navigate('/home');
                }
            } else {
                setError('Error al procesar la información de usuario');
            }
        } catch (err) {
            setError('Credenciales inválidas');
        }
    };

    return (
        <div className={styles.SignUp}>
            <img src={logo} alt="Logo de la empresa" />
            <div className={styles.loginBack}>
                <div className={styles.loginForm}>
                    <h2 className={styles.title}>Log In</h2>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    <form onSubmit={handleLogin}>
                        <label htmlFor="username" className={styles.label}>Usuario</label>
                        <Input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                        <label htmlFor="password" className={styles.label}>Contraseña</label>
                        <Input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <Button type="submit">Log In</Button>
                        <a href="/forgot-password" className={styles.link}>Forgot password?</a>
                    </form>
                </div>
            </div>
            <footer>Need an account? <a href="/signup">Sign up here</a></footer>
        </div>
    );
};

export default Login;