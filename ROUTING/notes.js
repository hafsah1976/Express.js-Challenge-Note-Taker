// Import required modules
const express = require('express');
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helper/FileSystem');

// Create an instance of Express router
const notesRouter = express.Router();

// GET Route: Retrieve all notes
notesRouter.get('/notes', (req, res) => {
  // Read notes data from file and send as JSON response
  readFromFile('db/db.json')
    .then((data) => res.json(JSON.parse(data)))
    .catch((error) => {
      console.error(error);
      res.status(500).send('Server Error!');
    });
});

// POST Route: Add a new note
notesRouter.post('/notes', (req, res) => {
  const { title, text } = req.body;

  // Check if request body has required fields
  if (title && text) {
    const newNote = {
      id: uuidv4(), // Generate a new unique ID
      title,
      text,
    };

    // Append new note to file and send a response
    readAndAppend(newNote, 'db/db.json')
      .then(() => res.json({ message: "Note added!", note: newNote }))
      .catch((error) => {
        console.error(error);
        res.status(500).send('');
      });
  } else {
    res.status(400).json('Title or Text Missing');
  }
});

// DELETE Route: Delete a note by ID
notesRouter.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;

  // Read notes data from file
  readFromFile('db/db.json')
    .then((data) => JSON.parse(data))
    .then((notes) => {
      const updatedNotes = notes.filter((note) => note.id !== noteId);//filter out the note to delete
      writeToFile('db/db.json', updatedNotes)// and save the updated data
        .then(() => {
          res.json({ message: `${noteId} has been deleted 🗑️` });
          console.log(`${noteId} has been deleted 🗑️`);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Server Error!');
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Server Error!');
    });
});

// Export the notesRouter for use in creating the web server
module.exports = notesRouter;
