//imports the express module. 
//This module is used to create web servers.
// an instance of this router will be used to route requests to different parts of your application.
const notes = require('express').Router();
// let db = ('db/db.json');//notes json file
//imports the uuid and fs modules to be used to generate random IDs and read and write files, respectively.
const {v4: uuidv4} = require("uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helper/FileSystem');

// GET Route for retrieving all the notes
notes.get('/notes', (req, res) => {
  readFromFile('db/db.json').then((data) => res.json(JSON.parse(data)));
});

//GET route for specific note
// notes.get('/:id', (req, res) => {
//   const noteId = req.params.id;
//   readFromFile('db/db.json')
//     .then((data) => JSON.parse(data))
//     .then((json) => {
//       const result = json.filter((db) => db.id === noteId);
//       return result.length > 0
//         ? res.json(result)
//         : res.json('No notes found with that ID');
//     });
// });


// defining the route for adding a new note and this route will add a new note to the db.json.

 notes.post ('/notes', (req, res)=>{
  console.log(req.body);
  const  {id, title, text} =req.body;
  if(req.body){
    const newNote={
      id :uuidv4 (),
      title,
      text,
    };
    readAndAppend(newNote, 'db/db.json');
    res.json(("Note added!", newNote));
}else{
  res.status(400).json('Error in posting!');
}
});

// function deleteNote(id){
//   for(let i=0;i<db.length;i++){
//     let note = db[i].id;
//     if (note.id==id){
//       db=notesFile.splice(i, 1);
//       fs.writeFileSync(path.join(__dirname, 'db/db.json'));
//       JSON.stringify(db, null, 2);
//     }
//   }
// }

// apiRouter.delete('/notes/:id', (req,res)=>{
//   deleteNote(req.params.id, db);
//   res.status(200).json('Success!', true);
// })


// defining the route for deleting a note using the :id as a parameter, the following route will delete a note from the db.json.

notes.delete('/notes/:id', (req,res)=>{
  const noteId=req.params.id;
  readFromFile('db/db.json')
  .then((data)=>JSON.parse(data))
  .then((json)=>{
    const result =json.filter((note)=> note.id !== noteId);
    writeToFile('db/db.json', result);      // Save that array to the file
    res.json(noteId);
    console.log(`${noteId} has been deleted 🗑️`);
  });
});


//exporting the api router will help us create the web-server.
module.exports = notes;

