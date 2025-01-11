const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Review = sequelize.define('Review', {
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER, // Note entre 1 et 5
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    },
    reviewText: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'reviews',
    timestamps: true, // Pour ajouter createdAt et updatedAt automatiquement
});

// Configuration des associations
Review.associate = function(models) {
    Review.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
    Review.belongsTo(models.Product, { foreignKey: 'productId' });
};

module.exports = Review;
