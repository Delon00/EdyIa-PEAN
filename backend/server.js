const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/routes');
const dashboardRoutes = require('./routes/routes');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);



const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Backend is running on http://localhost:${port}`);
});
