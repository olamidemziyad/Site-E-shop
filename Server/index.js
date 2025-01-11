const express = require('express');
const app = express();
const sequelize = require('./config/database');
require('dotenv').config();
const cors = require("cors");

app.use(cors());


//importer les routes
const Routes = require('./Routes/example.routes');
const Users = require('./Routes/userRoutes');
const Products = require('./Routes/productRoutes');
const Carts = require ('./Routes/cartRoutes');
const Reviews = require('./Routes/reviewsRoutes');
const stripeRoutes = require("./Routes/payementRoute");
const searchProducts = require('./Routes/searchRoute');





// Middleware pour traiter les données JSON dans le corps de la requête
app.use(express.json());


// Example of imported Route
app.use('/', Routes);


//Users Routes
app.use('/api', Users);

//Products Route
app.use('/api', Products);

//carts Route
app.use('/api', Carts);

// reviews Route
app.use('/api', Reviews);

// Stripe Route ou payement
app.use("/api", stripeRoutes);

// Search products routes
app.use('/api', searchProducts);

//Tester la connexion depuis la base de donnée
sequelize.authenticate()
    .then(() => console.log('Connexion à la base de données réussie.'))
    .catch(error => console.error('Erreur de connexion à la base de données:', error));

//Synchroniser les modeles
sequelize.sync(/*{force: true} */) //mettre a jour les données dans la base /*force : true qui efface completement */
    .then(() => console.log('Les tables ont été créées ou synchronisées avec succès.'))
    .catch(error => console.error('Erreur de synchronisation des tables:', error));

app.listen(3000, ()=> {
    console.log(`Le serveur est en cours sur le port 3000 depuis http://localhost:3000`);
})  