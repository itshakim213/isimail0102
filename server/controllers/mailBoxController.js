const express = require('express');
const User = require('../models/UserModel');
const MailBoxModel = require('../models/MailBoxModel');
const asyncHandler = require('express-async-handler');

// les retrouvailles des mails et les classer chaque yiwen ds sa mailbox
// ainsi creer une comme convenu et expliquer la derniere fois
// ihqa sync handler c pour controller et localiser anda thella l erreur
const retrieveMails = asyncHandler(async (req, res) => {
  const currentuser = req.user;
  console.log(
    `ces mailbox appartient ---> ${currentuser.firstname} ${currentuser.lastname}`,
  );
  try {
    // recuper user id des param d req
    const { userId } = req.params;
    // et ca c pour specefier le mailbox que je veux afficher son contenu
    const { mailbox } = req.query;
    // does he exist ??
    const user = await User.findById(userId);
    if (!user) {
      // no he doesn't ;p
      return res.status(404).json({ error: 'Utilisateur introuvable' });
    }

    // classement des mails par ordre descendant de plu recent
    // puis je l fai appl lors d'affichage d donnees
    function sortMailsByCreatedAt(mails) {
      return mails.sort((a, b) => b.createdAt - a.createdAt);
    }
    // i used let machi const
    //let box = 'inbox'; nezmer daghen aka :p mais non
    //je cree une var ismis oubox
    // si elle existe hamdullah on populate its datas sinon on la cree tt simplement
    let outbox = await MailBoxModel.findOne({
      userId: user._id,
      name: 'Outbox',
    }).populate({
      path: 'mails',
      populate: {
        path: 'from',
        select: 'firstname lastname email',
      },
    });
    // otherwise on la creer et lui donner son name
    if (!outbox) {
      outbox = await MailBoxModel.create({
        userId: user._id,
        name: 'Outbox',
        mails: [],
      });
    }
    // wlh c la meme chose daki
    let inbox = await MailBoxModel.findOne({
      userId: user._id,
      name: 'Inbox',
    }).populate({
      path: 'mails',
      populate: {
        path: 'from',
        select: 'firstname lastname email',
      },
    });

    if (!inbox) {
      inbox = await MailBoxModel.create({
        userId: user._id,
        name: 'Inbox',
        mails: [],
      });
    }

    let starred = await MailBoxModel.findOne({
      userId: user._id,
      name: 'Starred',
    }).populate({
      path: 'mails',
      populate: {
        path: 'from',
        select: 'firstname lastname email',
      },
    });

    if (!starred) {
      starred = await MailBoxModel.create({
        userId: user._id,
        name: 'Starred',
        mails: [],
      });
    }

    let important = await MailBoxModel.findOne({
      userId: user._id,
      name: 'Important',
    }).populate({
      path: 'mails',
      populate: {
        path: 'from',
        select: 'firstname lastname email',
      },
    });

    if (!important) {
      important = await MailBoxModel.create({
        userId: user._id,
        name: 'Important',
        mails: [],
      });
    }

    let bin = await MailBoxModel.findOne({
      userId: user._id,
      name: 'Bin',
    }).populate({
      path: 'mails',
      populate: {
        path: 'from',
        select: 'firstname lastname email',
      },
    });

    if (!bin) {
      bin = await MailBoxModel.create({
        userId: user._id,
        name: 'Bin',
        mails: [],
      });
    }

    let drafts = await MailBoxModel.findOne({
      userId: user._id,
      name: 'Drafts',
    }).populate({
      path: 'mails',
      populate: {
        path: 'from',
        select: 'firstname lastname email',
      },
    });

    if (!drafts) {
      drafts = await MailBoxModel.create({
        userId: user._id,
        name: 'Drafts',
        mails: [],
      });
    }

    let selectedMailbox;
    switch (mailbox) {
      case 'outbox':
        selectedMailbox = sortMailsByCreatedAt(outbox.mails);
        break;
      case 'inbox':
        selectedMailbox = sortMailsByCreatedAt(inbox.mails);
        break;
      case 'starred':
        selectedMailbox = sortMailsByCreatedAt(starred.mails);
        break;
      case 'important':
        selectedMailbox = sortMailsByCreatedAt(important.mails);
        break;
      case 'bin':
        selectedMailbox = sortMailsByCreatedAt(bin.mails);
        break;
      case 'drafts':
        selectedMailbox = sortMailsByCreatedAt(drafts.mails);
        break;
      default:
        return res
          .status(400)
          .json({ error: 'Mailbox non spécifié ou invalide' });
    }

    res.status(200).json({ [mailbox]: selectedMailbox });
  } catch (error) {
    res.status(500).json({ error: error.message }); // yellis tfamilt thaki x)
  }
});

module.exports = { retrieveMails };

// mohand

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODU4ZDUwZTgyMDNhNTM0NmZmN2ZmMSIsImlhdCI6MTcwNTU3MjA3NCwiZXhwIjoxNzA4MTY0MDc0fQ.6Uq7rJ9i3Cz2Yzh0O6k8Tt1e724zSDWpNlC49HjVme4

// 65858d50e8203a5346ff7ff1
