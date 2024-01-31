const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `server/controllers/uploads`); // Dossier où les pièces jointes seront stockées
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`); // Nom du fichier
    },
  }),
});

// const path = require('path');

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname, 'uploads')); // Absolute path to the 'uploads' directory
//     },
//     filename: function (req, file, cb) {
//       cb(null, `${Date.now()}_${file.originalname}`);
//     },
//   }),
// });

module.exports = upload;
