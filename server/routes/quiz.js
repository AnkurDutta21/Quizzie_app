const express = require('express');
const verifyToken = require('../middleware/authHandler');
const { addQuiz, getQuiz, getUserQuizzes, updateQuiz, deleteQuiz, attemptQuiz } = require('../controller/quiz');


const router = express.Router()

router.post('/addQuiz',verifyToken,addQuiz)
router.get('/quiz/:id',getQuiz)
router.get('/userQuiz',verifyToken,getUserQuizzes)
router.patch('/updateQuiz/:id',verifyToken,updateQuiz)
router.delete('/deleteQuiz/:id',verifyToken,deleteQuiz)
router.post('/attemptQuiz/:id',attemptQuiz)
module.exports = router;