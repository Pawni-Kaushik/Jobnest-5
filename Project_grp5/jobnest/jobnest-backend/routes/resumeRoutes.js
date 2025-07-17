const express = require('express');
const router = express.Router();
const { uploadResume } = require('../controllers/resumeController');
const protect = require('../middleware/authMiddleware');

router.post('/upload', protect, uploadResume);
// You can later add: getResume, updateResume

module.exports = router;