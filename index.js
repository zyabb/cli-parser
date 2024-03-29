const file = process.argv[2];
const fs = require('fs');
const readline = require('readline');
const parse = require('./parser');
const object = JSON.parse(fs.readFileSync(__dirname + '/' + file)).subviews;

const rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('Your Selector> ');
rl.prompt();
rl.on('line', function(line) {
  if (line === 'exit') rl.close();
  if (line !== '') console.log(parse(object, line));
  rl.prompt();
}).on('close', function() {
  console.log('Closing');
  process.exit(0);
});
