const mongoose = require('mongoose');

// schema et modele pour la collection Mail
const mailSchema = new mongoose.Schema({
  from: {
    //le soucis qui se pose on Cast ObjectID (645473783) en string (sia@gmail.com)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //   attachmentId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'AttachmentModel',
  //   },
});
// modele pour la collection Mail
const MailModel = mongoose.model('Mail', mailSchema);
module.exports = MailModel;
