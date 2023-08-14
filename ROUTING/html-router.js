const express= require('express');
const htmlRouter=express.Router();//creates a new router instance that we will use to get and post html
const pathToHTML = require("path");//importing path module
// const db = require('db/db.json');

//defining the route for all other paths which will serve the index.html file 
htmlRouter.get("/", function (req, res) {
  res.sendFile(pathToHTML.join(__dirname, "./index.html"));

});

//defining a route to the /notes path, which will server the notes.html file
htmlRouter.get("/notes", function (req, res) {
  res.sendFile(pathToHTML.join(__dirname, "./notes.html"));
});

  htmlRouter.get("/*", function (req, res) {
   return res.sendFile(pathToHTML.json(__dirname, "./index.html"));
 });

module.exports = htmlRouter;//exporting router instance
