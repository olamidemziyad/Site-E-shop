// Importer les modèles individuellement
const Product = require('../Models/Product');
const Review = require('../Models/Review');
const User = require('../Models/User'); // Assurez-vous d'importer User si utilisé dans getReviews

// Ajouter un avis
exports.addReview = async (req, res) => {
    const { userId } = req.user; // Correctement extrait depuis le middleware
    const { productId, rating, reviewText } = req.body;

    console.log("Données extraites du token :", req.user); // Log pour débogage
    console.log("userId utilisé :", userId);

    try {
        // Vérifie si le produit existe
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: "Produit non trouvé." });
        }

        // Ajoute un avis pour le produit
        const review = await Review.create({
            userId, // Utilisateur injecté par le middleware
            productId,
            rating,
            reviewText
        });

        res.status(201).json({ message: "Avis ajouté avec succès.", data: review });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de l'ajout de l'avis." });
    }
};

// Récupérer tous les avis pour un produit
exports.getReviews = async (req, res) => {
    const { productId } = req.params;

    try {
        const reviews = await Review.findAll({
            where: { productId },
            include: [{ model: User }] // Inclure le modèle User pour obtenir les informations de l'utilisateur
        });

        if (reviews.length === 0) {
            return res.status(404).json({ message: "Aucun avis trouvé pour ce produit." });
        }

        res.status(200).json({ data: reviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des avis." });
    }
};