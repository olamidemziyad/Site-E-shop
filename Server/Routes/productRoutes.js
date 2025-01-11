const express = require('express');
const router = express.Router();
const product = require('../controllers/productController');
const { authenticateToken, requireAdmin } = require('../middlewares/authenticate');
const { getProductsByCategory } = require("../controllers/productController");

// Middleware pour trouver un produit par ID
const { findProductById } = product;

// Route pour ajouter un produit (ADMIN UNIQUEMENT)
router.post('/products/add', authenticateToken, requireAdmin, product.addProduct);

// Route pour récupérer tous les produits
router.get('/products', /*authenticateToken,*/ product.getAllProducts);

// Route pour récupérer un produit via son ID
router.get('/products/:id', /*authenticateToken,*/ findProductById, (req, res) => {
    res.status(200).json({
        message: "Produit récupéré avec succès.",
        data: req.product,
    });
});

// Route pour récupérer les produits par catégorie
router.get("/products/category/:category", getProductsByCategory);

// Route pour mettre à jour un produit (ADMIN UNIQUEMENT)
router.put('/products/:id', authenticateToken, requireAdmin, findProductById, product.updateProduct);

// Route pour supprimer un produit (ADMIN UNIQUEMENT)
router.delete('/products/:id', authenticateToken, requireAdmin, findProductById, product.deleteProduct);



module.exports = router;
