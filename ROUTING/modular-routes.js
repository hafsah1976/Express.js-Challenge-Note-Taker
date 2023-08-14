const express = require('express');

// Import the modular routers for /api router
const apiRouter = require('./notes');
const app = express();

app.use('/', apiRouter);

module.exports = app;
