//imports the express module. 
//This module is used to create web servers.
// an instance of this router will be used to route requests to different parts of your application.
const apiRouter = require('express').Router();
//create an empty notes array
let notesFile=[];

//imports the uuid and fs modules to be used to generate random IDs and read and write files, respectively.
const {v4: uuidv4} = require('uuid');
const fs=require ("fs");//read and write module
const util = require("util");//utilities module

// apiRouter.get('/api/notes', async function (req, res) {
//   const notesToBeRead = await notesJS.readNote();
//   return res.json(notesToBeRead);
// });

//defining the route for getting notes which will return all of the notes from the db.json.
apiRouter.get('/api/notes', (req, res) =>{
  try
  {
  notesFile= fs.readFileSync("./db/db.json", "utf8")
  console.log("Connection Successful!");
  notesFile=JSON.parse(notesFile);
  } catch(error){
    console.log("\n Error reading the file.", error);
  }
  res.json(notesFile);
  }
  );
  
// apiRouter.post('/api/notes',(req, res) => {
//   const readcurrentNote = notesJS.readNote();
//   let newNoteFile = {
//     id: uuidv4(),
//     title: req.body.title,
//     text: req.body.text,
//   };

//   notesJS.appendANote([...readcurrentNote, newNoteFile]);

//   return res.send(newNoteFile);
// });


// defining the route for adding a new note and this route will add a new note to the db.json.
apiRouter.post("/api/notes", function (req, res) {
  try {
    notesFile = fs.readFileSync("./db/db.json", "utf8");
    console.info(notesFile);
    notesFile = JSON.parse(notesFile);
    let newNotesFile={
      id:uuidv4(),
      title:req.body.title,
      text:req.body.text,
    };
    req.body.id = newNotesFile.length;
    newNotesFile.push(req.body);
    newNotesFile = JSON.stringify(newNotesFile);
    fs.writeFileSync("db/db.json", newNotesFile, "utf8", function (error) {
      if (error) {
        throw console.log(error);}
    });

    res.json(JSON.parse(newNotesFile));
  } catch (error) {
    console.error(error);
  }
});


// apiRouter.delete("/api/notes/:id",  (req, res)=> {
//   const deleteANote = req.params.id;
//   const readcurrentNote =  notesJS.readNote();
//   const newNotes = readcurrentNote.filter(() => newNoteData.id !== deleteANote);

//   notesJS.deleteNote(newNoteData);//The `await` keyword is used to wait for the completion of an async operation.here, the async op is the `notesDB.deleteANote()` method.The `await` keyword ensures that the `res.send()` method is not called until the `notesDB.deleteANote()` method has been completed.
//   return res.send(newNoteData);
// });


// defining the route for deleting a note using the :id as a parameter, the following route will delete a note from the db.json.

apiRouter.delete("/api/notes/:id", function (req, res) {
  try {
    notesFile = fs.readFileSync("./db/db.json", "utf8");
    notesFile = JSON.parse(notesFile);
    notesFile = notesFile.filter(function (note) {
      return note.id != req.params.id;
    });
    notesFile = JSON.stringify(notesFile);
    fs.writeFileSync("./db/db.json", notesFile, "utf8", function (error) {
      if (error) 
      throw console.log(error);
    });

    res.send(JSON.parse(notesFile));
  } catch (error) {
    throw console.log(error) ;  
  }
});


//exporting the api router will help us create the web-server.
module.exports = apiRouter;

