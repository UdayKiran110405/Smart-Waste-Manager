// Import the fs module
const fs = require("fs");

// Define the file name and the data to be written
const fileName = "example.txt";
const data = "Hello, this is a sample text written to a file!";

// Use fs.writeFile to create a new file and write data to it
fs.writeFile(fileName, data, (err) => {
  if (err) {
    // Handle error if the file could not be created
    console.error("Error writing to file", err);
  } else {
    // Success message
    console.log(
      `File "${fileName}" has been created and data has been written.`
    );
  }
});
