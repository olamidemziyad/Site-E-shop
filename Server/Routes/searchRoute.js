// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const { searchProducts } = require("../controllers/productController");

// Route pour rechercher des produits
router.get("/search", searchProducts);

module.exports = router;


