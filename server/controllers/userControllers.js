const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel');
const generateToken = require('../config/generateToken');

// Cette fonction est destinée à l'inscription d'un nouvel utilisateur.
// Elle vérifie la présence des champs requis (firstname, lastname, email, password).
// Vérifie également si l'utilisateur avec l'e-mail donné existe déjà.
// Crée un nouvel utilisateur dans la base de données et renvoie une réponse avec les détails de l'utilisateur et un token d'authentification.

const registerUser = asyncHandler(async (req, res) => {
  // Extraction des données du corps de la requête
  const { firstname, lastname, dateofbirth, email, password, securityAnswer } = req.body;

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
    securityAnswer,
    isResettingPassword: false,
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
      securityAnswer: user.securityAnswer,
      isResettingPassword: user.isResettingPassword,
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
  const { email, password } = req.body; // Recherche de l'utilisateur dans la base de données
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
      securityAnswer: user.securityAnswer,
      isResettingPassword: user.isResettingPassword,
      token: generateToken(user._id),
    });
  } else {
    // Envoi d'une réponse d'erreur en cas d'authentification échouée
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const searchUsers = asyncHandler(async (req, res) => {
  // c tileli HSD ittikhedhmen wlh ma d nek saqsimtt nettath hahah nek machi aka niqal ittkhedhmegh
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
    // Recherche des user en fct de la condition construite et exclut user actuellement connecté...
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } }); // $ne ma3nas sauf user qui est connecté celui qui a fait la requete c not n sql
    // res avec les user trouvés
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while search user ' });
  }
});

const deleteUsers = asyncHandler(async (req, res) => {

  // ça c la version optimisé
  // je recupere direct l id apres supprimi et result nni ad yafficher les info n winna que j'ai supprimé
  // const result = await User.findByIdAndDelete(req.params.id);
  // res.json({ result });
  
  // je récupere l id daki
  const userId = req.params.id;
  console.log('Deleting user with id:', userId); // j affich l id
  // notez bien que ces console log grv grv tt3awanent pour localiser l erreur ma thella ;)

  try {
    const user = await User.findOne({ _id: userId }); // anwalli ma yella ;)
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur introuvable' });// khati ulachith x)
    }

    // await user.remove(); thaki n'est pas prédifinite anabrrri de l'utiliser sinon faut creer une fonction s yisem aki remove pour find one and delete ok !!
    await User.deleteOne({ _id: userId }); // delete aken thezram 

    res.status(200).json({ message: 'Acccount deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'err serveur' });
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  // on saisi email et la reponse a la qst de sécurité
  const { email, securityAnswer } = req.body;
  const user = await User.findOne({ email });// yella ?

  if (!user) {
    return res.status(404).json({ error: 'User not found' });// nn ulachith ughaled azka ;))
  }

  // but does the answer match akked wayen dennidh deja ?
  if (user.securityAnswer !== securityAnswer) {
    return res.status(401).json({ error: 'Incorrect security answer' });
  }

  user.isResettingPassword = true; // daki thoura nezmer anvedel le mdp s reset akki qui suit 

  await user.save(); // enregistrigh les changement aki

  res.json({ message: 'Security answer verified successfully' });
});

const resetPassword = asyncHandler(async (req, res) => {
  // daki blama nenad
  const { email, newPassword } = req.body;
  console.log('reset password pour :', email);

  const user = await User.findOne({ email, isResettingPassword: true }); //on verifi mayella user s lemail nni akked is resettttbfuvbe aki true

  if (!user) {
    console.log('404 pour l email:', email);
    return res.status(401).json({ error: 'Invalid req or user not found' });
  }

  user.password = newPassword;// daki anvedel mdp

  user.isResettingPassword = false; // apres athner ar false aken yella zik par defaul

  await user.save();// save les changement

  res.json({ message: 'Password reset successful' });
});


module.exports = {
  registerUser,
  authUser,
  searchUsers,
  deleteUsers,
  forgotPassword,
  resetPassword,
};
