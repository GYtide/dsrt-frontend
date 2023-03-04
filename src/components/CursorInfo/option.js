/**
 * X、Y方向游标数据横切数据的这线图的配置数据
 */

export const option = {
  animation: false,
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      // data: Array.from(new Array(128 + 1).keys()).slice(1),
      axisLine: { onZero: false },
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        formatter: function (value, index) {
          // value = parseFloat(value)
          // //保留小数位数
          // return value.toFixed(1)
          return value.toExponential(1)
        },
      },
    }
  ],
  series: [
    {

      data: []
    },
  ]
}