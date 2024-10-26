
const cloudinaryController ={


    upload: async (req, res) => {
        try {
            const fileStr = req.body.data; 
    
            const uploadResponse = await cloudinary.uploader.upload(fileStr, {
                upload_preset: 'ml_default', 
            });
    
            res.json({ url: uploadResponse.secure_url });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Échec de l\'upload' });
        }
    },



}

export default cloudinaryController;