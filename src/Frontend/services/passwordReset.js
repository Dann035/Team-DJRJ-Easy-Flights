// Servicio para manejo de recuperación de contraseña
const URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:3001';

// Almacén temporal para códigos de verificación (solo para desarrollo)
const verificationCodes = new Map();

// Determinar si estamos en modo desarrollo
const isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development';

/**
 * Envía un correo electrónico con un código de verificación para recuperar la contraseña
 * @param {string} email - Correo electrónico del usuario
 * @returns {Promise} - Promesa que resuelve si el correo fue enviado correctamente
 */
export async function sendVerificationEmail(email) {
    // Siempre usar la implementación simulada para el envío de correos
    return sendVerificationEmailMock(email);
}

/**
 * Verifica el código enviado al correo electrónico
 * @param {string} email - Correo electrónico del usuario
 * @param {string} code - Código de verificación
 * @returns {Promise} - Promesa que resuelve si el código es válido
 */
export async function verifyCode(email, code) {
    // Si estamos en desarrollo, usar la implementación simulada
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
 * @param {string} code - Código de verificación (para validación)
 * @param {string} newPassword - Nueva contraseña
 * @returns {Promise} - Promesa que resuelve si la contraseña fue cambiada correctamente
 */
export async function resetPassword(email, code, newPassword) {
    // Si estamos en desarrollo, verificar el código primero
    if (isDevelopment) {
        try {
            // Verificar el código antes de cambiar la contraseña
            await verifyCodeMock(email, code);
        } catch (error) {
            throw new Error('Código de verificación inválido');
        }
    }
    
    try {
        // Usar PATCH para actualizar solo la contraseña
        const response = await fetch(`${URL}/api/users/password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                email, 
                newPassword,
                verificationCode: code // Incluir el código para verificación en el backend
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al cambiar la contraseña');
        }

        // Limpiar el código de verificación después de un cambio exitoso
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

/**
 * Versión simulada de envío de correo con código de verificación
 * @param {string} email - Correo electrónico del usuario
 * @returns {Promise} - Promesa simulada
 */
async function sendVerificationEmailMock(email) {
    // Generar código aleatorio de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Almacenar código para verificación posterior
    verificationCodes.set(email, code);
    
    console.log(`[DESARROLLO] Código de verificación para ${email}: ${code}`);
    
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simular respuesta exitosa
    return { 
        status: 'OK',
        message: "Correo enviado correctamente (simulado)" 
    };
}

/**
 * Versión simulada de verificación de código
 * @param {string} email - Correo electrónico del usuario
 * @param {string} code - Código de verificación
 * @returns {Promise} - Promesa simulada
 */
async function verifyCodeMock(email, code) {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Verificar si el código es correcto
    const storedCode = verificationCodes.get(email);
    
    if (!storedCode) {
        throw new Error('No se ha solicitado un código para este correo');
    }
    
    if (storedCode !== code) {
        throw new Error('Código de verificación inválido');
    }
    
    // Simular respuesta exitosa
    return { 
        status: 'OK',
        message: "Código verificado correctamente"
    };
}