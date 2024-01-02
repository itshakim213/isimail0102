const express = require('express');
const router = express.Router();
const MailModel = require('../models/MailModel');
const MailBoxModel = require('../models/MailBoxModel');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const fs = require('fs');
const BSON = require('bson');
const AttachementModel = require('../models/AttachmentModel');
const formdata = require ('formdata');

//Cette route gère l'inscription des utilisateurs. Lorsqu'un client envoie une requête POST
router.post('/newmessage', async (req, res) => {
  console.log('New message is added successfully !');
  try {
    // const { from, to, subject, message } = req.body;

    const from = formData.get('from');
    const to = formData.get('to');
    const subject = formData.get('subject');
    const message = formData.get('message');

    const userFrom = await User.findOne({ email: from });
    const userTo = await User.findOne({ email: to });

    if (!userFrom || !userTo) {
      return res.status(404).json({ error: 'Utilisateur introuvable.' });
    }
    //    //   enregistrement des données du form ds drafts
    //    //si le form est ferme sans click sur envoyer
    //    if (!req.body.send) {
    //      const newMailDraft = new MailModel({
    //        from: userFrom._id,
    //        to: userTo._id,
    //        subject,
    //        message,
    //      });
    //
    //      //ajout de message à brouillons de user from
    //      await MailBoxModel.findOneAndUpdate(
    //        { userId: userFrom._id, name: 'Drafts' },
    //        { $addToSet: { mails: newMailDraft._id } },
    //        { upsert: true },
    //      );
    //
    //      //reponse par statut 200 pr indiquer bli brouillon est sauvegardé.
    //      return res
    //        .status(200)
    //        .json({ message: 'Brouillon enregistré avec succès.' });
    //    }

    //On cree un nouvel user, qu'on sauvegarde dans la bdd
    const newMail = new MailModel({
      from: userFrom.email,
      to: userTo.email,
      subject,
      message,
      attachments: [],
    });

    if (attachments && attachments.length > 0) {
      // verifi si la pj existe et > af zero
      // parcour des pj yellan
      for (let i = 0; i < attachments.length; i++) {
        const attachment = attachments[i]; // recuperer la pj
        const data = fs.readFileSync(attachment.path); // lit le contenu de la pj de maniere synchron
        const bson = BSON.serialize({ data }); // convertir en format bson pr les stocker
        const newAttachment = new AttachmentModel({
          // je l'ai creé pr chaque pj
          nameAttach: attachment.originalname,
          url: '',
          taille: attachment.size,
        });
        await newAttachment.save(); // ça l'enregiste dans la db de attachement
        newMail.attachments.push(newAttachment._id); // ajout de la pj dans newMail
      }
    }

    //Enregistre le nouvel mail dans la base de données
    await newMail.save();

    // creer la outbox du user to mayella ulachitt
    const outbox = await MailBoxModel.findOne({
      userId: userFrom._id,
      name: 'Outbox',
    });
    if (!outbox) {
      // mayella ulachitt on la cree et on enregistre aussi le mail qui est envoyé
      await MailBoxModel.create({
        userId: userFrom._id,
        name: 'Outbox',
        mails: [newMail._id],
      });
    } else {
      // sinon ma thella on ajoute directement le mail
      outbox.mails.push(newMail._id);
      await outbox.save();
    }

    // creer la Inbox du user to mayella ulachitt
    const inbox = await MailBoxModel.findOne({
      // on cherche ma thella une mailbox ismis Inbox
      userId: userTo._id,
      name: 'Inbox',
    });
    if (!inbox) {
      // mayella ulachitt on la cree et on enregistre aussi le mail qui est envoyé
      await MailBoxModel.create({
        userId: userTo._id,
        name: 'Inbox',
        mails: [newMail._id],
      });
    } else {
      // sinon ma thella on ajoute directement le mail
      inbox.mails.push(newMail._id);
      await inbox.save();
    }

    // update la Outbox (Boite d’envoi) de l'expéditeur
    //await MailBoxModel.findOneAndUpdate(
    //  { userId: userFrom._id, name: 'Outbox' },
    //  { $addToSet: { mails: newMail._id } }, // Ajouter l'ID du nouveau message à la liste des mails [ ] dans la Outbox
    //  { upsert: true }, // Si la Outbox n'existe pas, on va la créer grace à upsert aki
    //);

    // update la Inbox (Boite de réception) du destinataire
    //await MailBoxModel.findOneAndUpdate(
    //  { userId: userTo._id, name: 'Inbox' },
    //  { $addToSet: { mails: newMail._id } }, // Ajouter l'ID du nouveau message à la liste des mails [ ] dans la Inbox
    //  { upsert: true }, // Si la Inbox n'existe pas, on va la créer grace à upsert aki
    //);

    // On renvoie le nouveau mail crée
    res.status(201).json(newMail);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while creating a message.' });
  }
});

// Brouiilons
router.put('/draft', async (req, res) => {
  try {
    const { from, to, subject, message } = req.body;

    const userFrom = await User.findOne({ email: from });
    const userTo = await User.findOne({ email: to });

    if (!userFrom || !userTo) {
      return res.status(404).json({ error: 'Utilisateur introuvable.' });
    }
    //si le form est ferme sans click sur envoyer mais sur draft par exemple
    //   enregistrement des données du form ds drafts
    if (!req.body.send) {
      const newMailDraft = new MailModel({
        from: userFrom._id,
        to: userTo._id,
        subject,
        message,
      });

      //ajout de message à brouillons de user from
      await MailBoxModel.findOneAndUpdate(
        { userId: userFrom._id, name: 'Drafts' },
        { $addToSet: { mails: newMailDraft._id } },
        { upsert: true },
      );
      //reponse par statut 200 pr indiquer bli brouillon est sauvegardé.
      return res
        .status(200)
        .json({ message: 'Brouillon enregistré avec succès.' });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'Erreur lors de lenregistrement du brouillon' });
  }
});

//crud
router.get('/newmessage', async (req, res) => {
  console.log('Mails are retrieved ');
  try {
    const mails = await MailModel.find()
      .populate('from', 'firstname lastname email')
      .select('from subject message');
    res.status(200).json(mails);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Impossible d'afficher les messages" });
  }
});

module.exports = router;
