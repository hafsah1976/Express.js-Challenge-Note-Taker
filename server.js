//dependencies

const express = require('express');
const path = require("path");//importing path module
const Routes = require('./ROUTING/modular-routes.js');
const app=express();
const PORT = process.env.PORT || 3001;//port number

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/api", Routes);

//GET Route for homepage
//api call for the notes, result get sent to browser in the form of an object array 
  app.get('/', (req, res) =>
   res.sendFile(path.join(__dirname, 'public/index.html'))
 );

  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
    });

//wild card route here it would simply take the user back to main page
app.get('/*', (req, res) =>
res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
  console.log(`Note Taking App listening at http://localhost:${PORT} 🚀`)
);
