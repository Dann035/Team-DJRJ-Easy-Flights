// Servicio para manejo de recuperación de contraseña
const URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:3001';

// Almacén temporal para códigos de verificación (solo para desarrollo)
const verificationCodes = new Map();

// Determinar si estamos en modo desarrollo
const isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development';

/**
 * Envía un correo electrónico con un código de verificación para recuperar la contraseña
 * @param {string} email - Correo electrónico del usuario
 * @returns {Promise}
 */
export async function sendVerificationEmail(email) {
    if (isDevelopment) {
        return sendVerificationEmailMock(email);
    }
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
    if (isDevelopment) {
        return verifyCodeMock(email, code);
    }
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
    if (isDevelopment) {
        try {
            await verifyCodeMock(email, code);
        } catch (error) {
            throw new Error('Código de verificación inválido');
        }
    }
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

        if (isDevelopment) {
            verificationCodes.delete(email);
        }

        return data;
    } catch (error) {
        console.error('Error en resetPassword:', error);
        throw error;
    }
}

// Implementaciones simuladas para desarrollo

async function sendVerificationEmailMock(email) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    verificationCodes.set(email, code);
    console.log(`[DESARROLLO] Código de verificación para ${email}: ${code}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    return { 
        status: 'OK',
        message: "Correo enviado correctamente (simulado)" 
    };
}

async function verifyCodeMock(email, code) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const storedCode = verificationCodes.get(email);
    if (!storedCode) {
        throw new Error('No se ha solicitado un código para este correo');
    }
    if (storedCode !== code) {
        throw new Error('Código de verificación inválido');
    }
    return { 
        status: 'OK',
        message: "Código verificado correctamente"
    };
}