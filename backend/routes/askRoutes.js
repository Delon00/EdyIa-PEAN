const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const askController = require('../controllers/askController');

router.post('/generate-quiz', [
    body('topic').isString().notEmpty(),
    body('numberOfQuestions').isInt({ gt: 0 })
], askController.generateQuiz);

module.exports = router;
