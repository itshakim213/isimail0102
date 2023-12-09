const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true],
  },
  lastname: {
    type: String,
    required: [true],
  },
  password: {
    type: String,
    required: [true],
  },
  dateofbrith: {
    type: Date,
    required: [true],
  },
  email: {
    type: String,
    validate: {
      validator: function (value) {
        // cette fonction est utilisée comme validateur
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // un modèle spécifique d'adresse email
        // [^\s@] tous les caracteres sauf les espaces et @
      },
      message: 'Veuillez entrer une adresse email valide.',
    },
  },
  password: { 
    type: String,
    required: true 
  }
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
