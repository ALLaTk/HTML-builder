const fs = require('fs');
const promise = require('fs/promises');
const path = require('path');
const pathDir = path.join(__dirname, 'styles');
const pathNewFile = path.join(__dirname, 'project-dist', 'bundle.css');
const style = fs.createWriteStream(pathNewFile, 'utf-8');

const buildFiles = async () => {

  try {
    const stylesComponents = await promise.readdir(pathDir, {recursive: true,   force:   true, withFileTypes: true});
    for (let elem of stylesComponents) {
      if(elem.isFile() && path.extname(elem.name) === '.css') {
        const pathElem = path.join(pathDir, elem.name);
        const readElem = await promise.readFile(pathElem, {recursive: true, force:   true});
        style.write(`${readElem}\n\n`);
      } 
    }
  } catch (err) {
    console.log(err);
  }
};

buildFiles();