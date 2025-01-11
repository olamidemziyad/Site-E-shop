// src/services/authService.js
const API_URL = 'http://localhost:3000/api/users';

export const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Failed to register');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error('Failed to login');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// src/services/productService.js
const API_URL1 = 'http://localhost:3000/api/products';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getProducts = async () => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
    });
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    throw error;
  }
};
