const fs = require('fs');
const path = require('path');
const pathFile = path.join(__dirname, 'secret-folder');
const { stdout } = process;

fs.readdir(pathFile, {withFileTypes: true}, (err, data,) => {
  if (err) throw err;

  data.forEach(elem => {
    if(elem.isFile()) {
      const extension = path.extname(elem.name);
      const pathElem = path.join(pathFile, elem.name);
      const nameElem = path.parse(elem.name).name;
      fs.stat(pathElem, (err, stats) => {
        if (err) throw err;
        const size = stats.size;
        stdout.write(`${nameElem} - ${extension.slice(1)} - ${size}b\n`);
      });
    }
  });
});


 