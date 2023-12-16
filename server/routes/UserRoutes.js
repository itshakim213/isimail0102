const express = require('express');
const { registerUser, authUser } = require('../Controllers/userControllers');

const router = express.Router();

router.route('/').post(registerUser);
router.post('/signin', authUser);

module.exports = router;
