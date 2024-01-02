const express = require ('express');
const { forwardEmail, sendEmail, receiveEmail, moveToBin, deleteMail, toggleStarredEmail } = require ('../controllers/mailController');
//const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Env mail
router.route('/sendemail').post(sendEmail);

// Rec mail
router.get('/receiveemail/:to', receiveEmail);

// Recupérer yeuk les mails
//router.get('/retrievemails/:userId', retrieveMails);

// ajout et retrait des favoris
router.put('/togglestar/:emailId', toggleStarredEmail);

// deplace vers corbelle
router.put('/movetobin', moveToBin);

// Delete mail
router.delete('/deletemail', deleteMail);

// Forward mail
router.post('/forwardemail', forwardEmail);

module.exports = router;