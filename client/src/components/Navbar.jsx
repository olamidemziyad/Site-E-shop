import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // État pour le texte de recherche
  const [searchResults, setSearchResults] = useState([]); // Résultats de recherche
  const [isSearching, setIsSearching] = useState(false); // Indicateur de chargement
  const [error, setError] = useState(null); // État pour les erreurs

  // Fonction pour effectuer une recherche
  const handleSearch = async () => {
    const normalizedQuery = searchQuery
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  
    try {
      setIsSearching(true);
      setError(null); // Réinitialiser les erreurs
  
      const response = await fetch(
        `http://localhost:3000/api/search?query=${encodeURIComponent(normalizedQuery)}`
      );
      const data = await response.json();
  
      if (response.ok) {
        if (Array.isArray(data)) {
          setSearchResults(data); // Cas où tous les produits sont retournés
        } else {
          setSearchResults(data.products || []);
        }
      } else {
        setError(data.message || "Erreur lors de la recherche.");
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
      setError("Erreur lors de la récupération des résultats.");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };
  
  
  
  

  return (
    <nav className="bg-white shadow fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-0">
        {/* Logo */}
        <div>
          <Link to="/home">
            <img src={logo} alt="EcoShop Logo" className="h-10" width={100} />
          </Link>
        </div>

        {/* Hamburger Icon (Visible on small screens) */}
        <button
          className="md:hidden flex items-center text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:items-center md:justify-between w-full md:w-auto`}
        >
          <div className="flex flex-col md:flex-row md:space-x-8 p-4 md:p-0">
          <Link to="/category/beaute" className="text-gray-700 py-2 md:py-0">
               Beauty
          </Link>
            <Link to="/category/sante" className="text-gray-700 py-2 md:py-0">
              Health Care
            </Link>
            <Link to="category/electronique" className="text-gray-700 py-2 md:py-0">
              Electronics
            </Link>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative hidden md:flex items-center">
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded px-4 py-2 w-64"
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.9 14.32a8 8 0 111.414-1.414l3.387 3.387a1 1 0 01-1.414 1.414l-3.387-3.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Affichage des résultats */}
          <div className="absolute left-0 mt-10 w-64">
  {isSearching && <div className="text-gray-500">Recherche en cours...</div>}

  {error && <div className="text-red-500 mt-2">{error}</div>}

  {!isSearching && searchResults.length === 0 && searchQuery && (
    <div className="text-gray-500 mt-2">Aucun produit trouvé.</div>
  )}

  {searchResults.length > 0 && (
    <ul className="bg-white border rounded shadow-lg max-h-64 overflow-y-auto z-10">
      {searchResults.map((product) => (
        <li key={product.id} className="p-2 hover:bg-gray-100">
          <Link to={`/product/${product.id}`}>
            <span className="font-semibold">{product.name}</span>
            <p className="text-sm text-gray-500">{product.category}</p>
          </Link>
        </li>
      ))}
    </ul>
  )}
</div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
