import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productService";

const ProductGrid = ({ title }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getProducts();
        console.log("Données reçues de l'API :", response);

        // Adaptez ici pour extraire `data`
        if (response && Array.isArray(response.data)) {
          setProducts(response.data); // Utilisez la clé `data` pour récupérer les produits
        } else {
          setProducts([]); // Aucun produit
        }
      } catch (error) {
        console.error("Erreur :", error);
        setError("Impossible de charger les produits.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <div>Chargement des produits...</div>;
  }

  if (error) {
    return <div className="text-red-500">Erreur : {error}</div>;
  }

  if (!products.length) {
    return <div>Aucun produit disponible pour le moment.</div>;
  }

   // Limiter le nombre de produits à 12
   const limitedProducts = products.slice(0, 12);

  return (
    <section className="container mx-auto py-8 px-4 max-w-screen-lg">
      {/* Titre de la section */}
      <h2 className="text-2xl font-bold mb-4 bg-white p-3 rounded-md text-center shadow">
        {title}
      </h2>
  
      {/* Grille des produits */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {limitedProducts.map((product) => (
          <Link
            to={`/product/${product.id}`} // Lien dynamique basé sur l'ID du produit
            key={product.id}
            className="border p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-transform duration-300 hover:scale-105"
          >
            {/* Image du produit */}
            <img
              src={product.imageUrl || "https://via.placeholder.com/150"}
              alt={product.name || "Nom indisponible"}
              className="w-full h-48 object-contain rounded-md"
            />
  
            {/* Nom du produit */}
            <h3 className="text-sm mt-2 font-semibold text-gray-800">
              {product.name || "Nom indisponible"}
            </h3>
  
            {/* Prix du produit */}
            <p className="text-lg font-bold text-gray-900">
              {product.price ? `${product.price} FCFA` : "Prix non disponible"}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
  
};

export default ProductGrid;
