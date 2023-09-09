const fs = require('fs');

//============================== <<Problem 2.1>>==================================
async function readLipsum(fileName) {
  try {
    let data = await fs.promises.readFile(`${fileName}`, 'utf8');
    return data;
  } catch (error) {
    console.log(error);
  }
}

//============================== <<Problem 2.2>>==================================
async function convertToUpperCase(data) {
  try {
    const upperCaseData = data.toUpperCase();
    await fs.promises.writeFile('uppercase.txt', upperCaseData);
    await fs.promises.writeFile('filenames.txt', 'uppercase.txt');
  } catch (error) {
    console.log(error);
  }
}

//============================== <<Problem 2.3>>==================================
async function convertNewFileToLowerCaseAndSplitSentence() {
  try {
    let data = await fs.promises.readFile('uppercase.txt', 'utf8');
    let lowerCaseData = data.toLowerCase();
    const sentences = lowerCaseData.split(/(?<=[.!?])\s+/);
    await fs.promises.mkdir('SplitFiles');
    for (let index in sentences) {
      await fs.promises.writeFile(`SplitFiles/${index}.txt`, sentences[index]);
      await fs.promises.appendFile('filenames.txt', `\n${index}.txt`);
    }
  } catch (error) {
    console.log(error);
  }
}

//============================== <<Problem 2.4>>==================================
async function fetchingFileNames() {
  try {
    let fileNames = await fs.promises.readdir('SplitFiles');
    let fetchedData = [];
    for (let file of fileNames) {
      let data = await fs.promises.readFile(`SplitFiles/${file}`, 'utf8');
      fetchedData.push(data.trim());
    }
    fetchedData = fetchedData.sort();
    let sortedString = fetchedData.join(' ');
    await fs.promises.writeFile('sorted.txt', sortedString);
    await fs.promises.appendFile('filenames.txt', '\nsorted.txt');
  } catch (error) {
    console.log(error);
  }
}

//============================== <<Problem 2.5>>==================================
async function deleteFilesConcurrently() {
  try {
    let fileNamesString = await fs.promises.readFile('filenames.txt', 'utf8');
    let fileNamesArr = fileNamesString.split('\n');
    for (let file of fileNamesArr) {
      if (file === 'uppercase.txt' || file === 'sorted.txt') {
        await fs.promises.unlink(file);
        console.log(`${file} deleted successfully`);
      } else {
        await fs.promises.unlink(`SplitFiles/${file}`);
        console.log(`${file} deleted successfully from SplitFiles folder`);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports.readLipsum = readLipsum;
module.exports.convertToUpperCase = convertToUpperCase;
module.exports.convertNewFileToLowerCaseAndSplitSentence =
  convertNewFileToLowerCaseAndSplitSentence;
module.exports.fetchingFileNames = fetchingFileNames;
module.exports.deleteFilesConcurrently = deleteFilesConcurrently;
