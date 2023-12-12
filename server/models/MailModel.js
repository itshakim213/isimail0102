const mongoose = require('mongoose');

// schema et modele pour la collection Mail
const mailSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    subject: String,
    body: String,
    attachmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AttachmentModel',
    },
  },
  { timestamps: true },
);
// modele pour la collection Mail
const MailModel = mongoose.model('MailModel', mailSchema);
module.exports = MailModel;
