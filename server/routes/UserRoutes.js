const express = require('express');
const {
  registerUser,
  authUser,
  searchUsers,
} = require('../Controllers/userControllers');
const userModel = require('../models/UserModel');

const router = express.Router();

router.get('/all', async (req, res) => {
  res.send(await userModel.find());
});

router.get('/me', async (req, res) => {
  const user = req.user;
  res.send(await userModel.findById(user._id));
});

router.route('/').post(registerUser)
router.get('/search', searchUsers);
router.post('/signin', authUser);

module.exports = router;