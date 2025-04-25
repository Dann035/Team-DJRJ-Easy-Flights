const URL = import.meta.env.VITE_BACKEND_URL;

export async function signupUser(formData){
    const res = await fetch(`${URL}/api/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    const data = await res.json();
    
    if(data.status !== 'OK'){
        throw new Error('Error al regisrtrar el usuario');
        console.error(res.statusText);
    }
    alert('Usuario creado correctamente');
        return;
}

export async function signupCompany(formData){
    const res = await fetch(`${URL}/api/signup/company`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    const data = await res.json();
    
    if(data.status !== 'OK'){
        throw new Error('Error al regisrtrar la compañia');
        console.error(res.statusText);
    }
    alert('Compañia creada correctamente');
        return;
}

const verifyToken = async (token) => {
    try {
        const res = await fetch(`${URL}protected`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.json();
        alert('Access Allowed');
    } catch (err) {
        console.error(err);
    }
}