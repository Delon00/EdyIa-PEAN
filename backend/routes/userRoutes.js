import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/getUser/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        console.log('User ID:', userId);

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                jetons: true,
                courses: true,
                accessLogs: true,
                transactions: true,
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        const { password, ...userWithoutPassword } = user;
        res.status(200).json({ user: userWithoutPassword });

    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

export default router;
