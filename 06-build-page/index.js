const fs = require('fs');
const promise = require('fs/promises');
const path = require('path');
const pathFile = path.join(__dirname, 'assets');
const pathDir = path.join(__dirname, 'project-dist');
const pathDirStyle = path.join(__dirname, 'styles');
const pathFileCopy = path.join(pathDir,  'assets');
const fileIndex = path.join(pathDir, 'index.html');
const fileStyle = path.join(pathDir, 'style.css');
const filePathTemplate = path.join(__dirname, 'template.html');
const components = path.join(__dirname, 'components');
const style = fs.createWriteStream(fileStyle, 'utf-8');
const index = fs.createWriteStream(fileIndex, 'utf-8');

(async () => {

  await promise.mkdir(pathDir, {recursive: true, force: true});

  const stylesComponents = await promise.readdir(pathDirStyle, {recursive: true,   force: true, withFileTypes: true});
  for (let elem of stylesComponents) {
    if(elem.isFile() && path.extname(elem.name) === '.css') {
      const pathElem = path.join(pathDirStyle, elem.name);
      const readElem = await promise.readFile(pathElem, {recursive: true, force: true});
      style.write(`${readElem}\n\n`);
    } 
  }
  
  const template =  await promise.readFile(filePathTemplate, {recursive: true, force: true, withFileTypes: true});

  let str = template.toString(); 
  
  const htmlComponents =  await promise.readdir(components, {recursive: true, force: true, withFileTypes: true});
  for (let elem of htmlComponents) {
    const pathElem = path.join(components, elem.name); 
    const readElem = await promise.readFile(pathElem, {recursive: true, force: true});
    if(elem.isFile() && path.extname(elem.name) === '.html') {
      if (str.includes(`{{${elem.name.split('.')[0]}}}`)){
        str = str.replace(`{{${elem.name.split('.')[0]}}}`, readElem.toString());    
      }
    }
  }

  index.write(str);  
   
  copyDir(pathFile, pathFileCopy);
  
})();


const copyDir = async (pathFile, pathFileCopy) => {
  
  await promise.mkdir(pathFileCopy, {recursive: true, force: true});

  fs.readdir(pathFileCopy,  (err, data) => {
    if (err) throw err;
    for(let elem of data) {
      fs.access(path.join(pathFile, elem), (err) => {
        if (err) {
          fs.rm(path.join(pathFileCopy, elem), (err)   => {
            if (err) throw err;
          });
        }
      });
    }
  });
 
  fs.readdir(pathFile, {withFileTypes: true}, (err, data,) => {
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
    }
  });
  
};



 


 



  