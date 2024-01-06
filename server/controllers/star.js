const toggleStarredEmail = asyncHandler(async (req, res) => {
  try {
    // mail id et la valuer de l'etoile nni
    const { mailId, value } = req.body;
    // chrche si yella le mail dans mail model qvel
    const mail = await MailModel.findById(mailId);
    console.log('Found Mail:', mail);
    if (!mail) {
      return res.status(404).json({ error: 'Mail not found' }); // sinon 404
    }

    // mail.starred = !value; // changé la valuer de leoille
    // await mail.save(); // et l' enregistrer
    console.log('Mail ID:', mailId);
    console.log('Mail Object:', mail);

    const result = await MailBoxModel.findOneAndUpdate(
      { name: 'Starred', mails: new ObjectId(mail._id) },
      value
        ? { $addToSet: { mails: new ObjectId(mail._id) } }
        : { $pull: { mails: new ObjectId(mail._id) } },
      { new: true },
    );
    console.log('findOneAndUpdate Result:', result);

    const starredMailbox = await MailBoxModel.findOne({ name: 'Starred' }); // ca c comme d hab
    console.log('Starred Mailbox:', starredMailbox);
    if (!starredMailbox) {
      return res.status(404).json({ error: 'Starred mailbox not found' });
    }
    // si la valuer chenge genre cliqué negh activé anyway donc on ajooute ce mail er dossir favoris
    // if (value) {
    //   // genre si yech3el etoile nni donc on lajout ar favoris
    //   starredMailbox.mails.push(mail);
    // } else {
    //   // ma thekhsi on le retire si favoris
    //   //on recupere index de mail en qst
    //   const index = starredMailbox.mails.indexOf(mail);
    //   // avec l index genre le vecteur nni n mails [] ad ksedh sges yiwen
    //   if (index > -1) {
    //     starredMailbox.mails.splice(index, 1);
    //   }
    // }
    if (value) {
      starredMailbox.mails.addToSet(new ObjectId(mail._id));
    } else {
      starredMailbox.mails.pull(new ObjectId(mail._id));
    }

    await starredMailbox.save(); // saving it ;p

    res.status(201).json('Value is updated'); // MàJ
  } catch (error) {
    res.status(500).json({ error: error.message }); // bjnr
  }
});
