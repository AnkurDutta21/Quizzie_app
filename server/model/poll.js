const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: {
    type: String
  },
  image: {
    type: String,
  },
  votes: {
    type: Number,
    default: 0
  }
});

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  optionsType: {
    type: String,
    enum: ["Text", "Image URL", "Text & Image URL"],
    required: true
  },
  options: {
    type: [optionSchema],
    required: true
  }
});

const pollSchema = new mongoose.Schema({
  category: {
    type: String,
    default: 'poll'
  },
  pollName: {
    type: String,
    required: true
  },
  questions: {
    type: [questionSchema],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  impressions: {
    type: Number,
    default: 0
  },
  createdBy: mongoose.ObjectId
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
