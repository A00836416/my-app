import React, { useState, useEffect } from 'react';

const UnityGame = () => {
    const [isUnityAvailable, setIsUnityAvailable] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [debugInfo, setDebugInfo] = useState('');

    useEffect(() => {
        const checkUnityAvailability = async () => {
            try {
                const response = await fetch('http://localhost:3002/game');
                setDebugInfo(`Response status: ${response.status}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const html = await response.text();
                setDebugInfo(prevInfo => `${prevInfo}\nResponse content: ${html.substring(0, 100)}...`);

                if (html.includes('Unity') || html.includes('UnityLoader')) {
                    setIsUnityAvailable(true);
                } else {
                    setIsUnityAvailable(false);
                    setErrorMessage('El contenido no parece ser un juego de Unity');
                }
            } catch (error) {
                setIsUnityAvailable(false);
                setErrorMessage(`Error al cargar el juego: ${error.message}`);
                setDebugInfo(prevInfo => `${prevInfo}\nError: ${error.toString()}`);
            }
        };

        checkUnityAvailability();
    }, []);

    if (!isUnityAvailable) {
        return (
            <div>
                <p>El juego de Unity no está disponible en este servidor.</p>
                <p>Error: {errorMessage}</p>
                <details>
                    <summary>Información de depuración</summary>
                    <pre>{debugInfo}</pre>
                </details>
            </div>
        );
    }

    return (
        <div>
            <iframe
                title="Unity Game"
                src="http://localhost:3002/unity"
                style={{ width: '100%', height: '100vh', border: 'none' }}
            ></iframe>
        </div>
    );
};

export default UnityGame;