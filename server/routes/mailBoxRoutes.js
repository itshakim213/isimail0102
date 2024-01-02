const express = require('express');
const { retrieveMails } = require('../controllers/mailBoxController');

const router = express.Router();

// retrouver les mailbox ;-)
router.get('/retrievemails/:userId', retrieveMails);

module.exports = router ;
