const express = require('express');
const router = express.Router();

// MongoDB
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongouri = process.env.MONGO_URI;

// Default Home Page
router.get('/', (req, res) => {
    res.send('Response Default');
});
// User Home Page
router.get('/vault', (req, res) => {
    res.send('Response from vault');
});


// User Login Management
router.get('/login', (req, res) => {
    res.send('Response Login Get');
});

router.post('/login', (req, res) => {
    res.send('Response from Login Post');
});

module.exports = router; 