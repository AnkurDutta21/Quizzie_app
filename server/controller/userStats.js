const Poll = require("../model/poll");
const Quiz = require("../model/quiz");
const { INVALID_REQUEST, DATA_FETCHED } = require("../utils/messageHelper");
const { errorResponse, successResponse } = require("../utils/responseHelper");

const getTrendings = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return errorResponse(res, 401, INVALID_REQUEST);
    }
    const quizzes = await Quiz.find({ createdBy: user });
    const polls = await Poll.find({ createdBy: user });
    const filteredData = [
      ...quizzes.filter((quiz) => quiz.impressions > 10),
      ...polls.filter((poll) => poll.impressions > 10),
    ];

    filteredData.sort((a, b) => b.impressions - a.impressions);
    successResponse(res, 200, DATA_FETCHED,{
      result: filteredData.length,
      data: { ...filteredData },
    });
  } catch (error) {
    next(error);
  }
};

const getStats = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return errorResponse(res, 401, INVALID_REQUEST);
    }
    const quizzes = await Quiz.find({ createdBy: user });
    const polls = await Poll.find({ createdBy: user });

    const QuizAndPollData = {};
    QuizAndPollData.totalQuizzesAndPolls = quizzes.length + polls.length;

    let totalQuizzesQuestions = 0;
    let totalPollsQuestions = 0;

    quizzes.forEach((quiz) => {
      totalQuizzesQuestions += quiz.questions.length;
    });

    polls.forEach((poll) => {
      totalPollsQuestions += poll.questions.length;
    });

    QuizAndPollData.totalQuestions = totalPollsQuestions + totalQuizzesQuestions;

    let totalPollImpressions = 0;
    let totalQuizImpressions = 0;

    quizzes.forEach((quiz) => {
      totalQuizImpressions += quiz.impressions;
    });

    polls.forEach((poll) => {
      totalPollImpressions += poll.impressions;
    });

    QuizAndPollData.totalImpressions = totalPollImpressions + totalQuizImpressions;
    successResponse(res, 200,DATA_FETCHED ,{ ...QuizAndPollData });
  } catch (error) {
    next(error);
  }
};

const getAllUserPollsAndQuizes = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return errorResponse(res, 401, INVALID_REQUEST);
    }

    const quizzes = await Quiz.find(
      { createdBy: user },
      "impressions quizName category createdAt"
    );
    const polls = await Poll.find(
      { createdBy: user },
      "impressions pollName category createdAt"
    );

    const quizzesFormatted = quizzes.map((quiz) => ({
      id: quiz._id,
      name: quiz.quizName,
      type: quiz.category,
      impressions: quiz.impressions,
      createdAt: quiz.createdAt,
    }));

    const pollsFormatted = polls.map((poll) => ({
      id: poll._id,
      name: poll.pollName,
      type: poll.category,
      impressions: poll.impressions,
      createdAt: poll.createdAt,
    }));

    const allQuizesAndPolls = [...quizzesFormatted, ...pollsFormatted];

    allQuizesAndPolls.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    successResponse(res, 200, DATA_FETCHED,{
      results: allQuizesAndPolls.length,
      data: allQuizesAndPolls,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUserPollsAndQuizes, getStats, getTrendings };
