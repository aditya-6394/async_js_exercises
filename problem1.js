const fs = require('fs');
const data = JSON.stringify({ name: 'Aditya', place: 'Bengaluru' });
// ========================== <<Problem 1 - (Part 1)>>==============================

// Creating the directory and files using fs async module only:

function fileSystesOperationsUsingCallback() {
  fs.mkdir('problemOnePartOne', () => {
    console.log('Folder <<problemOnePartOne>> created succesfully.\n');
    for (let index = 1; index <= 3; index++) {
      fs.writeFile(`./problemOnePartOne/${index}.json`, data, (error) => {
        if (error) {
          console.log(error);
          return;
        } else {
          console.log(
            `File named: <<${index}.json>> created under folder: <<problemOnePartOne>>.\n`,
          );
        }
      });
    }
  });

  setTimeout(() => {
    for (let index = 1; index <= 3; index++) {
      fs.unlink(`problemOnePartOne/${index}.json`, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`<<${index}.json>> deleted successfully!\n`);
        }
      });
    }
    fs.rmdir('problemOnePartOne', (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(
          'Successfully deleted the folder <<problemOnePartOne>> too.\n',
        );
      }
    });
  }, 5000);
}

// ========================== <<Problem 1 - (Part 2)>>==============================

// function fileSystemOperationsUsingPromise() {
//   const makingDirectory = new Promise((resolve, reject) => {
//     fs.mkdir('Promises', (error) => {
//       if (error) {
//         console.log(error);
//         return reject(error);
//       } else {
//         console.log('Created folder named: <<Promises>>\n');
//         return resolve();
//       }
//     });
//   });

//   const makeFiles = makingDirectory
//     .then(() => {
//       return new Promise((resolve, reject) => {
//         for (let index = 1; index <= 3; index++) {
//           fs.writeFile(`Promises/${index}.json`, data, (error) => {
//             if (error) {
//               console.log(error);
//               return reject();
//             } else {
//               console.log(
//                 `File named: <<${index}.json>> created under folder: <<Promises>>.\n`,
//               );
//             }
//           });
//         }
//         return resolve();
//       });
//     })
//     .catch((error) => {
//       console.log('Error in creating files');
//       console.log(error);
//     });

//   setTimeout(() => {
//     const deleteFiles = makeFiles
//       .then(() => {
//         return new Promise((resolve, reject) => {
//           for (let index = 1; index <= 3; index++) {
//             fs.unlink(`Promises/${index}.json`, (error) => {
//               if (error) {
//                 console.log('Error in deleting file');
//                 console.log(error);
//                 return reject();
//               } else {
//                 console.log(
//                   `<<${index}.txt>> deleted successfully from folder: <<Promises>>\n`,
//                 );
//               }
//             });
//           }
//           return resolve();
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     const deleteDirectory = deleteFiles
//       .then(() => {
//         return new Promise((resolve, reject) => {
//           fs.rmdir('Promises', (error) => {
//             if (error) {
//               console.log(error);
//               return reject();
//             } else {
//               console.log('Successfully deleted the folder <<Promises>>\n');
//               return resolve();
//             }
//           });
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     deleteDirectory
//       .then(() => {
//         console.log('<<Proccess finished successfully.>>\n');
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, 5000);
// }

// const fs = require('fs');

function fileSystemOperationsUsingPromise() {
  function makeDirectory() {
    return new Promise((resolve, reject) => {
      fs.mkdir('Directory', (error) => {
        if (error) {
          reject();
        } else {
          resolve();
        }
      });
    });
  }

  function createFile(path) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, 'abc', (error) => {
        if (error) {
          reject();
        } else {
          resolve();
        }
      });
    });
  }

  function deleteFile(path) {
    return new Promise((resolve, reject) => {
      fs.unlink(path, (error) => {
        if (error) {
          reject();
        } else {
          resolve();
        }
      });
    });
  }

  function deleteDirectory(path) {
    return new Promise((resolve, reject) => {
      fs.rmdir(path, (error) => {
        if (error) {
          reject();
        } else {
          resolve();
        }
      });
    });
  }

  try {
    makeDirectory()
      .then(createFile('Directory/fileOne.txt'))
      .then(createFile('Directory/fileTwo.txt'))
      .then(createFile('Directory/fileThree.txt'))
      .then(
        setTimeout(() => {
          deleteFile('Directory/fileOne.txt')
            .then(deleteFile('Directory/fileTwo.txt'))
            .then(deleteFile('Directory/fileThree.txt'))
            .then(deleteDirectory('Directory'));
        }, 5000),
      );
  } catch (error) {
    console.log(error);
  }
}

// ========================== <<Problem 1 - (Part 3)>>==============================

function fileSystemOperationsUsingAsyncAndAwait() {
  async function fullTask(createFolder, createFiles, deleteFile) {
    try {
      await createFolder();
      for (let index = 1; index <= 3; index++) {
        await createFiles(index);
        console.log(
          `File: <<${index}.json>> created successfully inside folder asyncAndAwait\n`,
        );
      }
      setTimeout(async () => {
        for (let index = 1; index <= 3; index++) {
          await deleteFile(`${index}`);
          console.log(`File: <<${index}.json>> deleted successfully\n`);
        }

        deleteFolder();
      }, 6000);
    } catch (error) {
      console.log(error);
    }
  }

  async function createFolder() {
    return new Promise((resolve, reject) => {
      fs.mkdir('asyncAndAwait', (error) => {
        if (error) {
          reject(error);
        } else {
          console.log('Folder named <<asyncAndAwait>> has been created.\n');
          resolve();
        }
      });
    });
  }

  async function createFiles(path) {
    return new Promise((resolve, reject) => {
      fs.writeFile(`asyncAndAwait/${path}.json`, data, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  async function deleteFile(path) {
    return new Promise((resolve, reject) => {
      fs.unlink(`asyncAndAwait/${path}.json`, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  async function deleteFolder() {
    return new Promise((resolve, reject) => {
      fs.rmdir('asyncAndAwait', (error) => {
        if (error) {
          reject(error);
        } else {
          console.log('Folder named <<asyncAndAwait>> deleted successfully.\n');
          resolve();
        }
      });
    });
  }

  fullTask(createFolder, createFiles, deleteFile, deleteFolder);
}

module.exports.problemOnePartOne = fileSystesOperationsUsingCallback;
module.exports.problemOnePartTwo = fileSystemOperationsUsingPromise;
module.exports.problemOnePartThree = fileSystemOperationsUsingAsyncAndAwait;
