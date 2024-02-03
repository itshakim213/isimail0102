const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { startVoiceCall } = require('../Controllers/chatControllers');

const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
} = require('../Controllers/chatControllers');

const router = express.Router();

router.route('/').post(protect, accessChat);
router.route('/').get(protect, fetchChats);
router.route('/group').post(protect, createGroupChat);
router.route('/rename').put(protect, renameGroup);
router.route('/groupremove').put(protect, removeFromGroup);
router.route('/groupadd').put(protect, addToGroup);
router.route('/:chatId/voice-call').post(protect, startVoiceCall);

module.exports = router;
