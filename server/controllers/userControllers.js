const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel');
const generateToken = require('../config/generateToken');

// Cette fonction est destinée à l'inscription d'un nouvel utilisateur.
// Elle vérifie la présence des champs requis (firstname, lastname, email, password).
// Vérifie également si l'utilisateur avec l'e-mail donné existe déjà.
// Crée un nouvel utilisateur dans la base de données et renvoie une réponse avec les détails de l'utilisateur et un token d'authentification.

const registerUser = asyncHandler(async (req, res) => {
  // Extraction des données du corps de la requête
  const { firstname, lastname, dateofbirth, email, password } = req.body;

  // Vérification de la présence de toutes les données nécessaires
  if (!firstname || !lastname || !dateofbirth || !email || !password) {
    res.status(400);
    throw new Error('Please enter all the fields');
  }

  // Vérification si l'utilisateur existe déjà dans la base de données
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Création de l'utilisateur dans la base de données
  const user = await User.create({
    firstname,
    lastname,
    dateofbirth,
    email,
    password,
  });

  // Envoi d'une réponse avec les détails de l'utilisateur et un token d'authentification
  // la c juste pour l'api dans postman sinon on peut renvoyer un message du type inscription reussie
  if (user) {
    res.status(201).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      dateofbirth: user.dateofbirth,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Failed to create the user');
  }
});

// Cette fonction est destinée à l'authentification d'un utilisateur existant.
// Elle recherche l'utilisateur dans la base de données par e-mail et vérifie le mot de passe.
// Envoie une réponse avec les détails de l'utilisateur et un token d'authentification en cas de succès, sinon envoie une réponse d'erreur avec un code 401.

const authUser = asyncHandler(async (req, res) => {
  // Extraction des données du corps de la requête
  const { email, password } = req.body;

  // Recherche de l'utilisateur dans la base de données
  const user = await User.findOne({ email });

  // Vérification du mot de passe
  if (user && (await user.matchPassword(password))) {
    res.json({
      // Envoi d'une réponse avec les détails de l'utilisateur et un token d'authentification
      // pareil c juste pour l'api
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      dateofbirth: user.dateofbirth,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    // Envoi d'une réponse d'erreur en cas d'authentification échouée
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const searchUsers = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          // 'or' pour chercher des docs dans lesquels au moins yiweth de ces conditions est vraie,
          $or: [
            { firstname: { $regex: req.query.search, $options: 'i' } },
            { lastname: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } },
          ],
        }
      : {};
    // Recherche des user en fct de la condition construite et exclut user actuellement connecté
    const users = await User.find(keyword);
    // .find({ _id: { $ne: req.user._id } }); // $ne ma3nas sauf user qui est connecté celui qui a fait la requete c not n sql
    // res avec les user trouvés
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while search user ' });
  }
});

module.exports = { registerUser, authUser, searchUsers };
