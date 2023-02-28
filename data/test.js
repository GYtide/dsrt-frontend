const fs = require('fs')

fs.readFile('./data/xarr.bin', (err, data) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(data)
  let arr = new Float32Array(data.buffer)
  for (let i in arr) {
    console.log(arr[i], ',')
  }
})

let a = 2
console.log(a.toExponential(1))
