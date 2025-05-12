const URL = import.meta.env.VITE_BACKEND_URL;

export async function signupUser(formData){
    try {
        const res = await fetch(`${URL}/api/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (!res.ok) {
            // Handle server error responses
            return { status: 'ERROR', message: data.message || 'Error al registrar el usuario' };
        }
        return { status: 'OK', message: 'Usuario creado correctamente' };
    } catch (error) {
        // Better error handling
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('Error de conexión con el servidor. Verifique la configuración CORS.');
        }
        
    }
}

export async function signupCompany(formData){
    try {
        const res = await fetch(`${URL}/api/signup/company`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await res.json();
        
        if (!res.ok) {
            return { status: 'ERROR', message: data.msg || 'Error al registrar la compañía' };
        }
        
        return { status: 'OK', message: 'Compañía creada correctamente' };
    } catch (error) {
        // Better error handling
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            console.error('Error de red o CORS:', error);
            throw new Error('Error de conexión con el servidor. Verifique la configuración CORS.');
        }
        
        console.error('Error en signupCompany:', error);
        throw error;
    }
}

export const verifyToken = async (token) => {
    try {
        const res = await fetch(`${URL}/api/protected`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await res.json();
        
        if (!res.ok) {
            throw new Error(data.message || 'Error de autenticación');
        }
        
        return { status: 'OK', message: 'Access Allowed', data };
    } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            console.error('Error de red o CORS:', error);
            throw new Error('Error de conexión con el servidor. Verifique la configuración CORS.');
        }
        
        console.error('Error en verifyToken:', error);
        throw error;
    }
}
