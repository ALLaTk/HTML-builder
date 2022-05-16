const fs = require('fs');
const path = require('path');
const pathFile = path.join(__dirname, 'files');
const pathFileCopy = path.join(__dirname, 'files-copy');
const { stdout } = process;

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readdir(pathFileCopy, {withFileTypes: true}, (err, data,) => {
  if (err) throw err;

  data.forEach(el => {
    fs.unlink(path.join(pathFileCopy, el.name), (err) => {
      if (err) throw err;
    });
  });
});

fs.readdir(pathFile, {withFileTypes: true}, (err, data,) => {
  if (err) throw err;
  data.forEach(el => {
    if(el.isFile()) {
      fs.copyFile(path.join(pathFile, el.name), path.join(pathFileCopy, el.name), (err) =>{
        if (err) throw err;
      });
    } 
    if(el.isDirectory()) {
      stdout.write(`You created a folder '${el.name}'. You need to create a file!`);
    }
  });
});
