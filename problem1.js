const fs = require('fs');
// const data = JSON.stringify({ name: 'Aditya', place: 'Bengaluru' });

// Problem 1, Part 1:
// Creating the directory and files using fs async module only:
function createFolderandFile(data) {
  fs.mkdir('problemOnePartOne', () => {
    console.log('Folder created succesfully.');
    for (let index = 1; index <= 3; index++) {
      fs.writeFile(`./problemOnePartOne/${index}.json`, data, (error) => {
        if (error) {
          console.log(error);
          return;
        } else {
          console.log(
            `File named: ${index}.json created under folder: problemOnePartOne.`,
          );
        }
      });
    }
  });
}

// Deleting the files:

function removeFiles() {
  for (let index = 1; index <= 3; index++) {
    fs.unlink(`problemOnePartOne/${index}.json`, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`${index}.txt deleted successfully!`);
      }
    });
  }
  fs.rmdir('problemOnePartOne', (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Successfully deleted the folder too.');
    }
  });
}

module.exports.createFolderandFile = createFolderandFile;
module.exports.removeFiles = removeFiles;
