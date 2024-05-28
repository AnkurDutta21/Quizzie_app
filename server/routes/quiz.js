const express = require('express');
const verifyToken = require('../middleware/authHandler');
const { addQuiz, getQuiz, getUserQuizzes, updateQuiz, deleteQuiz, attemptQuiz, getQuizAnalysis } = require('../controller/quiz');


const router = express.Router()

router.post('/addQuiz',verifyToken,addQuiz)
router.get('/quiz/:id',getQuiz)
router.get('/userQuiz',verifyToken,getUserQuizzes)
router.patch('/updateQuiz/:id',verifyToken,updateQuiz)
router.delete('/deleteQuiz/:id',verifyToken,deleteQuiz)
router.post('/attemptQuiz/:id',attemptQuiz)
router.get('/getQuizAnalysis/:id',verifyToken,getQuizAnalysis)
module.exports = router;