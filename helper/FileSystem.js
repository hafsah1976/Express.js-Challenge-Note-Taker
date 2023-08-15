//using filesystem from class activities

const util = require('util');
const fs = require('fs');

// Promisify the readFile function using the util.promisify method
const readFromFile = util.promisify(fs.readFile);

// Function to write data to the JSON file given a destination and some content
const writeToFile = (destination, content) => {
  return new Promise((resolve, reject) => {
    // Write the JSON content to the specified file
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => {
      if (err) {
        // If there's an error, log the error and reject the Promise
        console.error(err);
        reject(err);
      } else {
        // If successful, log a message and resolve the Promise
        console.info(`\nNotes file has been modified. ${destination}`);
        resolve();
      }
    });
  });
};

// Function to read data from a file, append new content, and write back
const readAndAppend = async (content, file) => {
  try {
    // Read the existing data from the specified file
    const data = await readFromFile(file, 'utf8');
    
    // Parse the existing data as JSON
    const parsedData = JSON.parse(data);
    
    // Append the new content to the parsed data
    parsedData.push(content);
    
    // Write the updated data back to the file
    await writeToFile(file, parsedData);
  } catch (err) {
    // If there's an error during any step, log the error
    console.error(err);
  }
};

// Export the functions for use in other modules
module.exports = { readFromFile, writeToFile, readAndAppend };