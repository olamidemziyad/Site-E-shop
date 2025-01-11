import React from "react";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../services/stripeService";
import PaymentForm from "./PayementForm";

const PaymentPage = () => {
  const location = useLocation();
  const { product } = location.state || {};

  if (!product) {
    return <div>Produit introuvable !</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {<h1 className="text-2xl font-bold mb-4">Page de Paiement</h1>}
      <div className="flex items-center gap-4">
        <img
          src={product.imageUrl || "https://via.placeholder.com/150"}
          alt={product.name}
          className="w-24 h-24 object-cover rounded"
        />
        <div>
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-lg font-bold text-red-600">
            {product.price} FCFA
          </p>
        </div>
      </div>
      <Elements stripe={stripePromise}>
        <PaymentForm product={product} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
