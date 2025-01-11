// src/services/productService.js
const API_URL = 'http://localhost:3000/api/products';

// Fonction pour récupérer les en-têtes d'autorisation
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fonction pour récupérer les produits depuis l'API
export const getProducts = async () => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    // Retourne les données JSON directement
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    throw error;
  }
};

// Fonction pour récupérer les produits depuis l'API via l'ID
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to fetch product');
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération du produit :', error);
    throw error;
  }
};
