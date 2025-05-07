import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'; // Asegúrate de tener esta variable

export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error('No se encuentra el token');
    }

    const response = await axios.post(`${API_URL}/api/auth/me`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.user;
  } catch (error) {
    console.error('Error fetching user profile', error);
    throw error;
  }
};