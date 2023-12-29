const express = require('express');
const router = express.Router();
const MailModel = require('../models/MailModel');
const userModel = require('../models/UserModel');
const { protect } = require('../middlewares/authMiddleware');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

//Cette route gère l'inscription des utilisateurs. Lorsqu'un client envoie une requête POST
router.post('/newmessage', protect, async (req, res) => {
  const currentuser = req.user;
  console.log('New mail was sent successfully !', currentuser);

  try {
    const { to, subject, message } = req.body;

    const userTo = await userModel.findOne({ email: to });

    if (!userTo) {
      return res.status(404).json({ error: 'Utilisateur introuvable.' });
    }
    //On cree un nouveau mail, qu'on sauvegarde dans la bdd
    const newMail = new MailModel({
      from: currentuser._id,
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
//middleware protect pour s'assurer que seul un user connectee qui pourra acceder
router.get('/newmessage', protect, async (req, res) => {
  const currentuser = req.user; //recupere les infos de l'user authentifier et les contenir dans req.user
  console.log('Informations sur le current user', currentuser);

  const mails = await MailModel.aggregate([
    //Methode aggregate effectue une operation d'agreg sur la collection MailModel
    {
      $lookup: {
        //operation de jointure qui recupere les donnees a partir d'une autre collection, il cherche des infos dans la collection users en utilisant les champs from et _id
        from: 'users',
        localField: 'from',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      //filtre les mails ou le champ to correspond à l'ID de l'utilisateur actuel (currentuser._id)
      $match: {
        to: new mongoose.Types.ObjectId(currentuser._id),
      },
    },
  ]);

  res.send(mails);
});

module.exports = router;
