// Express
const express = require('express');
const session = require('express-session');
const cors = require('cors');

// Config
const dotENV = require('dotenv').config();

// Connection 
// Pull in http Library to run the HTTP server
const http = require('http');

// Logging
const logger = require('pino')()

// Auth Framework
const passport = require('passport');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Routes
const api = require('./routes/api.js');
const admin = require('./routes/admin-ui.js');
const usr = require('./routes/user-ui.js');

const webserver = express();

// Set the Static content that the site will use

//webserver.use(express.static('public'));
webserver.use(cors());
webserver.use(express.json());
webserver.use(express.urlencoded());
webserver.use(cookieParser());        // Parse cookies before routes


webserver.use(api); 
webserver.use(admin); 
webserver.use(usr); // app.use() requires a middleware function

// Creates Server using Express JS Framework!
var http_server = http.createServer(webserver)
console.log(8080);
console.log(process.env.MONGO_URI);
http_server.listen(8081);