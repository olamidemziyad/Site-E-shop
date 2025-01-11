import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

const PaymentForm = ({ product }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Appel au backend pour créer un PaymentIntent
      const response = await fetch("http://localhost:3000/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: product.price * 100, // En centimes
          currency: "xaf", // Devise
        }),
      });

      if (!response.ok) {
        throw new Error("Échec de la création du PaymentIntent");
      }

      const { clientSecret } = await response.json();

      // Confirmez le paiement côté client
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "Nom du client", // Remplacez par les détails pertinents
          },
        },
      });

      if (error) {
        setError(error.message);
      } else if (paymentIntent.status === "succeeded") {
        // Redirigez vers la page de confirmation
        navigate("/payment-success");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className="mt-6">
      <CardElement className="border p-2 rounded-md" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {loading ? "Traitement..." : "Payer"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default PaymentForm;
