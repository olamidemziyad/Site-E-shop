import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams(); // Récupère la catégorie depuis l'URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `http://localhost:3000/api/products/category/${encodeURIComponent(category)}`
        );
        const data = await response.json();

        if (response.ok) {
          setProducts(data);
        } else {
          setError(data.message || "Erreur lors de la récupération des produits.");
        }
      } catch (err) {
        setError("Erreur lors de la récupération des données.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <i className="text-3xl font-bold text-center mb-6 capitalize">
        Produits de la catégorie : {category}
      </i>

      {loading && <p className="text-center text-gray-500">Chargement...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600">{products.length} results found</p>
          {/* Vous pouvez ajouter des filtres ou des options de tri ici */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-gray-600">Sort By:</label>
            <select
              id="sort"
              className="border rounded-md p-2"
              // Ajouter une gestion pour trier les produits
            >
              <option value="new">New</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <p className="text-center text-gray-500">Aucun produit trouvé.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <Link
            to={`/product/${product.id}`} // Redirige vers la page détaillée du produit
            key={product.id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
          >
            <img
              src={product.imageUrl || "https://via.placeholder.com/150"}
              alt={product.name || "Nom indisponible"}
              className="w-full h-40 object-contain rounded-t-md mb-4"
            />
            <h2 className="text-lg font-bold">{product.name || "Nom indisponible"}</h2>
            <p className="text-green-600 font-semibold">{product.price ? `${product.price} FCFA` : "Prix indisponible"}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
