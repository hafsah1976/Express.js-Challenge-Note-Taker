//imports the express module. 
//This module is used to create web servers.
// an instance of this router will be used to route requests to different parts of your application.
const express = require('express');
const apiRouter=express.Router();
let db = ('db/db.json');//notes json file
const path = require("path");//importing path module
//imports the uuid and fs modules to be used to generate random IDs and read and write files, respectively.
const {v4: uuidv4} = require("uuid");
const fs=require ("fs");//read and write module

//create an empty notes array
let notesFile=[];


// apiRouter.get('/api/notes', async function (req, res) {
//   const notesToBeRead = await notesJS.readNote();
//   return res.json(notesToBeRead);
// });

//defining the route for getting notes which will return all of the notes from the db.json.
apiRouter.get('/notes', (req, res) =>{
  try
  {
  db= fs.readFileSync("db/db.json", "utf8")
  console.log("Connection Successful!");

   db=JSON.parse(db);
  } catch(error){
    console.log("\n Error reading the file.", error);
  }
  res.json(db);
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
function postNewNote(){
    db = fs.readFileSync("db/db.json", "utf8");
    const newNoteData=body;
    if(!Array.isArray(db))
    db=[];
  if(db.length===0)
  db.push(0);
  req.body.id = db[0];
  db[0]++; 
    console.log(db);
    db.push(newNoteData);
      db= JSON.parse(db);
    // newNotesFile.push({
    //   id:uuidv4(),
    //   title:req.body.title,
    //   text:req.body.text,
    // });
    fs.writeFileSync(path.join(__dirname, "db/db.json", "utf8"), 
    JSON.stringify(db, null, 2)
    );
    return newNoteData;
  }

 apiRouter.post ('/notes', (req, res)=>{

  const newNoteData=postNewNote(req.body, db);
    res.json((newNoteData));
    // res.status(200).json("Success!");
});



// defining the route for deleting a note using the :id as a parameter, the following route will delete a note from the db.json.
function deleteNote(id){
  for(let i=0;i<db.length;i++){
    let note = db[i].id;
    if (note.id==id){
      db=notesFile.splice(i, 1);
      fs.writeFileSync(path.join(__dirname, 'db/db.json'));
      JSON.stringify(db, null, 2);
    }
  }
}

apiRouter.delete('/notes/:id', (req,res)=>{
  deleteNote(req.params.id, db);
  res.status(200).json('Success!', true);
})

// apiRouter.delete("/notes/:id", function (req, res) {
//   try {
//     notesFile = fs.readFileSync("db/db.json", "utf8");
//     notesFile = JSON.parse(notesFile);
//     notesFile = notesFile.filter(function (note) {
//       return console.log(note.id != req.params.id);
//     });
//     notesFile = JSON.stringify(notesFile);
//     fs.writeFileSync("db/db.json", notesFile, "utf8", function (error) {
//       if (error) 
//       throw console.log(error);
//     });

//     res.send(JSON.parse(notesFile));
//   } catch (error) {
//     throw console.log(error) ;  
//   }
// });


//exporting the api router will help us create the web-server.
module.exports = apiRouter;

