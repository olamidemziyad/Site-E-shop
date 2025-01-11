// controllers/cartController.js
const Cart = require('../Models/Cart');
const Product = require('../Models/Product');

// Ajoute un produit au panier
exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Vérifie si le produit existe
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: "Produit non trouvé." });
        }

        // Vérifie si le produit est déjà dans le panier de l'utilisateur
        let cartItem = await Cart.findOne({
            where: { userId, productId }
        });

        if (cartItem) {
            // Si le produit est déjà dans le panier, on met à jour la quantité
            cartItem.quantity += quantity;
            cartItem.totalPrice = cartItem.quantity * product.price;
            await cartItem.save();
            return res.status(200).json({ message: 'Produit mis à jour dans le panier', data: cartItem });
        }

        // Sinon, on ajoute le produit dans le panier
        cartItem = await Cart.create({
            userId,
            productId,
            quantity,
            totalPrice: product.price * quantity,
        });

        return res.status(201).json({
            message: 'Produit ajouté au panier avec succès.',
            data: cartItem
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de l'ajout au panier." });
    }
};

// Récupère tous les produits d'un panier pour un utilisateur
exports.getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        // Récupère les produits du panier de l'utilisateur
        const cartItems = await Cart.findAll({
            where: { userId },
            include: [{
                model: Product,
                as: 'products', // Utilisez l'alias que vous avez défini dans l'association
                attributes: ['id', 'name', 'price', 'description'] // Choisir les attributs nécessaires
            }]
        });

        if (cartItems.length === 0) {
            return res.status(404).json({ message: "Le panier est vide." });
        }

        return res.status(200).json({
            message: "Panier récupéré avec succès.",
            data: cartItems
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération du panier." });
    }
};
