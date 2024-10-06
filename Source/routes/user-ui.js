const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const my_db_layer = require('../usr_modules/database')
const my_auth_layer = require('../usr_modules/jsonweb_token')

// MongoDB
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongouri = process.env.MONGO_URI;

// Default Home Page
router.get('/', (req, res) => {
    res.send('Response Default');
});
// User Home Page
router.get('/vault', my_auth_layer.authenticateJWTFromCookie, (req, res) => {
    res.send('Response from vault');
});

// User Registration
router.get('/register', (req, res) => {
    res.send(`<form method="post" action="/register">
                <input type="text" name="username" placeholder="Username" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Register</button>
              </form><p>Reaplace with HTML</p>`);
  });

  // Register route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if user already exists
      const existingUser = await my_db_layer.find_user_auth(username);
      console.log(existingUser)
      if (existingUser) {
        // Toggle Logging
        console.log("PINE" + existingUser);
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Toggle Logging DEBUG
      console.log("PINE: Passwd: " + password);
      
      // Create and save new user
      const newUser = await my_db_layer.insert_user(username, hashedPassword, "Normal");
      // Toggle Logging INFO
      console.log("PINE:" + newUser);
      
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.log("PINE:" + error);
      res.status(500).json({ message: 'Error registering user' });
    }
  });
  

// User Login Management
router.get('/login', (req, res) => {
    res.send(`<form method="post" action="/login">
                <input type="text" name="username" placeholder="Username" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Login</button>
              </form> <p>Reaplace with HTML</p>`);
  });

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if user exists
      const user = await my_db_layer.find_user_auth(username);
      if (!user) {
        console.log("PINE" + user);
        return res.status(400).json({ message: 'REPLACE HTML: User not found' });
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        // Toggle Logging INFO
        console.log(password + "does not match");
        return res.status(400).json({ message: 'REPLACE HTML: Invalid credentials' });
      }
  
      // Generate JWT
      const token = my_auth_layer.generate_jwt(user)// jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  
      res.cookie('jwtToken', token, {
          httpOnly: true,  // Toggle
          secure: false,    // Toggle only HTTPS
          maxAge: 3600000  // Cookie expiration (1 hour)
        });
      
      // Send token to client
      res.json({ token });
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: 'Error logging in' });
    }
  });

module.exports = router; 