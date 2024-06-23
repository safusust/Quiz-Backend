const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get all questions or filter by subject and chapter
router.get('/', async (req, res) => {
    try {
      const { subject, chapter } = req.query;
      let filter = {};
  
      if (subject) {
        filter.subject = subject;
      }
  
      if (chapter) {
        filter.chapter = chapter;
      }
  
      const questions = await Question.find(filter);
      res.json(questions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Submit an answer
router.post('/answer', async (req, res) => {
  const { questionId, selectedOption } = req.body;
  try {
    const question = await Question.findById(questionId);
    if (question) {
      const isCorrect = question.answer === selectedOption;
      res.json({ isCorrect });
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new question
router.post('/', async (req, res) => {
  const { question, optionsList, answer, subject, chapter } = req.body;
  const newQuestion = new Question({
    question,
    optionsList,
    answer,
    subject,
    chapter,
  });

  try {
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
