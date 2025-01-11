const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);  // Utilise la clé secrète de Stripe

exports.createPaymentIntent = async (req, res) => {
    const { amount } = req.body; // Montant du paiement (en cents)
    
    try {
        // Crée un paiement intent avec le montant
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Le montant en cents (ex. 500 pour 5.00 USD)
            currency: 'usd', // Devise, ici en USD
        });

        // Renvoie le client secret pour le paiement
        res.status(200).json({
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création du paiement' });
    }
};
