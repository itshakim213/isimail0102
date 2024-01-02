const express = require('express');
const { registerUser, authUser, searchUsers} = require('../Controllers/userControllers');

const router = express.Router();

router.route('/').post(registerUser).get(searchUsers);
router.post('/signin', authUser);

module.exports = router;
