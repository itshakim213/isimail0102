const mongoose = require('mongoose');

const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
    voiceCall: {
      isActive: { type: Boolean, default: false }, // Indique si un appel vocal est en cours dans cette conversation
      participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Liste des participants à l'appel vocal
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

const Chat = mongoose.model('Chat', chatModel);
module.exports = Chat;
