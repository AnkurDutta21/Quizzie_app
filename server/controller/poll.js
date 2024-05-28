const Poll = require("../model/poll");
const {
  POLL_NOT_FOUND,
  POLL_FETCHED,
  INVALID_REQUEST,
  POLL_CREATED,
  POLL_UPDATED,
  POLL_RESULTS_REQUIRED,
  QUESTION_NOT_FOUND,
  POLL_COMPLETE,
  POLL_DELETED,
  MAX_QUESTIONS_EXCEEDED,
  QUESTION_OPTIONS_INVALID,
  OUT_OF_BOUND,
  POLL_ANALYSIS_FETCHED,
} = require("../utils/messageHelper");
const { errorResponse, successResponse } = require("../utils/responseHelper");

const getPoll = async (req, res, next) => {
  try {
    const { id } = req.params;
    const poll = await Poll.findById(id);

    if (!poll) {
      return errorResponse(res, 404, POLL_NOT_FOUND);
    }

    poll.impressions += 1;
    poll.save();
    successResponse(res, 200, POLL_FETCHED, { poll });
  } catch (error) {
    next(error);
  }
};

const getUsersPolls = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userPolls = await Poll.find({ createdBy: userId });
    if (!userPolls) {
      return errorResponse(res, 404, POLL_NOT_FOUND);
    }
    successResponse(res, 200, POLL_FETCHED, {
      pollsLength: userPolls.length,
      data: { userPolls },
    });
  } catch (error) {
    next(error);
  }
};

const addPoll = async (req, res, next) => {
  try {
    const { pollName, questions } = req.body;

    if (!pollName || !questions) {
      return errorResponse(res, 400, INVALID_REQUEST);
    }

    if (questions.length > 5) {
      return errorResponse(res, 400, MAX_QUESTIONS_EXCEEDED);
    }

    for (const question of questions) {
      if (question.options.length < 2 || question.options.length > 4) {
        return errorResponse(res, 400, QUESTION_OPTIONS_INVALID);
      }
    }

    const poll = await Poll.create({
      pollName,
      questions,
      createdBy: req.user,
    });

    successResponse(res, 201, POLL_CREATED, { poll });
  } catch (error) {
    next(error);
  }
};

const updatePoll = async (req, res, next) => {
  try {
    const { pollName, questions } = req.body;
    const { id } = req.params;

    if (questions.length > 5) {
      return errorResponse(res, 400, MAX_QUESTIONS_EXCEEDED);
    }

    for (const question of questions) {
      if (question.options.length < 2 || question.options.length > 4) {
        return errorResponse(res, 400, QUESTION_OPTIONS_INVALID);
      }
    }

    const poll = await Poll.findOneAndUpdate(
      {
        _id: id,
        createdBy: req.user,
      },
      { pollName, questions },
      { new: true }
    );

    if (!poll) {
      return errorResponse(res, 404, POLL_NOT_FOUND);
    }

    successResponse(res, 200, POLL_UPDATED, { poll });
  } catch (error) {
    next(error);
  }
};

const attemptPoll = async (req, res, next) => {
  try {
    const { results } = req.body;
    const { id } = req.params;

    if (!results) {
      return errorResponse(res, 400, POLL_RESULTS_REQUIRED);
    }

    const poll = await Poll.findById(id);

    if (!poll) {
      return errorResponse(res, 404, POLL_NOT_FOUND);
    }

    for (const result of results) {
      const question = poll.questions.find((q) => q._id == result.questionId);

      if (!question) {
        return errorResponse(res, 404, QUESTION_NOT_FOUND);
      }

      const index = result.selectedOption;

      if (question.options.length <= index) {
        return errorResponse(res, 400, OUT_OF_BOUND);
      }

      question.options[index].votes += 1;
    }

    await poll.save();

    successResponse(res, 200, POLL_COMPLETE, { poll });
  } catch (error) {
    next(error);
  }
};

const deletePoll = async (req, res, next) => {
  try {
    const { id } = req.params;

    const poll = await Poll.findOneAndDelete({
      _id: id,
      createdBy: req.user,
    });

    if (!poll) {
      return errorResponse(res, 404, POLL_NOT_FOUND);
    }
    successResponse(res, 200, POLL_DELETED);
  } catch (error) {
    next(error);
  }
};
const getPollAnalysis = async (req, res, next) => {
  try {
    const { id } = req.params;
    const poll = await Poll.findById(id, 'impressions createdAt pollName questions');

    if (!poll) {
      return errorResponse(res, 404, POLL_NOT_FOUND);
    }

    poll.impressions += 1;
    await poll.save();

    const pollAnalysisData = {
      createdAt: poll.createdAt,
      impressions: poll.impressions,
      questions: poll.questions.map(question => ({
        question: question.question,
        options: question.options.map(option => ({
          votes: option.votes,
        })),
      })),
    };

    return successResponse(res, 200, POLL_ANALYSIS_FETCHED, { pollAnalysisData });
  } catch (error) {
    next(error);
  }
};



module.exports = { getPoll, updatePoll, addPoll, attemptPoll, deletePoll, getUsersPolls,getPollAnalysis };
