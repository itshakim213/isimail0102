const express = require('express');
const router = express.Router();
const MailModel = require('../models/MailModel');
const userModel = require('../models/UserModel');
const bcrypt = require('bcrypt');

//Cette route gère l'inscription des utilisateurs. Lorsqu'un client envoie une requête POST
router.post('/newmessage', async (req, res) => {
  console.log('New message is added successfully !');
  try {
    const { from, to, subject, message } = req.body;

    const userFrom = await userModel.findOne({ email: from });
    const userTo = await userModel.findOne({ email: to });

    if (!userFrom || !userTo) {
      return res.status(404).json({ error: 'Utilisateur introuvable.' });
    }
    //On cree un nouvel user, qu'on sauvegarde dans la bdd
    const newMail = new MailModel({
      from: userFrom._id,
      to: userTo._id,
      subject,
      message,
    });

    //Enregistre le nouvel mail dans la base de données
    await newMail.save();
    res.status(201).json(newMail);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while creating a message.' });
  }
});

module.exports = router;
