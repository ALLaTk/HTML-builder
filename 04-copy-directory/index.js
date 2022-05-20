const fs = require('fs');
const promise = require('fs/promises');
const path = require('path');
const pathFile = path.join(__dirname, 'files');
const pathFileCopy = path.join(__dirname, 'files-copy');

const copyDir = async (pathFile, pathFileCopy) => {
  
  await promise.mkdir(pathFileCopy, {recursive: true, force: true}, (err) => {
    if (err) throw err;
  });
  
  fs.readdir(pathFileCopy, {recursive: true, force: true}, (err, data) => {
    if (err) throw err;
    for(let elem of data) {
      fs.access(path.join(pathFile, elem), (err) => {
        if (err) {
          fs.rm(path.join(pathFileCopy, elem), { recursive: true, force: true}, (err)   => {
            if (err) throw err;
          });
        }
      });
    };
  });
  
  fs.readdir(pathFile, {recursive: true, force: true, withFileTypes: true}, (err, data,) => {
    if (err) throw err;
    for(let el of data) {
      if(el.isFile()) {
        fs.copyFile(path.join(pathFile, el.name), path.join(pathFileCopy, el.name),   (err) =>{
          if (err) throw err;
        });
      } 
      else if(el.isDirectory()) {
        copyDir(path.join(pathFile, el.name), path.join(pathFileCopy, el.name));
      }
    };
  });
  
};

copyDir(pathFile, pathFileCopy);