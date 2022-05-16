const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const pathFile = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(pathFile);

stdout.write('Enter your text:\n');
stdin.on('data', data => {
  const text = data.toString().trim();
  if (text === 'exit'){
    stdout.write('Good bye!'); 
    process.exit();
  } else {
    output.write(`${text} `);
  } 
});

process.on('SIGINT', () => {
  stdout.write('Good bye!'); 
  process.exit();
});




