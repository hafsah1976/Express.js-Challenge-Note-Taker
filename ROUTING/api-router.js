//imports the express module. 
//This module is used to create web servers.
// an instance of this router will be used to route requests to different parts of your application.
const apiRouter = require('express').Router();

//imports the uuid module to be used to generate random IDs.
const {v4: uuidv4} = require('uuid');

//imports the notes class, which used to interact with the notes.json.
const notesJS = require('../db/notes');

//defining the route for getting notes which will return all of the notes from the db.json.
apiRouter.get('/api/notes', async function (req, res) {
  const notesToBeRead = await notesJS.readANote();
  return res.json(notesToBeRead);
});

// defining the route for adding a new note and this route will add a new note to the db.json.
apiRouter.post('/api/notes',(req, res) => {
  const readcurrentNote = notesJS.readANote();
  let newNoteFile = {
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text,
  };

  notesJS.appendANote([...readcurrentNote, newNoteFile]);

  return res.send(newNoteFile);
});

// defining the route for deleting a note using the :id as a parameter, the following route will delete a note from the db.json.
apiRouter.delete("/api/notes/:id",  (req, res)=> {
  const deleteANote = req.params.id;
  const readcurrentNote =  notesJS.readANote();
  const newNotes = readcurrentNote.filter(() => newNoteData.id !== deleteANote);

  notesJS.deleteANote(newNoteData);//The `await` keyword is used to wait for the completion of an async operation.here, the async op is the `notesDB.deleteANote()` method.The `await` keyword ensures that the `res.send()` method is not called until the `notesDB.deleteANote()` method has been completed.
  return res.send(newNoteData);
});

//exporting the api router will help us create the web-server.
module.exports = apiRouter;

