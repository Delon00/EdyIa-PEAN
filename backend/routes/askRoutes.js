//backend/routes/askRoutes.js
import express from 'express';
import { body } from 'express-validator';
import askController from '../controllers/askController.js';

const router = express.Router();

router.post('/quiz', [
    body('topic').notEmpty().withMessage('Le sujet est requis.'),
    body('numberOfQuestions').isInt({ min: 1 }).withMessage('Le nombre de questions doit être un entier positif.'),
], askController.quiz);

router.post('/expliq', askController.expliq);

router.post('/summary', askController.summary);

export default router;

