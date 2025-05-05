import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const URL = import.meta.env.VITE_BACKEND_URL;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserFromLocalStorage = async () => {
            const storedToken = localStorage.getItem('token');
            if (!storedToken) {
                setUser(null);
                setLoading(false);
                return;
            }

            // Aquí iría la lógica para validar el token y obtener el usuario
            const response = await fetch(URL + '/api/auth/me', {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                localStorage.removeItem('token');
                setUser(null);
            }
            setLoading(false);
        };

        loadUserFromLocalStorage();
    }, []);

    const login = async (credentials) => {
        try {
            const response = await fetch(URL +'/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            
            if (!response.ok) throw new Error('Error de autenticación');
            
            const data = await response.json();
            setUser(data.user);
            localStorage.setItem('token', data.token);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const hasRole = (requiredRoles) => {
        if (!user || !user.roles) return false;
        if (typeof requiredRoles === "string") {
            return user.roles.includes(requiredRoles);
        }
        return requiredRoles.some(role => user.roles.includes(role));
    };

    const register = async (userData) => {
        const response = await fetch(URL + '/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            setUser(data.user);
        }
        return data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider 
            value={{ user, loading, login, register, logout, hasRole }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); 