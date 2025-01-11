const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('../Models/Product');

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    isFinalized: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // True si le panier devient une commande
    },
}, {
    tableName: 'carts',
    timestamps: true,
});

// Association de Cart à Product (Many-to-Many)
Cart.belongsToMany(Product, {
    through: 'CartProducts', // Nom de la table de jointure
    as: 'products', // Alias utilisé dans les requêtes
});

module.exports = Cart;