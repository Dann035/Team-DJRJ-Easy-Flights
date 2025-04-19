import { useNavigate } from "react-router-dom";


export async function signupUser(formData){
    const res = await fetch('http://127.0.0.1:3001/api/signup', {
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
        useNavigate('/');
        return;
}

