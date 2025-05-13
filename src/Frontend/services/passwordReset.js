// Servicio para manejo de recuperación de contraseña
const URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:3001';

/**
 * Envía un correo electrónico con un código de verificación para recuperar la contraseña
 * @param {string} email - Correo electrónico del usuario
 * @returns {Promise}
 */
export async function sendVerificationEmail(email) {
    try {
        const response = await fetch(`${URL}/api/reset-password/request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al enviar el correo');
        }

        return data;
    } catch (error) {
        console.error('Error en sendVerificationEmail:', error);
        throw error;
    }
}

/**
 * Verifica el código enviado al correo electrónico
 * @param {string} email - Correo electrónico del usuario
 * @param {string} code - Código de verificación
 * @returns {Promise}
 */
export async function verifyCode(email, code) {
    try {
        const response = await fetch(`${URL}/api/reset-password/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, code })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Código de verificación inválido');
        }

        return data;
    } catch (error) {
        console.error('Error en verifyCode:', error);
        throw error;
    }
}

/**
 * Restablece la contraseña del usuario
 * @param {string} email - Correo electrónico del usuario
 * @param {string} code - Código de verificación
 * @param {string} newPassword - Nueva contraseña
 * @returns {Promise}
 */
export async function resetPassword(email, code, newPassword) {
    try {
        const response = await fetch(`${URL}/api/reset-password/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                email, 
                code, // El backend espera 'code'
                newPassword // El backend espera 'newPassword'
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al cambiar la contraseña');
        }

        return data;
    } catch (error) {
        console.error('Error en resetPassword:', error);
        throw error;
    }
}