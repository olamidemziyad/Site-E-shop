const express = require('express');
const router = express.Router();
const user = require('../Controllers/userController');
const { authenticateToken, requireAdmin } = require('../middlewares/authenticate');
//Routes des Utilisateurs
router.post('/users/create',user.createUser); //C
router.post('/users/login', user.loginUser);  //R
router.put('/users/:id', authenticateToken, user.updateUser);    //U
router.delete('/users/:id', authenticateToken,user.deleteUser);//D
router.get('/users',authenticateToken, requireAdmin, user.getAllUsers);

// Routes des Produits




module.exports = router;