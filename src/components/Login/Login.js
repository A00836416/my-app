
import React, { useState } from 'react';
import { login } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Button from '../shared/Button/Button';
import Input from '../shared/InputLogin/Input';
import styles from './Login.module.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/home');
        } catch (err) {
            setError('Credenciales inválidas');
        }
    };

    return (
        <div className={styles.SignUp}>
            <div className={styles.loginBack}>
                <div className={styles.loginForm}>
                    <h2 className={styles.title}>Login</h2>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    <form onSubmit={handleLogin}>

                        <label htmlFor="username" className={styles.label}>Email</label>
                        <Input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Value"
                        />

                        <label htmlFor="password" className={styles.label}>Contraseña</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Value"
                        />
                        <Button type="submit">Log In</Button>

                        <a href="/link" className={styles.link}>Forgot password?</a>
                    </form>
                    
                        
                    
                    
                    
                    
                </div>
                
            </div>
            <footer>Need an account?  <a href="/link">Sign up here</a></footer>
        </div>
    );
};

export default Login;