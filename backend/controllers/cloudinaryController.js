
const cloudinaryController ={


    upload: async (req, res) => {
        try {
            const fileStr = req.body.data; // Assure-toi d'envoyer les fichiers correctement
    
            const uploadResponse = await cloudinary.uploader.upload(fileStr, {
                upload_preset: 'ml_default', // Tu peux configurer un preset dans ton Cloudinary
            });
    
            res.json({ url: uploadResponse.secure_url });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Échec de l\'upload' });
        }
    },



}

export default cloudinaryController;