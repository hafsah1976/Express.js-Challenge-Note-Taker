//imports the express module. This module is used to create web servers.
const express = require("express");

//creates an instance of the express router and This router will be used to route requests to different parts of your application.
const apiRouter = express.Router();

//imports the uuid module to be used to generate random IDs.
const uuid = require("uuid");

//imports the DB class, which used to interact with the db.json.
const notesDB = require("../db/DB");

//defines the route for getting notes. This route will return all of the notes from the db.json.
apiRouter.get("/api/notes", async function (req, res) {
  const noteData = await notesDB.readNotes();
  return res.json(noteData);
});

// defines the route for adding a new note and this route will add a new note to the db.json.
apiRouter.post("/api/notes", async function (req, res) {
  const currentNotes = await notesDB.readNotes();
  let newNote = {
    id: uuid(),
    title: req.body.title,
    text: req.body.text,
  };

  await notesDB.addNote([...currentNotes, newNote]);

  return res.send(newNote);
});

// defining the route for deleting a note using the :id as a parameter, the following route will delete a note from the db.json.
apiRouter.delete("/api/notes/:id", async function (req, res) {
  const noteToDelete = req.params.id;
  const currentNotes = await notesDB.readNotes();
  const newNoteData = currentNotes.filter((note) => note.id !== noteToDelete);

  await notesDB.deleteNote(newNoteData);

  return res.send(newNoteData);
});

//exporting the api router will help us create the web-server.
module.exports = apiRouter;





