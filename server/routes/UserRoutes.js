const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');

//Cette route gère l'inscription des utilisateurs. Lorsqu'un client envoie une requête POST
router.post('/signup', async (req, res) => {
  console.log('New Signup is added successfully !');
  try {
    const { firstname, lastname, dateofbirth, email, password } = req.body;
    //On cree un nouvel user, qu'on sauvegarde dans la bdd
    const newUser = new UserModel({
      firstname,
      lastname,
      dateofbirth,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    //Enregistre le nouvel utilisateur dans la base de données
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating a user.' });
  }
});

//cette route recupere les donnees envoyees via la requete POST, notamment l'email et le password
router.post('/signin', async (req, res) => {
  console.log('New Authentification');
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "L'utilisateur n'existe pas. " });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(403).json({ error: 'Mot de passe incorrect.' });
    }
    res.status(200).json({ message: 'Authentification reussie' });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Une erreur est survenue lors de l'authentification." });
  }
});

module.exports = router;
