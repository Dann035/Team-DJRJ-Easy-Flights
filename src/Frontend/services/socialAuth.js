// Servicio para manejar la autenticación con redes sociales

/**
 * Procesa la respuesta de autenticación de redes sociales
 * @param {Object} userData - Datos del usuario autenticado
 * @returns {Object} - Datos del usuario procesados
 */
export const processSocialAuthResponse = (userData) => {
    // Guardar token en localStorage o donde corresponda
    if (userData.token) {
        localStorage.setItem('authToken', userData.token);
    }
    
    return userData;
};

/**
 * Verifica si hay un token de autenticación en la URL (para redirecciones OAuth)
 * @returns {boolean} - True si se encontró y procesó un token
 */
export const checkAuthRedirect = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const error = urlParams.get('error');
    
    if (error) {
        console.error("Error en autenticación:", error);
        alert("Error en la autenticación: " + error);
        return false;
    }
    
    if (token) {
        localStorage.setItem('authToken', token);
        // Limpiar la URL para eliminar el token
        window.history.replaceState({}, document.title, window.location.pathname);
        return true;
    }
    
    return false;
};