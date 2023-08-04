// // Custom middleware that logs out the type and path of each request to the server
// const clog = (req, res, next) => {
//     const fgRed = '\x1b[91m';
//     switch (req.method) {
//       case 'GET': {
//         console.info(`📗 ${fgRed}${req.method} request to ${req.path}`);
//         break;
//       }
//       case 'POST': {
//         console.info(`📘 ${fgRed}${req.method} request to ${req.path}`);
//         break;
//       }
//       default:
//         console.log(`📙${fgRed}${req.method} request to ${req.path}`);
//     }
  
//     next();
//   };
  
//   exports.clog = clog;




//   // return notes in json format
// const fs = require('fs');
// const util = require('util');
// const notesFile=require('../db/db.json');
// //promise version of fs.readfile
// const readFromFile=util.promisify(fs.readFile);
// const writeToFile=util.promisify(fs.writeFile);
// // const appendToFile=util.promisify(fs.appendFile);


// class Notes {
//   async readANote() {
//     try {
//       const notesToBeRead = await readFromFile(notesFile, "UTF8");
//       return notesToBeRead ? JSON.parse(notesToBeRead) : [];//If the file exists and can be read, the method returns the contents of the file as a JSON object. If the file does not exist or cannot be read, the method returns an empty array.
//     } catch (e) {
//       throw e;
//     }
//   }

// // The `notesToBeRead` parameter in the `addANote()` method is coming from the user. 
// //The user can provide the data as a JSON object or as a string. 
// //The method will then parse the data and add it to the file system.
//   async addANote(notesToBeRead) {
//     try {
//       await writeToFile(notesFile, JSON.stringify(notesToBeRead, null, "\t"))
//       .then(()=> { console.log("Great job adding a new note!.");});
//     } catch (e) {
//       throw e;
//     }
//   }

//   // async editANote(){
//   //   try{
//   //     const editANote= req.params.id;
//   //     editANote =await notesFile.readANote();
//   //     await writeToFile(notesFile, JSON.stringify(editANote, null, "\t"));


//   //     return editANote ? JSON.parse(editANote) : []

//   //     console.log("You have edited your note.");


//   //     console.log("You have edited your note.");
//   //   }catch(err){
//   //     throw err;
//   //   }
//   // }

//   async deleteANote(notesToBeRead) {
//     try {
//       await writeToFile(notesFile, JSON.stringify(notesToBeRead, null, "\t"))
//       .then(()=>{ console.log("You have deleted a note.");});
//     } catch (e) {
//       throw e;
//     }
//   }
// }

// module.exports = { readFromFile, writeToFile, appendToFile };

// module.exports = new Notes();

// // The `promisify()` function is used to convert a synchronous function to a promise-based function. 
// //This allows you to use the `await` keyword with the function.

// // In this case, the `fs.readFile()` function is being converted to a promise-based function. This allows you to use the `await` keyword to wait for the file to be read before continuing with the rest of your code.
// // The `readANote()` method is used to read a note from the file system. The method first tries to read the file `notesFile` in UTF-8 format. If the file exists and can be read, the method returns the contents of the file as a JSON object. If the file does not exist or cannot be read, the method returns an empty array.

// // The `readFromFile()` method is a promise-based method that reads a file from the file system. The method takes two parameters: the path to the file and the encoding. The method returns a promise that resolves to the contents of the file in the specified encoding.

// // The `JSON.parse()` method is used to parse a JSON string into a JavaScript object. The method takes one parameter: the JSON string. The method returns a JavaScript object.






// // The `throw error` statement is used to throw an error. The error is then caught by the `catch` block.
  