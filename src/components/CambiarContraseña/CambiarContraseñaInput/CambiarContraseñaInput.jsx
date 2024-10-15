import React, {useState} from 'react';
import styles from '../CambiarContraseñaInput/CambiarContraseñaInput.module.css';
import Input from '../../../components/shared/InputLogin/Input';
import { message } from 'antd';
import { changePassword } from '../../../services/api';

const CambiarContraseñaInput = () =>{
    
    const [contrasena, setContrasena] = useState('');
    const [contrasenaActual, setContrasenaActual] = useState('');

    const handleChangePassword = async () => {
        try {
            console.log("Contraseña actual:", contrasenaActual)
            console.log("Contraseña enviada:", contrasena);
            await changePassword({
                currentPassword: contrasenaActual,
                newPassword: contrasena // Envía la nueva contraseña
            });
            message.success('Contraseña actualizada exitosamente');
            
        } catch (error) {
            console.error("Error al actualizar la contraseña:", error);
            message.error('Error al actualizar contraseña');
        }
    };
    


    return(
        <div className={styles.CambiarContraseñaInput}>
            <div className={styles.Instruccion}>
                <h3>Introduce la contraseña que quieres establecer para tu cuenta.</h3>
            </div>

            <div className={styles.ContraseñaActual}>
                <h3 className={styles.label}>Contraseña actual</h3>
                <Input
                    type="text"
                    id="ContraseñaActual"
                    value={contrasenaActual}
                    onChange={(e) => setContrasenaActual(e.target.value)}
                    placeholder="Contraseña Actual"
                    className={styles.InputContraseñaActual}
                />
            </div>

            <div className={styles.NuevaContraseña}>
                <h3 className={styles.label}>Nueva contraseña</h3>
                <Input
                    type="text"
                    id="Contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    placeholder="Contraseña"
                    className={styles.InputNuevaContraseña}
                />
            </div>

            <div className={styles.CambiarContraseña}>
                <button className={styles.CambiarContraseñaButton} onClick={handleChangePassword}>
                    <h2>Cambiar contraseña</h2>
                </button>
            </div>
    
        </div>
    );
};

export default CambiarContraseñaInput;