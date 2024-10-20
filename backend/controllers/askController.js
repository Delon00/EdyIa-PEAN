const OpenAI = require('openai');
const { validationResult } = require('express-validator');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


exports.generateQuiz = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { topic, numberOfQuestions } = req.body;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "Tu es un assistant qui crée des quizz pour aider les étudiants à réviser." },
                { role: "user", content: `Crée un quizz de ${numberOfQuestions} questions avec leurs réponses sur le sujet suivant : ${topic}. Formate les résultats sous forme de liste avec la question et la réponse correspondante.` },
            ],
        });

        const quizText = response.data.choices[0].message.content;


        const quizArray = quizText.split('\n').filter(line => line.trim() !== '').map((item) => {
            const [question, answer] = item.split('?');
            return {
                question: question ? question.trim() + '?' : '',
                answer: answer ? answer.trim() : ''
            };
        });

        res.json({ quiz: quizArray });
    } catch (err) {
        if (err.response) {
            res.status(err.response.status).json({ error: err.response.data });
        } else {
            console.error("Erreur lors de la génération du quizz :", err);
            res.status(500).json({ error: 'Erreur lors de la génération du quizz.' });
        }
    }
}
