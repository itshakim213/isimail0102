const express = require('express');
const {
  registerUser,
  authUser,
  searchUsers,
  deleteUsers,
  forgotPassword,
  resetPassword,
} = require('../Controllers/userControllers');
const userModel = require('../models/UserModel');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// router.get('/all', async (req, res) => {
//   res.send(await userModel.find());
// });

router.get('/me', async (req, res) => {
  const user = req.user;
  res.send(await userModel.findById(user._id));
});

router.route('/').post(registerUser).get(searchUsers);
router.post('/signin', authUser);
router.delete('/delete/:id', protect, deleteUsers);
router.post('/forgot', forgotPassword);
router.post('/reset', resetPassword);

module.exports = router;
