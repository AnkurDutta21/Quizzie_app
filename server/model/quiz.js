const mongoose = require('mongoose');

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
    enum: ["Text", "Image URL", "Text & Image URL"],
    required: true
  },
  options: {
    type: [optionSchema],
    required: true
  },
  timer: {
    type: Number,
    enum:[0,5000,10000],
    default: 0
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
