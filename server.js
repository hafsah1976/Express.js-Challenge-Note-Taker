// Import required modules/dependencies
const express = require('express');
const path = require("path"); // Importing the path module
const Routes = require('./ROUTING/modular-routes.js'); // Import the modular routes
const app = express();
const PORT = process.env.PORT || 3001; // Define the port number

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serving static files from the 'public' directory
app.use("/api", Routes); // Using the modular routes for '/api' endpoints

// GET Route for homepage
// Serving the main HTML file for the homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// GET Route for the notes page
// Serve the notes HTML file
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Wildcard route to handle any other URL
// Redirect the user back to the main page
app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// Start the server to listen on the defined port
app.listen(PORT, () =>
  console.log(`Note Taking App listening at http://localhost:${PORT} 🚀`)
);
