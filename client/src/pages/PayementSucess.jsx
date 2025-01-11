import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="container mx-auto text-center py-10">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Paiement effectué avec succès !</h1>
      <p className="text-lg mb-8">Merci pour votre achat.</p>
      <Link
        to="/home"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Plus d'articles ?
      </Link>
    </div>
  );
};

export default PaymentSuccess;
