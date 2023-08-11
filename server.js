const express = require('express');
// const path = require('path');
const apiRoutes = require('./ROUTING/api-router.js');
const htmlRoutes = require('./ROUTING/api-router.js');
const PORT = process.env.PORT || 3001;
const app = express();

const fs=require ("fs");
const util = require("util");
const {v4: uuidv4} = require("uuid");
const db = require("./db.json");
const readFile=util.promisify(fs.readFile);
const writeFile=util.promisify(fs.writeFile);




// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use( apiRoutes);
app.use(htmlRoutes);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/assets/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/assets/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

