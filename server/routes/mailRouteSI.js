const express = require ('express');
const { forwardEmail, sendEmail, receiveEmail, moveToBin, deleteMail, toggleStarredEmail } = require ('../controllers/mailController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Env mail
router.route('/sendemail').post(protect, sendEmail);

// Rec mail
router.route('/receiveemail/:to').get(protect, receiveEmail);

// Recupérer yeuk les mails
//router.get('/retrievemails/:userId', retrieveMails);

// ajout et retrait des favoris
router.route('/togglestar').put( protect, toggleStarredEmail);

// deplace vers corbelle
router.route('/movetobin').put( protect, moveToBin);

// Delete mail
router.route('/deletemail').delete( deleteMail);

// Forward mail
router.route('/forwardemail').post( protect, forwardEmail);

module.exports = router;