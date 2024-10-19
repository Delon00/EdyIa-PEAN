// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Backend is running on http://localhost:${port}`);
});
