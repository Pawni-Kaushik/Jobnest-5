const express = require('express');
const router = express.Router();
const { sendMessage } = require('../controllers/messageController');
const protect = require('../middleware/authMiddleware');

router.post('/send', protect, sendMessage);
// Expand with: getMessages, deleteMessage, markAsRead

module.exports = router;