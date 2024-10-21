const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const my_db_layer = require('../usr_modules/database')
const my_auth_layer = require('../usr_modules/jsonweb_token')
const my_vuln_layer = require('../usr_modules/vuln_manager')
const my_passwd_layer = require('../usr_modules/passwd')
// MongoDB
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongouri = process.env.MONGO_URI;

// Default Home Page
router.get('/', (req, res) => {
	res.send('REPLACE HTML: Response Default');
});

// User Home Page
router.get('/vault', my_auth_layer.authenticateJWTFromCookie, (req, res) => {
	res.send('REPLACE HTML: Response from vault');
});

// User Registration
// Need to implement it such that this can serve
// a POST method that would be encrypted over HTTPS
// or a GET method that can leak passwords.
router.get('/register', (req, res) => {
	res.send(`<form method="post" action="/register">
				<input type="text" name="username" placeholder="Username" required />
				<input type="password" name="password" placeholder="Password" required />
				<button type="submit">Register</button>
			</form><p>Reaplace with HTML</p>`);
});

// Route for registration
// Need to implement one for GET requests
router.post('/register', async (req, res) => {
	// Pull the username and password from the
	// request body. Also the group if it exists.
	const { username, password, group } = req.body;

	// Ensure we received a valid request body
	if (typeof username === 'undefined' || typeof password === 'undefined') {
		res.status(400).json({ message: 'REPLACE HTML: Invalid request body' })
	}


	try {
		// Check if the user already exists
		const existingUser = await my_db_layer.find_user_auth(username);
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
		const newUserEntry = await my_db_layer.insert_user(username, hashedPassword); // use group if enabled

		if (my_vuln_layer.UID_GUARD == false) {
			console.info("To be Implemented, read from HIDDEN fourm entry to set UID")
		} else {
			let newUID = await my_db_layer.get_largest_uid();
			if (isNaN(newUID) || newUID == undefined) {
				newUID = 1000;
			} else {
				newUID += 1;
			}

			key = await my_passwd_layer.gen_key()

			if (group == undefined && my_vuln_layer.VAR_GRP1) {
				let newUIDEntry = my_db_layer.insert_uid_user(username, newUID, 0, key.toString('hex'))
				console.log(newUIDEntry)
			} else {
				let newUIDEntry = my_db_layer.insert_uid_user(username, newUID, group, key)
				console.log(newUIDEntry)
			}
			console.log(newUID)
		}

		// Toggle Logging INFO
		console.log("PINE:" + newUserEntry);
		res.status(201).json({ message: 'REPLACE HTML: User registered successfully' });
	} catch (error) {
		console.log("PINE:" + error);
		res.status(500).json({ message: 'REPLACE HTML: Error registering user' });
	}
});


// User Login Management
// Need to implement it such that this can serve
// a POST method that would be encrypted over HTTPS
// or a GET method that can leak passwords.
router.get('/login', (req, res) => {
	res.send(`<form method="post" action="/login">
			<input type="text" name="username" placeholder="Username" required />
			<input type="password" name="password" placeholder="Password" required />
			<button type="submit">Login</button>
		</form> <p>Reaplace with HTML</p>`);
});

// User Login handling, need to implement
// handler for GET requests
router.post('/login', async (req, res) => {
	// Pull the username and password from the
	// request body.
	const { username, password } = req.body;

	// Ensure we received a valid request body
	if (typeof username === 'undefined' || typeof password === 'undefined') {
		return res.status(400).json({ message: 'REPLACE HTML: Invalid request body' })
	}

	try {
		// Check if user exists
		const user = await my_db_layer.find_user_auth(username);
		if (!user) {
			console.log("PINE" + user);
			return res.status(400).json({ message: 'REPLACE HTML: User not found' });
		}
		// Compare provided password with DB entry
		const isMatch = await bcrypt.compare(password, user.password);

		// Failure
		if (!isMatch) {
			// Toggle Logging INFO
			console.log(password + "does not match");
			return res.status(403).json({ message: 'REPLACE HTML: Invalid credentials' });
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
		res.status(500).json({ message: 'REPLACE HTML: Error logging in' });
	}
});

module.exports = router; 