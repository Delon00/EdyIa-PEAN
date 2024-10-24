import express from 'express';
import cloudinaryController from '../controllers/cloudinaryController.js';
const router = express.Router();

router.post('/upload', cloudinaryController.upload);

export default router