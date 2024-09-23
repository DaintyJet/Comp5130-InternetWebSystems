const express = require('express');
const router = express.Router();

// MongoDB
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongouri = process.env.MONGO_URI;

const client = new MongoClient(mongouri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

// Admin Page
router.get('/admin', (req, res) => {
    res.send('Response from admin Page');
});

// Admin Page
router.get('/mongotest', (req, res) => {
    res.send('Response from mongoTEST');
    const database = client.db("PSPM");
    database.createCollection('User_Info');
    database.createCollection('User_Data');

});

module.exports = router; 