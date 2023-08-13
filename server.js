//dependencies
const express = require("express");
const apiRoutes = require("./ROUTING/api-router.js");
const htmlRoutes = require("./ROUTING/html-router.js");
const PORT = process.env.PORT || 3001;//port number
const app = express();
const path = require('path');


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// GET Route for homepage
// api call for the notes, result get sent to browser in the form of an object array 

//res.sendFile(path.join(__dirname, '/public/assets/index.html'))

// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "public/assets/index.html"));
// });


// // GET Route for feedback page
// app.get('/api/notes', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/assets/notes.html'))
// );

app.listen(PORT, () =>
  console.log(`Note Taking App listening at http://localhost:${PORT} 🚀`)
);
