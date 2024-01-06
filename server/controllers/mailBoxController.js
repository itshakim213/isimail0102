const express = require('express');
const User = require('../models/UserModel');
// const MailModel = require ('../models/MailModel');
const MailBoxModel = require('../models/MailBoxModel');
const asyncHandler = require('express-async-handler');
const MailModel = require ('../models/MailModel');

// les retrouvailles des mails et les classer chaque yiwen ds sa mailbox
// ainsi creer une comme convenu et expliquer la derniere fois
// ihqa sync handler c pour controller et localiser anda thella l erreur
const retrieveMails = asyncHandler(async (req, res) => {
  try {
    // recuper user id des param d req
    const { userId } = req.params;
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
    // si elle existe hamdullah on populate its datas
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
    // reopnse avec tt les mails associées aux differents mailbox
    res.status(200).json({
      outbox: sortMailsByCreatedAt(outbox.mails),
      inbox: sortMailsByCreatedAt(inbox.mails),
      starred: sortMailsByCreatedAt(starred.mails),
      bin: sortMailsByCreatedAt(bin.mails),
    });
  } catch (error) {
    res.status(500).json({ error: error.message }); // yellis teqjunt thaki x)
  }
});



module.exports = { retrieveMails };
