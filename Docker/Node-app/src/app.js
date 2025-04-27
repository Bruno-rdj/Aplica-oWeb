const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Client } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://mongo:27017/satisfaction', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// PostgreSQL connection
const pgClient = new Client({
    user: 'your_pg_user',
    host: 'postgres',
    database: 'your_pg_database',
    password: 'your_pg_password',
    port: 5432,
});

pgClient.connect();

// Routes
app.post('/survey', async (req, res) => {
    const { name, satisfaction } = req.body;

    // Save to MongoDB
    const survey = new Survey({ name, satisfaction });
    await survey.save();

    // Save to PostgreSQL
    await pgClient.query('INSERT INTO surveys(name, satisfaction) VALUES($1, $2)', [name, satisfaction]);

    res.status(201).send({ message: 'Survey submitted successfully!' });
});

app.get('/surveys', async (req, res) => {
    const surveys = await Survey.find();
    res.status(200).send(surveys);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});