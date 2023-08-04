const express = require('express');
const path = require('path');
const { customeMiddleWare} = require('./middleware/custom-route');
const api = require('./ROUTING/api-router.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware
app.use(customeMiddleWare);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

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



// //create a PORT variable
// const PORT = process.env.PORT || 3000;

// //set up express to handle data parsing
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static("public"));

// const apiRoutes = require("./routes/apiRoutes");
// app.use(apiRoutes);
// const htmlRoutes = require("./routes/htmlRoutes");
// app.use(htmlRoutes);

// //create server listener
// app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));


