const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const my_db_layer = require('../usr_modules/database')
const my_auth_layer = require('../usr_modules/jsonweb_token')
const my_vulns_layer = require('../usr_modules/vuln_manager')


// MongoDB
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongouri = process.env.MONGO_URI;

// Create Users, and manage other resources
router.post('/api/admin', (req, res) => {
    res.send('Response from api admin');
});

// Get Auth Token from the server
// This is the same code as the
// login page but it will return
// JSON
router.post('/api/auth', async (req, res) => {
// Pull the username and password from the
	// request body.
	const { username, password } = req.body;

	// Ensure we received a valid request body
	if (typeof username === 'undefined' || typeof password === 'undefined') {
		return res.status(400).json({ message: 'REPLACE JSON: Invalid request body' })
	}

	try {
		// Check if user exists
		const user = await my_db_layer.find_user_auth(username);
		if (!user) {
			console.log("PINE" + user);
			return res.status(400).json({ message: 'REPLACE JSON: User not found' });
		}
		// Compare provided password with DB entry
		const isMatch = await bcrypt.compare(password, user.password);

		// Failure
		if (!isMatch) {
			// Toggle Logging INFO
			console.log(password + "does not match");
			return res.status(403).json({ message: 'REPLACE JSON: Invalid credentials' });
		}

		// Generate JWT
		const token = my_auth_layer.generate_jwt(user)// jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

		// Embed cookie
		res.cookie('jwtToken', token, {
			httpOnly: true,  // Toggle
			secure: false,    // Toggle only HTTPS
			maxAge: 3600000  // Cookie expiration (1 hour)
			});
		// Send token to client
		res.json({ token });
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'REPLACE JSON: Error logging in' });
	}
});

// Patch current Vuln config
router.patch('/api/vulns', (req, res) => {
    let {token, v_tag, v_toggle, v_body} = req.body
    console.log(req.body);

    let user = my_auth_layer.authenticateJWTFromCookieFunction(token)
    if(typeof user === 'undefined')
	    return res.status(403).send('REPLACE HTML: Invalid user provided');

    res.send('Response api vulns');
});

// Get specified entries's password
router.get('/api/passwd', (req, res) => {
    let {token, tag} = req.body

    console.log(req.body);

    let user = my_auth_layer.authenticateJWTFromCookieFunction(token)
    if(typeof user === 'undefined')
	    return res.status(403).send('REPLACE HTML: Invalid user provided');

    // Get tag entry
    // Validate UID with username match?
    console.log(token, tag)
    res.send('Response api passwd');
});

// Get share password with specified user
router.post('/api/share', (req, res) => {
    let {token, tag, target} = req.body

    console.log(req.body);

    let user = my_auth_layer.authenticateJWTFromCookieFunction(token)
    if(typeof user === 'undefined')
	    return res.status(403).send('REPLACE HTML: Invalid user provided');

    res.send('Response api share');
});


// Access Internal Page Information
router.get('/api/internal', (req, res) => {
    let {token} = req.body

    console.log(req.body);

    let user = my_auth_layer.authenticateJWTFromCookieFunction(token)
    if(typeof user === 'undefined')
	    return res.status(403).send('REPLACE HTML: Invalid user provided');

    res.send('Response api internal');
});

// Patch current logging config
router.patch('/api/tlog', (req, res) => {
    let {token} = req.body

    console.log(req.body);

    let user = my_auth_layer.authenticateJWTFromCookieFunction(token)
    if(typeof user === 'undefined')
	    return res.status(403).send('REPLACE HTML: Invalid user provided');

    res.send('Response api tlog');
});

// Get set of most recent logs
router.get('/api/alog', (req, res) => {
    let {token, lines} = req.body

    console.log(req.body);

    let user = my_auth_layer.authenticateJWTFromCookieFunction(token)
    if(typeof user === 'undefined')
	    return res.status(403).send('REPLACE HTML: Invalid user provided');

    res.send('Response api alog');
});

module.exports = router; 