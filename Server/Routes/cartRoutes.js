// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/cartController');
const { authenticateToken, requireAdmin } = require('../middlewares/authenticate');


// Route pour ajouter un produit au panier
router.post('/cart', authenticateToken, cartController.addToCart);
//route pour recuperer tout les produit d'un utilisaters
router.get('/cart/:userId', authenticateToken, cartController.getCart);




module.exports = router;
