const express = require('express');
const { getTrendings, getStats, getAllUserPollsAndQuizes } = require('../controller/userStats');
const verifyToken = require('../middleware/authHandler');
const router = express.Router();

router.get('/trendings', verifyToken, getTrendings);
router.get('/stats', verifyToken, getStats);
router.get('/getAllpollsAndQuizzes', verifyToken, getAllUserPollsAndQuizes);

module.exports = router;