const problemTwoPartOne = require('../problem2').readLipsum;
const problemTwoPartTwo = require('../problem2').convertToUpperCase;
const problemTwoPartThree =
  require('../problem2').convertNewFileToLowerCaseAndSplitSentence;
const problemTwoPartFour = require('../problem2').fetchFileNames;
const problemTwoPartFive = require('../problem2').deleteFilesConcurrently;

async function problemTwo() {
  try {
    let data = await problemTwoPartOne('lipsum.txt');
    await problemTwoPartTwo(data);
    await problemTwoPartThree();
    await problemTwoPartFour();
    setTimeout(await problemTwoPartFive, 5000);
  } catch (error) {
    console.log(error);
  }
}

problemTwo();
