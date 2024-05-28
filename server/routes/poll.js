const express = require('express');
const verifyToken = require('../middleware/authHandler');
const { addPoll, getPoll, getUsersPolls, updatePoll, deletePoll, attemptPoll, getPollAnalysis } = require('../controller/poll');


const router = express.Router()

router.post('/addPoll',verifyToken,addPoll)
router.get('/Poll/:id',getPoll)
router.get('/userPolls',verifyToken,getUsersPolls)
router.patch('/updatePoll/:id',verifyToken,updatePoll)
router.delete('/deletePoll/:id',verifyToken,deletePoll)
router.post('/attemptPoll/:id',attemptPoll)
router.get('/getPollAnalysis/:id',verifyToken,getPollAnalysis)
module.exports = router;