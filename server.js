require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRoutes');
const db = require('./models');

const app = express();
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use('/api/auth', authRouter);

//Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));