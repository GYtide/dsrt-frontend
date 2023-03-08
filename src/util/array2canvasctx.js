/**
 * 
 * @param {*} arr - 数据数组
 * @param {*} colormap - 色表
 * @param {*} arr 数据数组
 * 
 * @return {array} - canvas的上下文数组
 */

export function array2canvasctx (canvas, arr, colormap, min, max) {
  console.log(canvas)
  var ctx = canvas.getContext('2d')
  ctx.scale(1, -1)
  // 使用translate()函数调整y轴位置
  ctx.translate(0, canvas.height)
  // 归一化至0到1之间
  const normalized = arr.map(value => (value - min) / (max - min))

  // 缩放至0到255之间
  const scaled = normalized.map(value => Math.round(value * 255))
  var rasterdata = []

  for (let i = 0; i < arr.length; ++i) {
    rasterdata[4 * i] = scaled[i]
    rasterdata[4 * i + 1] = scaled[i]
    rasterdata[4 * i + 2] = scaled[i]
    rasterdata[4 * i + 3] = 255
  }
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  imageData.data.set(rasterdata)
  ctx.putImageData(imageData, 0, 0)
}