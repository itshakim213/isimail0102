const express = require('express');
const { retrieveMails, toggleStarredEmail } = require('../controllers/mailBoxController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// retrouver les mailbox ;-)
router.get('/retrievemails/:userId', retrieveMails);

// // ajout et retrait des favoris
// router.route('/togglestar/:mailId').put( protect, toggleStarredEmail);

module.exports = router ;
