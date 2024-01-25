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
      //attachments: [],
    });

    // if (attachments && attachments.length > 0) {
    //   // verifi si la pj existe et > af zero
    //   // parcour des pj yellan
    //   for (let i = 0; i < attachments.length; i++) {
    //     const attachment = attachments[i]; // recuperer la pj
    //     const data = fs.readFileSync(attachment.path); // lit le contenu de la pj de maniere synchron
    //     const bson = BSON.serialize({ data }); // convertir en format bson pr les stocker
    //     const newAttachment = new AttachmentModel({
    //       // je l'ai creé pr chaque pj
    //       nameAttach: attachment.originalname,
    //       url: '',
    //       taille: attachment.size,
    //     });
    //     await newAttachment.save(); // ça l'enregiste dans la db de attachement
    //     newMail.attachments.push(newAttachment._id); // ajout de la pj dans newMail
    //   }
    // }

    //Enregistre le nouvel mail dans la base de données
    await newMail.save();

    //Renvoyer un statut HTTP 201 Created pour dire que tout s'est bien passé
    // On renvoie le nouveau mail crée
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

// // Brouiilons
// router.put('/draft', async (req, res) => {
//   try {
//     const { from, to, subject, message } = req.body;

//     const userFrom = await User.findOne({ email: from });
//     const userTo = await User.findOne({ email: to });

//     if (!userFrom || !userTo) {
//       return res.status(404).json({ error: 'Utilisateur introuvable.' });
//     }
//     //si le form est ferme sans click sur envoyer mais sur draft par exemple
//     //   enregistrement des données du form ds drafts
//     if (!req.body.send) {
//       const newMailDraft = new MailModel({
//         from: userFrom._id,
//         to: userTo._id,
//         subject,
//         message,
//       });

//       //ajout de message à brouillons de user from
//       await MailBoxModel.findOneAndUpdate(
//         { userId: userFrom._id, name: 'Drafts' },
//         { $addToSet: { mails: newMailDraft._id } },
//         { upsert: true },
//       );
//       //reponse par statut 200 pr indiquer bli brouillon est sauvegardé.
//       return res
//         .status(200)
//         .json({ message: 'Brouillon enregistré avec succès.' });
//     }
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: 'Erreur lors de lenregistrement du brouillon' });
//   }
// });

module.exports = router;
