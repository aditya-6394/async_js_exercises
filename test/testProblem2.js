const problemTwoPartOne = require('../problem2').readLipsum;
const problemTwoPartTwo = require('../problem2').convertToUpperCase;
const problemTwoPartThree =
  require('../problem2').convertNewFileToLowerCaseAndSplitSentence;
const problemTwoPartFour = require('../problem2').fetchingFileNames;
const problemTwoPartFive = require('../problem2').deleteFilesConcurrently;

async function problemTwo() {
  try {
    let data = await problemTwoPartOne('lipsum.txt');
    await problemTwoPartTwo(data);
    await problemTwoPartThree();
    await problemTwoPartFour();
    await problemTwoPartFive();
  } catch (error) {
    console.log(error);
  }
}

problemTwo();
