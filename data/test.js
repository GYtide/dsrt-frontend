const fs = require('fs');

const n = 128;
const arr = Array.from({ length: n }, (_, i) => i);
const buffer = Buffer.from(arr);

fs.writeFile('data.bin', buffer, (err) => {
  if (err) throw err;
  console.log('File saved');
});