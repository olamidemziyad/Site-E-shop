const { Sequelize } = require('sequelize');

// Charger les variables d'environnement
require('dotenv').config();

// Configuration de la connexion à la base de données MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME,     
  process.env.DB_USER,     
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,    // Hôte de la base de données
    dialect: 'mysql',             // Type de base de données (MySQL ici)
    port: process.env.DB_PORT,    // Port (par défaut 3306 pour MySQL)
  }
);

module.exports = sequelize;
