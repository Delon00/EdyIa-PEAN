// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const askRoutes = require('./routes/askRoutes');
const OpenAI = require('openai');
require('dotenv').config(); 

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/ask', askRoutes);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


app.post('/ask', async (req, res) => {
    const { question } = req.body;

    try {
        
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "Tu es un assistant qui aide les étudiants à comprendre leurs cours." },
                { role: "user", content: question },
            ],
        });

        const answer = response.data.choices[0].message.content;
        res.json({ answer });

    } catch (err) {
        console.error("Erreur lors de l'appel à OpenAI :", err);
        res.status(500).json({ error: 'Erreur lors de la génération de la réponse.' });
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Backend is running on http://localhost:${port}`);
});
