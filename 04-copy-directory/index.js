const fs = require('fs');
const path = require('path');
const pathFile = path.join(__dirname, 'files');
const pathFileCopy = path.join(__dirname, 'files-copy');

const copyDir = (pathFile, pathFileCopy) => {
  
  fs.mkdir(pathFileCopy, { recursive: true }, (err) => {
    if (err) throw err;
  });
  
  fs.readdir(pathFileCopy, (err, data) => {
    if (err) throw err;
    data.forEach((elem) => {
      fs.access(path.join(pathFile, elem), (err) => {
        if (err) {
          fs.rm(path.join(pathFileCopy, elem), { recursive: true, force: true}, (err)   => {
            if (err) throw err;
          });
        }
      });
    });
  });
  
  fs.readdir(pathFile, {withFileTypes: true}, (err, data,) => {
    if (err) throw err;
    data.forEach(el => {
      if(el.isFile()) {
        fs.copyFile(path.join(pathFile, el.name), path.join(pathFileCopy, el.name),   (err) =>{
          if (err) throw err;
        });
      } 
      if(el.isDirectory()) {
        copyDir(path.join(pathFile, el.name), path.join(pathFileCopy, el.name));
      }
    });
  });
  
};

copyDir(pathFile, pathFileCopy);