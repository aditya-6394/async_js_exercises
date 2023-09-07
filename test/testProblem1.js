const createFolderandFile = require('../problem1').createFolderandFile;
const removeFiles = require('../problem1').removeFiles;
const data = JSON.stringify({ name: 'Aditya', place: 'Bengaluru' });

// 1. Create a directory of 3 random JSON files programatically,
// using fs module's asynchronous functions only
// createFolderandFile(data);

function problemOne(create, remove, data) {
  create(data);
  setTimeout(remove, 10000);
}
problemOne(createFolderandFile, removeFiles, data);
// createFolderandFile(data);
// removeFiles();
