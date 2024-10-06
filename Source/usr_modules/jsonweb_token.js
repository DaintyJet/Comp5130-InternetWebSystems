const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key'; // Use a strong secret for production

// https://expressjs.com/en/guide/writing-middleware.html
// https://dvmhn07.medium.com/jwt-authentication-in-node-js-a-practical-guide-c8ab1b432a49
const authenticateJWTFromCookie = (req, res, next) => {
    try {
        var token = req.cookies.jwtToken;
    }
    catch (err) {
        // TMP add Pine Logging later
        console.log(req.cookies)
        console.log("PINE REPLACE: Failed to extract cookies user request.")
    }

    if (!token) {
      return res.status(403).json({ message: 'REPLACE HTML: Access denied Please login!' });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET); // Verify token, throws err on failure.
      req.userId = decoded.userId; // Set userID in request
      next();
    } catch (error) {
      res.status(401).json({ message: 'REPLACE HTML: Invalid JWT token! Access Denied' }); // Replace with web pahe
    }
  };

// Returns the username of the target if the token is valid
// Returns undefined if a invalid token is provided.
  const authenticateJWTFromCookieFunction = (token, res) => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET); // Verify token, throws err on failure.
      return decoded.userId; // Set userID in request
    } catch (error) {
      return undefined; // Replace with web pahe
    }
  };

function generate_jwt(uid) {
    return jwt.sign({ userId: uid._id }, JWT_SECRET, { expiresIn: '1h' });
}

module.exports = {authenticateJWTFromCookie, authenticateJWTFromCookieFunction, generate_jwt};