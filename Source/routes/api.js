const express = require('express');
const router = express.Router();

// MongoDB
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongouri = process.env.MONGO_URI;

// Create Users, and manage other resources
router.post('/api/admin', (req, res) => {
    res.send('Response from api admin');
});

// Get Auth Token from the server
router.post('/api/auth', (req, res) => {
    res.send('Response api auth');
});

// Access Internal Page Information
router.get('/api/internal', (req, res) => {
    res.send('Response api internal');
});

// Patch current Vuln config
router.patch('/api/vulns', (req, res) => {
    res.send('Response api vulns');
});

// Patch current logging config
router.patch('/api/tlog', (req, res) => {
    res.send('Response api tlog');
});

// Get set of most recent logs
router.get('/api/alog', (req, res) => {
    res.send('Response api alog');
});

// Get specified entrie's password
router.get('/api/passwd', (req, res) => {
    res.send('Response api passwd');
});

// Get share password with specified user
router.post('/api/share', (req, res) => {
    res.send('Response api share');
});

module.exports = router; 