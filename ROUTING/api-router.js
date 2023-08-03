//imports the express module. This module is used to create web servers.
const express = require("express");

//creates an instance of the express router and This router will be used to route requests to different parts of your application.
const apiRouter = express.Router();

//imports the uuid module to be used to generate random IDs.
const uuid = require("uuid");

//imports the notes class, which used to interact with the notes.json.
const notesDB = require("../db/notes.json");

//defining the route for getting notes which will return all of the notes from the db.json.
apiRouter.get("/api/notes", async function (req, res) {
  const noteData = await notesDB.readANote();
  return res.json(noteData);
});

// defines the route for adding a new note and this route will add a new note to the db.json.
apiRouter.post("/api/notes", async function (req, res) {
  const currentNotes = await notesDB.readANote();
  let newNoteData = {
    id: uuid(),
    title: req.body.title,
    text: req.body.text,
  };

  await notesDB.addANote([...currentNotes, newNoteData]);

  return res.send(newNote);
});

// defining the route for deleting a note using the :id as a parameter, the following route will delete a note from the db.json.
apiRouter.delete("/api/notes/:id", async function (req, res) {
  const deleteANote = req.params.id;
  const currentNote = await notesDB.readANote();
  const newNoteData = currentNote.filter((note) => note.id !== deleteANote);

  await notesDB.deleteANote(newNoteData);//The `await` keyword is used to wait for the completion of an asyn operation.here, the async op is the `notesDB.deleteANote()` method. 
  //The `await` keyword ensures that the `res.send()` 
  //method is not called until the `notesDB.deleteNote()` method has completed.
  
  
  return res.send(newNoteData);
});

//exporting the api router will help us create the web-server.
module.exports = apiRouter;

