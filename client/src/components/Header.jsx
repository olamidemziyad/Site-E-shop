import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Header = () => {
  const { user, setUser } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprimez le token du stockage local
    setUser(null); // Réinitialise l'utilisateur
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm">Bienvenue, {user.name}</span>
              <button
                onClick={handleLogout}
                className="text-sm bg-red-500 px-2 py-1 rounded"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/sign-in" className="text-sm">
                Sign In
              </Link>
              <Link to="/login" className="text-sm">
                Log In
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
