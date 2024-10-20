import express from 'express';
import authController from '../controllers/authController.js'; // Assure-toi que le chemin est correct
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

export default router; 
