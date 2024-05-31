const Quiz = require("../model/quiz");
const {
  QUIZ_CREATED,
  QUIZ_NOT_FOUND,
  QUIZ_FETCHED,
  QUIZ_RESULTS_REQUIRED,
  QUESTION_NOT_FOUND,
  QUIZ_COMPLETE,
  QUIZ_DELETED,
  QUIZ_UPDATED,
  QUIZ_NAME_REQUIRED,
  QUIZ_TIMER_REQUIRED,
  QUESTIONS_REQUIRED,
  QUESTION_OPTIONS_INVALID,
  MAX_QUESTIONS_EXCEEDED,
  QUIZ_ANALYSIS_FETCHED
} = require("../utils/messageHelper");
const { successResponse, errorResponse, createError } = require("../utils/responseHelper");

const addQuiz = async (req, res, next) => {
  try {
    const { quizName, questions } = req.body;
      
    if (!quizName) {
      return next(createError(400, QUIZ_NAME_REQUIRED));
    }
    if (!questions) {
      return next(createError(400, QUESTIONS_REQUIRED));
    }

    if (questions.length > 5) {
      return errorResponse(res, 400, MAX_QUESTIONS_EXCEEDED);
    }
  
    for (const question of questions) {
      if (question.options.length < 2 || question.options.length > 4) {
        return errorResponse(res, 400, QUESTION_OPTIONS_INVALID);
      }
    }

    const quiz = await Quiz.create({
      quizName,
      questions,
      createdBy: req.user,
    });
    successResponse(res, 201, QUIZ_CREATED, { quiz });
  } catch (error) {
    next(error);
  }
};

const getQuiz = async (req, res, next) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return errorResponse(res, 404, QUIZ_NOT_FOUND);
    }

    quiz.impressions += 1;
    await quiz.save();

    successResponse(res, 200, QUIZ_FETCHED, { quiz });
  } catch (error) {
    next(error);
  }
};

const getUserQuizzes = async (req, res, next) => {
  try {
    const userQuiz = await Quiz.find({ createdBy: req.user.id });
    successResponse(res, 200, QUIZ_FETCHED, { userQuiz });
  } catch (error) {
    next(error);
  }
};

const deleteQuiz = async (req, res, next) => {
  try {
    const { id } = req.params;

    const quiz = await Quiz.findOneAndDelete({
      _id: id,
      createdBy: req.user,
    });

    if (!quiz) {
      return errorResponse(res, 404, QUIZ_NOT_FOUND);
    }

    successResponse(res, 200, QUIZ_DELETED);
  } catch (error) {
    next(error);
  }
};

const attemptQuiz = async (req, res, next) => {
  try {
    const { results } = req.body;
    const { id } = req.params;

    if (!results) {
      return errorResponse(res, 400, QUIZ_RESULTS_REQUIRED);
    }

    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return errorResponse(res, 404, QUIZ_NOT_FOUND);
    }

    let corrects = 0;

    for (const result of results) {
      const question = quiz.questions.find(
        (q) => q._id.toString() === result.questionId
      );

      if (!question) {
        return errorResponse(res, 404, QUESTION_NOT_FOUND);
      }

      question.attempts += 1;

      if (result.selectedOption === question.answer) {
        corrects += 1;
        question.corrects += 1;
      }
    }

    await quiz.save();

    const userResults = {
      totalQuestions: quiz.questions.length,
      corrects,
    };

    successResponse(res, 200, QUIZ_COMPLETE, userResults);
  } catch (error) {
    next(error);
  }
};

const updateQuiz = async (req, res, next) => {
  try {
    const { quizName, questions } = req.body;
    const { id } = req.params;

    if (!quizName) {
      return next(createError(400, QUIZ_NAME_REQUIRED));
    }
    if (!questions) {
      return next(createError(400, QUESTIONS_REQUIRED));
    }

    if (questions.length > 5) {
      return errorResponse(res, 400, MAX_QUESTIONS_EXCEEDED);
    }
  
    for (const question of questions) {
      if (question.options.length < 2 || question.options.length > 4) {
        return errorResponse(res, 400, QUESTION_OPTIONS_INVALID);
      }
    }

    const quiz = await Quiz.findOneAndUpdate(
      {
        _id: id,
        createdBy: req.user,
      },
      { quizName, questions},
      { new: true }
    );

    if (!quiz) {
      return errorResponse(res, 404, QUIZ_NOT_FOUND);
    }

    successResponse(res, 200, QUIZ_UPDATED, { quiz });
  } catch (error) {
    next(error);
  }
};

const getQuizAnalysis = async (req, res, next) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id, 'impressions createdAt quizName questions');

    if (!quiz) {
      return errorResponse(res, 404, QUIZ_NOT_FOUND);
    }

    quiz.impressions += 1;
    await quiz.save();

    const quizAnalysisData = {
      impressions: quiz.impressions,
      createdAt: quiz.createdAt,
      quizName: quiz.quizName,
      questions: quiz.questions.map(question => ({
        question:question.question,
        attempts: question.attempts,
        corrects: question.corrects,
        incorrect:question.attempts-question.corrects,
      }))
    };

    successResponse(res, 200, QUIZ_ANALYSIS_FETCHED, { quizAnalysisData });
  } catch (error) {
    next(error);
  }
};



module.exports = { addQuiz, getQuiz, attemptQuiz, deleteQuiz, updateQuiz, getUserQuizzes,getQuizAnalysis };
