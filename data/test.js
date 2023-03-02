// const fs = require('fs');

// const n = 128;
// const arr = Array.from({ length: n }, (_, i) => i);
// const buffer = Buffer.from(arr);

// fs.writeFile('data.bin', buffer, (err) => {
//   if (err) throw err;
//   console.log('File saved');
// });
// import * as echarts from 'echarts'

const echarts = require('echarts')

// let a =  echarts.time.format('hh:mm:ss.ms', 1643644800000 + 65000 * 1000, false)
let a =  echarts.time.format( 1643644800000 + 65000 * 1000, '{HH}:{mm}:{ss}',false)

console.log(a)