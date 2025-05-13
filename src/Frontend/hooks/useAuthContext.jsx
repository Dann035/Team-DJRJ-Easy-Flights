import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const URL = import.meta.env.VITE_BACKEND_URL;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const userData = localStorage.getItem("user");
        return userData ? JSON.parse(userData) : null;
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserFromLocalStorage = async () => {
            const storedToken = localStorage.getItem('access_token');
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
                localStorage.removeItem('access_token');
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
            localStorage.setItem('access_token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
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
            localStorage.setItem('access_token', data.token);
            setUser(data.user);
        }
        return data;
    };

    const logout = async () => {
        const response = await fetch(URL + '/api/logout',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        const data = await response.json();
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        setUser(null);
        setLoading(false);
        return data;
    };

    return (
        <AuthContext.Provider 
            value={{ user, loading, login, register, logout, hasRole, setUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); 