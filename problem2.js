const fs = require('fs');

//============================== <<Problem 2.1>>==================================
async function readLipsum(fileName) {
  let data = await fs.promises.readFile(`${fileName}`, 'utf8');
  return data;
}

//============================== <<Problem 2.2>>==================================
async function convertToUpperCase(data) {
  const upperCaseData = data.toUpperCase();
  await fs.promises.writeFile('uppercase.txt', upperCaseData);
  await fs.promises.writeFile('filenames.txt', 'uppercase.txt');
}

//============================== <<Problem 2.3>>==================================
async function convertNewFileToLowerCaseAndSplitSentence() {
  let data = await fs.promises.readFile('uppercase.txt', 'utf8');
  let lowerCaseData = data.toLowerCase();
  const sentences = lowerCaseData.split(/(?<=[.!?])\s+/);
  await fs.promises.mkdir('SplitFiles');
  for (let index in sentences) {
    await fs.promises.writeFile(`SplitFiles/${index}.txt`, sentences[index]);
    await fs.promises.appendFile('filenames.txt', `\n${index}.txt`);
  }
}

//============================== <<Problem 2.4>>==================================
async function fetchFileNames() {
  let fileNames = await fs.promises.readdir('SplitFiles');
  let fetchedData = [];
  for (let file of fileNames) {
    let data = await fs.promises.readFile(`SplitFiles/${file}`, 'utf8');
    fetchedData.push(data.trim());

    fetchedData = fetchedData.sort();
  }
  let sortedString = fetchedData.join(' ');
  await fs.promises.writeFile('sorted.txt', sortedString);
  await fs.promises.appendFile('filenames.txt', '\nsorted.txt');
}

//============================== <<Problem 2.5>>==================================
async function deleteFilesConcurrently() {
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
  await fs.promises.rmdir('SplitFiles');
  console.log('Folder <<SplitFiles>> deleted successfully.');
}

module.exports.readLipsum = readLipsum;
module.exports.convertToUpperCase = convertToUpperCase;
module.exports.convertNewFileToLowerCaseAndSplitSentence =
  convertNewFileToLowerCaseAndSplitSentence;
module.exports.fetchFileNames = fetchFileNames;
module.exports.deleteFilesConcurrently = deleteFilesConcurrently;
