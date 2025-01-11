const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
              isPositive(value) {
                if (value <= 0) {
                  throw new Error('Le prix doit être supérieur à zéro.');
                }
              },
            },
            get() {
              const rawValue = this.getDataValue('price');
              // Utilisez Intl.NumberFormat pour le formatage
              return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF' }).format(rawValue);
            },
          },
          
        category: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        stockQuantity: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        brand: { // Ajout de la marque
          type: DataTypes.STRING,
          allowNull: false,
        },
        model: { // Ajout du modèle
          type: DataTypes.STRING,
          allowNull: false,
        },
        imageUrl: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        tableName: 'products',
        timestamps: true,
      }
    );

Product.associate = (models) => {
    Product.belongsToMany(models.Order, {
        through: 'OrderProducts',
        as: 'orders',
        foreignKey: 'productId',
    });
};


module.exports = Product;
