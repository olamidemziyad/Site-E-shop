const User = require('../Models/User');

exports.getExample = ( req, res ) => {
    res.send('Hello Example, Ziyad is well Learning MVC');
};

exports.jsonres = ( req, res ) => {
    res.json({ message : 'Hello' });
};

//create user
exports.createUser = async( req, res ) => {
    try{
    const { name, lastName } = req.body;
        //verifier si les champs sont remplis
        if(!name || !lastName){
            res.status(400).json( {message : 'Les champs name et lastName sont requis'})
        }
        //creer un utilisateur
    const user = await User.create({name, lastName});

    res.status(201).json({ 
        message : 'Utilisateur créé avec succès',
        data: user 
    });//erreur
    }catch(error){
        console.error(error);
        res.status(500).json({ message : 'Une erreur sest produit !'})
    }
}
// Lire tous les utilisateurs (Read All)
exports.readAllUsers = async( req, res ) => {
    try{
    const user = await User.findAll();

    res.status(201).json({ 
        message : 'Utilisateurs Affichés avec Sucess !',
        data: user 
    });//erreur
    }catch(error){
        console.error(error);
        res.status(500).json({ message : 'Une erreur sest produit !'})
    }
}

// Read
exports.readUserById = async( req, res ) => {
    try {
        const {id} = req.params;
        const user = await User.findByPk(id);

        if(!user){
            return res.status(404).json({message: "L'utilisateur n'exist pas !"});
        }

        res.status(201).json({message : 'Utilisateur trouvé',
            data: user
        });
    }catch(error){
        console.error(error);
        res.status(500).json({message : 'La rêquete a echouée'})
    }
}

// Update
exports.updateUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, lastName } = req.body; // Extraire name et lastName depuis req.body

        // Rechercher l'utilisateur par son ID
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "L'utilisateur n'existe pas !" });
        }

        // Mettre à jour les champs de l'utilisateur
        user.name = name || user.name; 
        user.lastName = lastName || user.lastName; 

        // Sauvegarder les modifications
        await user.save();

        res.status(200).json({
            message: 'Utilisateur mis à jour avec succès',
            data: user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'La requête a échoué' });
    }
};

//Delete
exports.deleteUsers = async (req, res) => {
    try {
        const { id } = req.params;
       
        // Rechercher l'utilisateur par son ID
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "L'utilisateur n'existe pas !" });
        }

         // Supprimer l'utilisateur
         await user.destroy();

        res.status(200).json({
            message: 'Utilisateur supprimé avec succès'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'La requête a échoué' });
    }
};
