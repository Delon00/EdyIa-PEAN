const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();

exports.register = async (req, res) => {
    const { nom, prenom, email, password } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Utilisateur déjà existant' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                nom,
                prenom,
                email,
                password: hashedPassword,
            },
        });

        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (err) {
        console.error("Erreur lors de l'inscription :", err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body; 

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        
        if (!user) {
            return res.status(400).json({ message: 'Utilisateur non trouvé' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role }, 
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );


        const { password: _, ...userData } = user;

        // Réponse avec le token et les données de l'utilisateur
        res.status(200).json({ token, user: userData });
        console.log("Données utilisateur :", userData);

    } catch (err) {
        console.error("Erreur lors de la connexion :", err);
        res.status(500).json({ message: `Erreur serveur: ${err.message}` });
    }
};



