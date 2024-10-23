//backend/controller/askController.js
import fetch from 'node-fetch';
import { validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const askController = {
    quiz: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Erreurs de validation:', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }
    
        const { topic, numberOfQuestions } = req.body;
        console.log('Données reçues:', { topic, numberOfQuestions });
        const API_URL = 'https://api-inference.huggingface.co/models/deepset/roberta-base-squad2'; 
        const API_TOKEN = process.env.HUGGING_FACE_API_KEY;
    
        if (!API_TOKEN) {
            return res.status(500).json({ error: 'API token Hugging Face non défini.' });
        }
    
        try {
            // Étape 1: Générer le contexte
            const contextResponse = await fetch(API_URL, {
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ inputs: `Peux-tu générer un contexte sur le sujet: ${topic}?` }),  
            });
    
            const contextResult = await contextResponse.json();
            console.log("Réponse de l'API pour le contexte:", contextResult);
            
            const context = contextResult[0]?.generated_text || 'Aucun contexte généré.';
                
            // Étape 2: Générer des questions à partir du contexte
            const questionsResponse = await fetch(API_URL, {
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    inputs: {
                        question: `Peux tu générer ${numberOfQuestions} questions pour étudiant sur le sujet: ${topic}`,
                        context: context
                    }
                }),  
            });
    
            const questionsResult = await questionsResponse.json();
            console.log("Réponse de l'API pour les questions:", questionsResult);
    
            // Extraction des questions de la réponse
            const questions = questionsResult.generated_text ? questionsResult.generated_text.split('\n') : [];
            
            if (questions.length) {
                // Filtrer les questions pour n'en garder que le nombre demandé
                const filteredQuestions = questions.slice(0, numberOfQuestions);
                res.json({ quiz: filteredQuestions });
            } else {
                res.status(500).json({ error: 'Aucune question générée par l\'API Hugging Face.' });
            }
        } catch (err) {
            console.error("Erreur lors de la génération du quiz :", err.message);
            res.status(500).json({ error: `Erreur lors de la génération du quiz: ${err.message}` });
        }
    },
    

    summary: async (req, res) => {
        const { text } = req.body;
        const API_URL = 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn';
        const API_TOKEN = process.env.HUGGING_FACE_API_KEY;

        if (!API_TOKEN) {
            return res.status(500).json({ error: 'API token Hugging Face non défini.' });
        }

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ inputs: text }),
            });

            const result = await response.json();
            
            if (result && result[0] && result[0].summary_text) {
                res.json({ summary: result[0].summary_text });
            } else {
                res.status(500).json({ error: 'Erreur : réponse inattendue de l\'API Hugging Face.' });
            }
        } catch (err) {
            console.error("Erreur lors de la génération du résumé :", err.message);
            res.status(500).json({ error: 'Erreur lors de la génération du résumé.' });
        }
    },


    expliq: async (req, res) => {

    
        const { context, question, userId } = req.body;

        console.log('Données reçues:', { context, question });
        const API_URL = 'https://api-inference.huggingface.co/models/deepset/roberta-base-squad2'; 
        const API_TOKEN = process.env.HUGGING_FACE_API_KEY;
    
        if (!API_TOKEN) {
            return res.status(500).json({ error: 'API token Hugging Face non défini.' });
        }
    
        try {

            const userJetons = await prisma.jeton.findFirst({
                where: {userId: userId}
            });


            if (userJetons.amount < 15) {
                return res.status(400).json({ error: 'Nombre insuffisant de jetons 🥲.' });
            }
            
            const questionsResponse = await fetch(API_URL, {
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    inputs: {
                        question: question,
                        context: context
                    }
                }),  
            });
    
            const questionsResult = await questionsResponse.json();
            console.log("Réponse de l'API pour les questions:", questionsResult);
    
            if (!questionsResult || typeof questionsResult !== 'object' || !questionsResult.answer) {
                return res.status(500).json({ error: 'Aucune question générée par l\'API Hugging Face.' });
            }

        

            const updatedJetons = await prisma.jeton.update({
                where: { id: userJetons.id },
                data: {amount: { decrement: 15 }}
            });

            res.json({ expliq: questionsResult });
    
        } catch (err) {
            console.error("Erreur lors de la génération  :", err.message);
            res.status(500).json({ error: `Erreur lors de la génération de l'explication: ${err.message}` });
        }
    }
    
};

export default askController;
