const fs = require('fs');
const path = require('path');
const pathDir = path.join(__dirname, 'styles');
const pathNewFile = path.join(__dirname, 'project-dist', 'bundle.css');
const output = fs.createWriteStream(pathNewFile, 'utf-8');

fs.readdir(pathDir, {withFileTypes: true, recursive: true, force: true}, (err, data) => {
  
  if (err) throw err;
  for(let elem of data) {
    if(elem.isFile()) {
      if(path.extname(elem.name) === '.css') {
        const pathElem = path.join(pathDir, elem.name);
        const readFile = fs.createReadStream(pathElem, 'utf-8');
        readFile.pipe(output);
      }
    } 
  };
});    

