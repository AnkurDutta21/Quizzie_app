const mongoose = require('mongoose');
const validator = require('validator');

const optionSchema = new mongoose.Schema({
  text: {
    type: String
  },
  image: {
    type: String,
  }
});

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  optionsType: {
    type: String,
    enum: ['text', 'image', 'textAndImage'],
    required: true
  },
  options: {
    type: [optionSchema],
    required: true
  },
  answer: {
    type: Number,
    required: true,
    default: 0
  },
  attempts: {
    type: Number,
    default: 0
  },
  corrects: {
    type: Number,
    default: 0
  }
});

const quizSchema = new mongoose.Schema({
  category: {
    type: String,
    default: 'quiz'
  },
  quizName: {
    type: String,
    required: true
  },
  questions: {
    type: [questionSchema],
    required: true
  },
  timer: {
    type: Number,
    default: null
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

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
