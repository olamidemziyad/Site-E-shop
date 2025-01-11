const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Création d'utilisateur
exports.createUser = async (req, res) => {
    const { name, lastName, email, password, role, number } = req.body;

    try {
        // Vérifier que tous les champs nécessaires sont remplis
        if (!name || !lastName || !email || !password) {
            return res.status(400).json({ error: "Tous les champs requis ne sont pas remplis" });
        }

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: "L'utilisateur existe déjà" });
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création de l'utilisateur
        const user = await User.create({
            name,
            lastName,
            email,
            password: hashedPassword,
            role,
            number,
        });

        res.status(201).json({
            message: "Création réussie",
            data: { id: user.id, name: user.name, email: user.email, role: user.role },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la création de l'utilisateur" });
    }
};

// Connexion de l'utilisateur
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: "Email ou mot de passe incorrect" });
        }

        // Comparer le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) {
            return res.status(401).json({ error: "Email ou mot de passe incorrect" });
        }

        // Créer un token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Connexion réussie",
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la connexion de l'utilisateur" });
    }
};


// Mise à jour de l'utilisateur
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, lastName, email, number } = req.body;

    try {
        // Vérifier si l'utilisateur existe
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        // Mettre à jour les informations de l'utilisateur
        const updatedUser = await user.update({
            name: name || user.name,
            lastName: lastName || user.lastName,
            email: email || user.email,
            number: number || user.number,
        });

        res.status(200).json({
            message: "Utilisateur mis à jour avec succès",
            data: { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email, role: updatedUser.role },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la mise à jour de l'utilisateur" });
    }
};

// Suppression de l'utilisateur
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Vérifier si l'utilisateur existe
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // Supprimer l'utilisateur
        await user.destroy();

        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" });
    }
};

// Récupération de tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'lastName', 'email', 'role', 'number'], // Limiter les attributs pour des raisons de sécurité
        });

        if (users.length === 0) {
            return res.status(404).json({ message: "Aucun utilisateur trouvé" });
        }

        res.status(200).json({
            message: "Utilisateurs récupérés avec succès",
            data: users,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
    }
};




/*méliorations appliquées :
Validation d’entrée : Vérification des champs nécessaires dans la fonction createUser.
Gestion d’erreurs HTTP : Codes d’erreurs HTTP appropriés comme 409 pour les conflits et 400 pour les requêtes incorrectes.
Limitation des attributs retournés : En excluant le mot de passe lors de la création et de la récupération de l'utilisateur.
Amélioration des messages de réponse : Messages plus informatifs pour le client.*/