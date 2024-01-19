const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//modeliser les schemas de notre bdd
const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  dateofbirth: { type: Date },
  email: {
    type: String,
    required: true,
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
    required: true,
    validate: {
      validator: function (value) {
        // Cette fonction est utilisée comme validateur
        return /^.{8,}$/.test(value);
        // Vérifie que le mot de passe a au moins 8 caractères
        if (!/^.{8,}$/.test(value)) {
          return false;
        }
        // Vérifie qu'au moins un caractère est une majuscule
        const majuscules = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (!/[A-Z]/.test(value)) {
          return false;
        }

        // Vérifie qu'au moins un caractère est un chiffre
        const chiffres = '0123456789';
        if (!/[0-9]/.test(value)) {
          return false;
        }

        return true;
      },
      message:
        'Veuillez entrer un mot de passe contenant au moins 8caractéres incluant une majuscule au moins et un chiffre au minimum.',
    },
  },
  isAdmin: { type: Boolean, default: false },
  // securityQuestion:
  securityAnswer: { type: String },
  isResettingPassword: { type: Boolean, default: false },
  // secureMail: {
  //   type: String,
  //   // required: true,
  //   validate: {
  //     validator: function (value) {
  //       // cette fonction est utilisée comme validateur
  //       return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // un modèle spécifique d'adresse email
  //       // [^\s@] tous les caracteres sauf les espaces et @
  //     },
  //     message: 'Veuillez entrer une adresse email valide.',
  //   },
  // },
  // twoFactorsAuthentication: { type: Boolean, default: false },
  // otp: {
  //   type: String,
  //   default: null,
  // },
});

// userSchema.methods.generateOTP = async function () {
//   // generer un code aleatoire de 6 chiffres
//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   this.otp = await bcrypt.hash(otp, 10);
//   return otp;
// };

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
module.exports = User;
