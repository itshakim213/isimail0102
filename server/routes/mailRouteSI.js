const express = require ('express');
const { forwardEmail, sendEmail, receiveEmail, moveToBin, deleteMail, toggleStarredEmail, replyToEmail, importantMails } = require ('../controllers/mailController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Env mail
router.route('/sendemail').post(protect, sendEmail);

// rep mail
router.route('/reply').post(protect, replyToEmail);

// Rec mail
router.route('/receiveemail/:to').get(protect, receiveEmail);


// ajout et retrait des favoris
router.route('/togglestar').put( protect, toggleStarredEmail);

router.route('/important').put( protect, importantMails);

// deplace vers corbelle
router.route('/movetobin').put( protect, moveToBin);

// Delete mail
router.route('/deletemail').delete( protect, deleteMail);

// Forward mail
router.route('/forwardemail').post( protect, forwardEmail);

module.exports = router;