const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
});

const questionSchema = new mongoose.Schema({
  question: {
    text: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
  },
  optionsList: [optionSchema], 
  answer: {
    text: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
  },
  subject: {
    type: String,
    enum: ['Physics 1st Paper', 'Physics 2nd Paper',
           'Chemistry 1st Paper', 'Chemistry 2nd Paper',
           'Math 1st Paper', 'Math 2nd Paper',
           'Biology 1st Paper', 'Biology 2nd Paper',
           'ICT', 'Bangla 1st Paper', 'Bangla 2nd Paper'
    ],
    required: true,
  },
  chapter: {
    type: String,
    enum: ['Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4',
           'Chapter 5', 'Chapter 6', 'Chapter 7', 'Chapter 8',
           'Chapter 9', 'Chapter 10',
    ],
    required: true,
  },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
