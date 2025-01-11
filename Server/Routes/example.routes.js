const express = require('express');
const router = express.Router();
const example = require('../Controllers/example.controller');

//Exemple de Route GET
router.get('/example', example.getExample);

//Simple Route pour envoyer une message JSON
router.get('/json', example.jsonres);
//Creer un utilisateurs
router.post('/users/create', example.createUser);

//Lire tout les utilisateurs dans la base de donnees
router.get('/users/all', example.readAllUsers);

//Lire tout les utilisateurs via l'ID
router.get('/users/:id', example.readUserById);

//route pour mettre a jour les utilisateur
router.put('/users/update/:id', example.updateUsers);

//supprimer un utiisateur
router.delete('/users/delete/:id', example.deleteUsers);

//Exporter
module.exports = router;