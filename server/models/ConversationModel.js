const mongoose = require('mongoose');

// schema et modele pour la collection conversation
const conversationSchema = new mongoose.Schema({
    nameConv:{type:String} ,
    isGroup:{
        type: Boolean,
        default: false,
    },
    convAdmin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'

    },
    userIds:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    latestMessageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MessageModel'
    },
});

const ConversationModel = mongoose.model('ConversationModel', conversationSchema);
module.exports = ConversationModel;