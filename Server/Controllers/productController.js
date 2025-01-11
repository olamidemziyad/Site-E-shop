const Product = require('../Models/Product');
const { Op } = require('sequelize');

// Contrôleur pour ajouter un produit
exports.addProduct = async (req, res) => {
    try {
        const { name, description, price, category, stockQuantity, brand, model, imageUrl } = req.body;

        const newProduct = await Product.create({
            name,
            description,
            price,
            category,
            stockQuantity,
            brand,
            model,
            imageUrl
        });

        res.status(201).json({
            message: "Produit ajouté avec succès!",
            data: newProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de l'ajout du produit." });
    }
};

// Contrôleur pour récupérer tous les produits avec recherche, filtrage et tri
exports.getAllProducts = async (req, res) => {
    try {
        const { search, category, sort } = req.query; // Récupère les paramètres de requête
        const whereClause = {};

        // Ajoute une condition pour la recherche textuelle si un mot-clé est fourni
        if (search) {
            whereClause[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } }
            ];
        }

        // Filtre par catégorie si une catégorie est spécifiée
        if (category) {
            whereClause.category = category;
        }

        // Définit les options de tri
        let order = [];
        if (sort === 'price_asc') {
            order = [['price', 'ASC']];
        } else if (sort === 'price_desc') {
            order = [['price', 'DESC']];
        }

        // Récupère les produits en appliquant les filtres et le tri
        const products = await Product.findAll({
            where: whereClause,
            order
        });

        // Vérifie si aucun produit n'est trouvé
        if (products.length === 0) {
            return res.status(404).json({
                message: "Aucun produit trouvé."
            });
        }

        res.status(200).json({
            message: 'Les produits sont affichés avec succès !',
            data: products
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'La requête a échoué.' });
    }
};

// Contrôleur pour modifier un produit
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, stockQuantity, imageUrl } = req.body;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                message: 'Produit non trouvé.'
            });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.stockQuantity = stockQuantity || product.stockQuantity;
        product.imageUrl = imageUrl || product.imageUrl;

        await product.save();

        res.status(200).json({
            message: 'Produit mis à jour avec succès.',
            data: product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Erreur lors de la mise à jour du produit.'
        });
    }
};

// Contrôleur pour supprimer un produit
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                message: 'Produit non trouvé.'
            });
        }

        await product.destroy();

        res.status(200).json({
            message: 'Produit supprimé avec succès.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Erreur lors de la suppression du produit.'
        });
    }
};

// Middleware pour trouver un produit par ID
exports.findProductById = async (req, res, next) => {
    try {
        const { id } = req.params; // Récupère l'ID du produit dans les paramètres de l'URL
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé.' });
        }

        // Ajoute le produit trouvé à l'objet req
        req.product = product;
        next(); // Passe au prochain middleware ou contrôleur
    } catch (error) {
        console.error('Erreur lors de la recherche du produit:', error);
        res.status(500).json({ message: 'Erreur lors de la recherche du produit.' });
    }
};


exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      // Si aucune recherche n'est faite, renvoyer tous les produits
      const allProducts = await Product.findAll();
      return res.status(200).json(allProducts);
    }

    const normalizedQuery = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    // Recherche flexible (partielle, insensible à la casse, dans plusieurs colonnes)
    const products = await Product.findAll({
      where: {
        [Op.or]: [
          Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("name")), {
            [Op.like]: `%${normalizedQuery}%`,
          }),
          Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("category")), {
            [Op.like]: `%${normalizedQuery}%`,
          }),
        ],
      },
    });

    if (products.length === 0) {
      // Si aucun produit trouvé, renvoyer tous les produits avec un message
      const allProducts = await Product.findAll();
      return res.status(200).json({
        message: "Aucun produit trouvé. Voici tous les produits disponibles.",
        products: allProducts,
      });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Erreur lors de la recherche :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

exports.getProductsByCategory = async (req, res) => {
    try {
      const { category } = req.params;
  
      if (!category) {
        return res.status(400).json({ message: "La catégorie est requise." });
      }
  
      // Normalisation pour gérer les caractères spéciaux
      const normalizedCategory = category
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
  
      const products = await Product.findAll({
        where: {
          category: {
            [Op.like]: `%${normalizedCategory}%`, // Recherche partielle
          },
        },
      });
  
      if (!products || products.length === 0) {
        return res.status(404).json({ message: "Aucun produit trouvé pour cette catégorie." });
      }
  
      res.status(200).json(products);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
      res.status(500).json({ message: "Erreur serveur." });
    }
  };
