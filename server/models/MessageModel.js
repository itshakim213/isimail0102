const mongoose = require('mongoose');

// schema et modele pour la collection message
const messageSchema = new mongoose.Schema({
    convId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ConversationModel'
    },
    text: String,
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    attachmentId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AttachmentModel'
    }
});
const MessageModel = mongoose.model('MessageModel', messageSchema);
module.exports = MessageModel;