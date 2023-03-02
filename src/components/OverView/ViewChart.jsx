import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'
const option = {
  xAxis: {
    data: [],
    type: 'category',
    silent: false,
    splitLine: {
      show: false,
    },
    splitArea: {
      show: false,
    },
  },
  yAxis: {
    data: [],
    type: 'category',
    splitArea: {
      show: false,
    },
  },
  series: [
    {
      type: 'custom',
      geoIndex: 0,
      // renderItem: function (params, api) {
      //   var x = myChart.convertToPixel('grid', [-40, 40])[0]
      //   var y = myChart.convertToPixel('grid', [-40, 40])[1]
      //   console.log(params.coordSys)
      //   return {
      //     type: 'image',
      //     style: {
      //       image: canvas,
      //       x: x,
      //       y: y,
      //       width: 512,
      //       height: 512,
      //     },
      //     z: -1,
      //   }
      // },
      clip: true,
      silent: true,
      data: [0],
    },
  ],
}

function ViewChart({ Data, xData, yData, title, style }) {
  const domRef = useRef()
  const chartInit = () => {
    // 将xData转为时间格式
    const timeData = []
    var time0 = +new Date(2022, 1, 1)
    for (let i = 0; i < xData.length; ++i) {
      timeData.push(
        echarts.time.format(time0 + xData[i] * 1000, '{HH}:{mm}:{ss}', false)
      )
    }
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(domRef.current)
    // 绘制图表
    myChart.setOption({
      title: {
        text: title,
        textStyle: {
          fontSize: 14,
        },
      },
      tooltip: {},
      xAxis: [
        {
          data: timeData,
          axisTick: {
            // 隐藏X轴刻度
            show: true,
            alignWithLabel: true,
            length: -5,
          },
          axisLine: { onZero: false },
        },
        {
          data: timeData,
          axisLabel: {
            // 隐藏X轴刻度数字
            show: false,
          },
          axisTick: {
            // 隐藏X轴刻度
            show: true,
            alignWithLabel: true,
            length: -5,
          },
          axisLine: { onZero: false },
        },
      ],
      yAxis: [
        {
          data: yData,
          axisTick: {
            // 隐藏X轴刻度
            show: true,
            alignWithLabel: true,
            length: -5,
          },
          axisLine: { onZero: false },
        },
        {
          data: yData,
          axisLabel: {
            // 隐藏X轴刻度数字
            show: false,
          },
          axisTick: {
            // 隐藏X轴刻度
            show: true,
            alignWithLabel: true,
            length: -5,
          },
          axisLine: { onZero: false },
        },
      ],
      series: [],
    })
  }
  useEffect(() => {
    chartInit()
  }, [])
  return (
    <>
      <div ref={domRef} style={{ flex: 1 }}></div>
    </>
  )
}

export default ViewChart
