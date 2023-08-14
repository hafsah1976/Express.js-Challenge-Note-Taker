const express = require('express');

// Import our modular routers for /tips and /feedback
const apiRouter = require('./tips');
const htmlRouter = require('./feedback');

const app = express();

app.use('/api', apiRouter);
app.use('/notes', htmlRouter);

module.exports = app;
