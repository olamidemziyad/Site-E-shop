import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productService";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (err) {
        setError("Erreur lors du chargement du produit.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const handleBuyClick = () => {
    navigate("/payment", { state: { product } });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Section principale */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-lg mx-auto">
        {/* Image principale et miniatures */}
        <div>
          <div className="w-full h-96 overflow-hidden rounded-lg">
            <img
              src={product.imageUrl || "https://via.placeholder.com/400"}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex gap-2 mt-4 flex-wrap">
            {[1, 2, 3, 4].map((_, index) => (
              <img
                key={index}
                src={product.imageUrl || "https://via.placeholder.com/100"}
                alt={`Miniature ${index}`}
                className="w-20 h-20 object-contain rounded-lg border"
              />
            ))}
          </div>
        </div>
  
        {/* Informations sur le produit */}
        <div className="max-w-md">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-700 text-sm mb-4">
            {product.description || "Description non disponible."}
          </p>
  
          <p className="text-5xl font-bold text-red-600 mb-4">
            {product.price}
          </p>
  
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-gray-200 px-4 py-2 rounded-full text-sm">
              {product.category || "Catégorie"}
            </span>
          </div>
  
          <button
            onClick={handleBuyClick}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            Acheter
          </button>
        </div>
      </div>
  
      {/* Section détails */}
      <div className="mt-8 max-w-screen-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Détails du produit</h2>
        <table className="w-full border-collapse border border-gray-300">
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Marque</td>
              <td className="border border-gray-300 px-4 py-2">
                {product.brand || "Non spécifié"}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Modèle</td>
              <td className="border border-gray-300 px-4 py-2">
                {product.model || "Non spécifié"}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Stock</td>
              <td className="border border-gray-300 px-4 py-2">
                {product.stockQuantity || "Non spécifié"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
  
  
};

export default ProductDetail;
