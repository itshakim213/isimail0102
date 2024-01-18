const MailModel = require('../models/MailModel');
const MailBoxModel = require('../models/MailBoxModel');
const User = require('../models/UserModel');
const asyncHandler = require('express-async-handler');
const fs = require('fs');
const BSON = require('bson');
const AttachmentModel = require('../models/AttachmentModel');
const multer = require('multer');

const mongoose = require('mongoose');

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
  const currentuser = req.user;
  console.log(
    `New mail was sent successfully! Sent by waki ---> ${currentuser.firstname} ${currentuser.lastname}`,
  );
  try {
    // comme d hab extraction des donnée
    const { to, subject, message, attachments } = req.body;
    // verifikaychon de user dans user db

    const dest = Array.isArray(to) ? to : [to];

    // ça c pour cc ou cci
    const usersTo = await User.find({ _id: { $in: dest } });

    if (usersTo.length !== dest.length) {
      return res.status(404).json({ error: 'Utilisateur introuvable' });
    }

    // la variable qui va contenir le mail aki et avec elle en va entregistrer di mail db
    const newMail = new MailModel({
      from: currentuser._id,
      to: usersTo.map((user) => user._id),// pr dire quil va contenir des objectIds n les users yellan dakhel n la bdd user , c quune verifikaychon
      subject,
      message,
      attachments: [],
      starred: false,
      bin: false,
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
        // { userId: userFrom._id, name: 'Outbox' },
        { userId: currentuser._id, name: 'Outbox' },
        { $addToSet: { mails: newMail._id } }, // Ajouter l'ID du nouveau message à la liste des mails [ ] dans la Outbox
        { upsert: true }, // Si la Outbox n'existe pas, on va la créer grace à upsert aki
      );

      // update la Inbox (Boîte de réception) du destinataire
      await MailBoxModel.findOneAndUpdate(
        { userId: usersTo._id, name: 'Inbox' },
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

  // const currentuser = req.user; //recupere les infos de l'user authentifier et les contenir dans req.user
  // console.log('Informations sur le current user', currentuser);

  // const mails = await MailModel.aggregate([
  //   //Methode aggregate effectue une operation d'agreg sur la collection MailModel
  //   {
  //     $lookup: {
  //       //operation de jointure qui recupere les donnees a partir d'une autre collection, il cherche des infos dans la collection users en utilisant les champs from et _id
  //       from: 'users',
  //       localField: 'from',
  //       foreignField: '_id',
  //       as: 'user',
  //     },
  //   },
  //   {
  //     //filtre les mails ou le champ to correspond à l'ID de l'utilisateur actuel (currentuser._id)
  //     $match: {
  //       to: new mongoose.Types.ObjectId(currentuser._id),
  //     },
  //   },
  // ]);

  // res.send(mails);
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
  const currentuser = req.user;
  console.log('Info sur current user', currentuser);
  try {
    const { mailId } = req.body;
    const mail = await MailModel.findById(mailId); // recuperer le mail en qst
    console.log('Found Mail:', mail); // l'afficher
    if (!mail) {
      return res.status(404).json({ error: 'Mail not found' }); // non d lkhir kan ulach
    }

    // kifkif pr favoris
    const starredMailbox = await MailBoxModel.findOne({
      userId: currentuser._id,
      name: 'Starred',
    });

    // ca c comme d hab
    if (!starredMailbox) {
      return res.status(404).json({ error: 'Starred mailbox not found' });
    }

    const star = mail.starred; // je stock la valeur true negh fals dans la var star

    if (star) {
      starredMailbox.mails.pull(mail._id); // si il est deja true je pull donc
    } else {
      starredMailbox.mails.addToSet(mail._id); // sinon je l'ajoute
    }

    mail.starred = !star; // jinverse la valuer de starred par rapport au resultas precedent
    await mail.save(); // je MàJ le mail et je prend s en compte celle de starred (le parametre)

    console.log('Saving starred mailbox...');
    await starredMailbox.save(); // saving it ;p

    console.log('Here is the added/removed mail, look at its starred value : ', mail);
    console.log('Starred mailbox saved!');
    console.log('Here it is the Starred Mailbox:', starredMailbox); // booooom ;)
    res.status(201).json('starred updated');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// deplacer mail vers corbeille=bin
const moveToBin = asyncHandler(async (req, res) => {
  const currentuser = req.user;
  try {
    // extraire id de mail
    const { mailId } = req.body;

    const mail = await MailModel.findById(mailId);
    // verifyi l existence de mail dans le mail model db
    if (!mail) {
      return res.status(404).json({ error: 'Mail not found' }); //404 azka ughaled
    }
    console.log('Found Mail:', mail); // l'afficher

    // comme d'hab :-/
    const binMailbox = await MailBoxModel.findOne({
      userId: currentuser._id,
      name: 'Bin',
    });
    if (!binMailbox) {
      return res.status(404).json({ error: 'Bin mailbox not found' });
    }

    const BinValue = mail.bin;

    if (BinValue === false) {
      // bin attoughal true et on l'ajoute ar bin mail box
      mail.bin = true;
      binMailbox.mails.push(mail._id);
    } else {
      // bin attoughal false et attoughal ansii dussa
      mail.bin = false;
      binMailbox.mails.pull(mail._id);
    }

    await mail.save();// sauvegarder les changements
    await binMailbox.save();// Màj de dossier bin

    console.log('Bin Mailbox:', binMailbox);

    res.status(201).json('bin updated');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//supprimer  un mail carrément pour de beau, irreversible !!
const deleteMail = asyncHandler(async (req, res) => {
  try {
    const { mailId } = req.body;

    const mail = await MailModel.findOne({ _id: mailId });
    if (!mail) {
      return res.status(404).json({ error: 'Mail not found' });
    }

    await MailModel.findByIdAndDelete(mail); // ca c delete pr de beau

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

const replyToEmail = asyncHandler(async (req, res) => {
  const currentuser = req.user;

  try {
    const { mailId, message } = req.body;

    // le mail a quoi repondre
    const originalMail = await MailModel.findById(mailId).populate(
      'from',
      'firstname lastname email',
    );
    if (!originalMail) {
      return res.status(404).json({ error: 'Original mail not found' });
    }

    // je crre le schema de mail avec lequel je repond et
    // je garde tt les infos de mail d origin
    const repliedMail = new MailModel({
      from: currentuser._id,
      to: originalMail.from._id,
      subject: `Re: ${originalMail.subject}`,
      message: `On ${new Date().toLocaleString()}, ${currentuser.firstname} ${
        currentuser.lastname
      } wrote:\n${message}\n\nOriginal Message:\nFrom: ${
        originalMail.from.firstname
      } ${originalMail.from.lastname}\nSubject: ${originalMail.subject}\n\n${
        originalMail.message
      }`,
      attachments: [],
      starred: false,
      bin: false,
    });

    // si on veut envoyer egalement des PJs avec on dois rajouter la configuration de attachement here aussi

    await repliedMail.save();

    // MàJ de outbox
    await MailBoxModel.findOneAndUpdate(
      { userId: currentuser._id, name: 'Outbox' },
      { $addToSet: { mails: repliedMail._id } },
      { upsert: true },
    );

    // MàJ de inbox
    await MailBoxModel.findOneAndUpdate(
      { userId: originalMail.from._id, name: 'Inbox' },
      { $addToSet: { mails: repliedMail._id } },
      { upsert: true },
    );

    res.status(200).json('Reply sent successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const importantMails = asyncHandler(async (req, res) => {
  const currentuser = req.user;
  console.log('Info sur current user', currentuser);
  try {
    const { mailId } = req.body;
    const mail = await MailModel.findById(mailId); // recuperer le mail en qst
    console.log('Found Mail:', mail); // l'afficher
    if (!mail) {
      return res.status(404).json({ error: 'Mail not found' }); // non d lkhir kan ulach
    }

    // kifkif pr favoris
    const importantMailbox = await MailBoxModel.findOne({
      userId: currentuser._id,
      name: 'Important',
    });

    // ca c comme d hab
    if (!importantMailbox) {
      return res.status(404).json({ error: 'important mailbox not found' });
    }

    const imp = mail.important; // je stock la valeur true negh fals dans la var star

    if (imp) {
      importantMailbox.mails.pull(mail._id); // si il est deja true je pull donc
    } else {
      importantMailbox.mails.addToSet(mail._id); // sinon je l'ajoute
    }

    mail.important = !imp; // jinverse la valuer de imp par rapport au resultas precedent
    await mail.save(); // je MàJ le mail et je prend s en compte celle de important (le parametre)

    console.log('Saving important mailbox...');
    await importantMailbox.save(); // saving it ;p

    console.log('Important mailbox saved!');
    console.log('Here it is the important Mailbox:', importantMailbox); // booooom ;)
    res.status(201).json('important updated');
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
  replyToEmail,
  importantMails,
};
