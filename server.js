'use strict'; // Main backend app file for Tottenham Bot Server.

// Loas variables from .env & Set default node enviroment to development.

require('dotenv').load();
const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Dependencies

const express       = require('express');
const createConfig  = require('./config/environment');
const configExpress = require('./config/express');
const setupRoutes   = require('./app/routes');

// Setup server.

let config = createConfig(env);

const app = express();
configExpress(app);
setupRoutes(app);

const server = app.listen(config.port);

const host = server.address().address;
const port = server.address().port;
console.log(`=> Bot Boilerplate starting on http://${host}:${port}`);
console.log('=> Ctrl-C to shutdown server');

module.exports = app;
