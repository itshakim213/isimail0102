const MailModel = require('../models/MailModel');
const MailBoxModel = require('../models/MailBoxModel');
const User = require('../models/UserModel');
const asyncHandler = require('express-async-handler');
const fs = require('fs');
const BSON = require('bson');
const AttachmentModel = require('../models/AttachmentModel');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // dossier anda on stock les fichiers
  },
  filename: function (req, file, cb) {
    // sert à determini isem n fihier
    cb(null, new Date().toISOString() + file.originalname); // on utilisant la date aken ad yili unique l'enregistrement ines
  },
});

const upload = multer({ storage: storage }); // thoura on peut utiliser uploade avec la config storage que jai fait di s multer

const sendEmail = asyncHandler(async (req, res) => {
  try {
    // comme d hab extraction des donnée
    const { from, to, subject, message, attachments } = req.body;
    // verifikaychon de user dans user db
    const userFrom = await User.findOne({ _id: from });
    const userTo = await User.findOne({ _id: to });

    // ça c pour cc ou cci
    //const userTo = await User.findOne({ email: { $in: to } });

    //if ( !userTo.length) {
    //  return res.status(404).json({ error: 'Utilisateur introuvable' }); // sinon c sa faute 404
    ///}

    if (!userFrom || !userTo) {
      return res.status(404).json({ error: 'Utilisateur introuvable' }); // sinon c sa faute 404
    }
    // la variable qui va contenir le mail aki et avec elle en va entregistrer di mail db
    const newMail = new MailModel({
      from: userFrom._id,
      to: userTo._id,
      subject,
      message,
      attachments: [],
    });

    // middleware upload pour gérer les pj
    // array prsq yezmer pas un seul donc khemegh vecteur ok !!
    upload.array('attachments')(req, res, async function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (attachments && attachments.length > 0) {
        // verifi si la pj existe et > af zero
        // parcour des pj yellan
        for (let i = 0; i < attachments.length; i++) {
          const attachment = attachments[i]; // recuperer la pj
          const data = fs.readFileSync(attachment.path); // lit le contenu de la pj de manière synchron
          const bson = BSON.serialize({ data }); // convertir en format bson pr les stocker
          const newAttachment = new AttachmentModel({
            // je l'ai creé pr chaque pj
            nameAttach: attachment.originalname,
            url: '',
            taille: attachment.size,
          });
          await newAttachment.save(); // ça l'enregistre dans la db de attachement
          newMail.attachments.push(newAttachment._id); // ajout de la pj dans newMail
        }
      }

      // enregistrmt de mail
      await newMail.save();
      // update la Outbox (Boîte d’envoi) de l'expéditeur
      await MailBoxModel.findOneAndUpdate(
        { userId: userFrom._id, name: 'Outbox' },
        { $addToSet: { mails: newMail._id } }, // Ajouter l'ID du nouveau message à la liste des mails [ ] dans la Outbox
        { upsert: true }, // Si la Outbox n'existe pas, on va la créer grace à upsert aki
      );

      // update la Inbox (Boîte de réception) du destinataire
      await MailBoxModel.findOneAndUpdate(
        { userId: userTo._id, name: 'Inbox' },
        { $addToSet: { mails: newMail._id } }, // Ajouter l'ID du nouveau message à la liste des mails [ ] dans la Inbox
        { upsert: true }, // Si la Inbox n'existe pas, on va la créer grace à upsert aki
      );

      // response msg
      res.status(200).json('mail sent successfully');
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rec mail
const receiveEmail = asyncHandler(async (req, res) => {
  try {
    //const { to, userId } = req.params;
    //const mails = await MailModel.find({ to: to, 'from._id': userId });

    // extrire to de la requete precedente
    const { to } = req.params;
    const mails = await MailModel.find({ to: to }) // researche d mail filtrer s to siwa anda to nni id user ok !!!!
      .populate('from', 'firstname lastname email')
      .select('from subject message'); // adanwi kan ayen nehlaj :p
    // ma yella ukach ulach 404
    if (!mails) {
      return res.status(404).json({ error: 'aucun mail trouvé' });
    }
    // repnse par json data et aficher les mails
    // mais d achu d mails aki entre parenthese anehlaj di fetchMails au reliage
    res.status(200).json(mails);
  } catch (error) {
    res.status(500).json({ error: error.message }); // thaki d yellis tfamilt
  }
});



// Toggle starred email en relation avec le bttn etoile dont je vous ai parlé
// en faite c une basculation c pour ça ilaq ansekhdhem put machi post
// di route vous allez trv que j'ai utiliser put et pas post
// car favoris iv la copier l img de mail vers un dossier ismis favoris
// en le gardant dans l origine
// et quand tu le retire s put ad yekhdhem une MàJ
const toggleStarredEmail = asyncHandler(async (req, res) => {
  try {
    // mail id et la valuer de l'etoile nni
    const { emailId, value } = req.body;
    // chrche si yella le mail dans mail model qvel
    const mail = await MailModel.findById(emailId);
    if (!mail) {
      return res.status(404).json({ error: 'Mail not found' }); // sinon 404
    }

    mail.starred = value; // changé la valuer de leoille
    await mail.save(); // et l' enregistrer

    const starredMailbox = await MailBoxModel.findOne({ name: 'Starred' }); // ca c comme d hab
    if (!starredMailbox) {
      return res.status(404).json({ error: 'Starred mailbox not found' });
    }
    // si la valuer chenge genre cliqué negh activé anyway donc on ajooute ce mail er dossir favoris
    if (value) {
      // genre si yech3el etoile nni donc on lajout ar favoris
      starredMailbox.mails.push(mail._id);
    } else {
      // ma thekhsi on le retire si favoris
      //on recupere index de mail en qst
      const index = starredMailbox.mails.indexOf(mail._id);
      // avec l index genre le vecteur nni n mails [] ad ksedh sges yiwen
      if (index > -1) {
        starredMailbox.mails.splice(index, 1);
      }
    }

    await starredMailbox.save(); // saving it ;p

    res.status(201).json('Value is updated'); // MàJ
  } catch (error) {
    res.status(500).json({ error: error.message }); // bjnr
  }
});

// deplacer mail vers corbeille=bin
const moveToBin = asyncHandler(async (req, res) => {
  try {
    // extraire id de mail
    const { mailId } = req.body;

    const mail = await MailModel.findById(mailId); // verifyi l existence de mail dans le mail model db
    if (!mail) {
      return res.status(404).json({ error: 'Mail not found' }); //404 azka ughaled
    }

    const binMailbox = await MailBoxModel.findOne({ name: 'Bin' });
    if (!binMailbox) {
      return res.status(404).json({ error: 'Bin mailbox not found' });
    }

    // la meme chose avec push mais pas comme toogle chghel aki d la suppression
    // mais avec put car de la corbeille tu px le recupérer
    binMailbox.mails.push(mail._id);
    await binMailbox.save();

    res.status(201).json('Mail moved to bin');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//supprimer  un mail carrément
const deleteMail = asyncHandler(async (req, res) => {
  try {
    const { mailId, userId } = req.body;

    const mail = await MailModel.findOne({ _id: mailId, to: userId });
    if (!mail) {
      return res.status(404).json({ error: 'Mail not found' });
    }

    await MailModel.findByIdAndDelete(mailId); // ca c delete pr de beau

    res.status(200).json('Mail deleted');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//transferer un mail
const forwardEmail = asyncHandler(async (req, res) => {
  try {
    const { mailId, to } = req.body; // les par de req quon aura besoin

    const mail = await MailModel.findById(mailId); // recherche de mail dans la bdd
    if (!mail) {
      return res.status(404).json({ error: 'Mail not found' });
    }

    const userTo = await User.findOne({ _id: to }); // recherdche de to le destinataire
    if (!userTo) {
      return res.status(404).json({ error: 'destinataire introuvable' });
    }
    // creation de ce mail pour le sauvgarder dans la bdd
    // mais si vs remarquez dans le champs de message j'ai recuperer les donneea de mail nni que j'ai cherché deg umezwaru
    // et c nrml car je vais pas reecrir le mail c un transfert
    const forwardedMail = new MailModel({
      from: mail.from,
      to: userTo._id,
      subject: `FWD: ${mail.subject}`,
      message: `--- Forwarded message ---\nFrom: ${mail.from}\nSubject: ${mail.subject}\n\n${mail.message}`,
    });

    await forwardedMail.save();

    res.status(200).json('Mail forwarded successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  sendEmail,
  receiveEmail,
  moveToBin,
  deleteMail,
  toggleStarredEmail,
  forwardEmail,
};
