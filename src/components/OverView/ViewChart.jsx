import * as echarts from 'echarts'
import { useEffect, useRef, useState } from 'react'
const option = {
  grid: {
    top: '5%',
    bottom: '10%',
  },
  title: {
    text: '',
    textStyle: {
      fontSize: 14,
    },
  },
  tooltip: {},
  xAxis: [
    {
      data: [],
      axisTick: {
        // 隐藏X轴刻度
        show: true,
        alignWithLabel: true,
        length: -5,
      },
      axisLine: { onZero: false },
    },
    {
      data: [],
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
      data: [],
      axisTick: {
        // 隐藏X轴刻度
        show: true,
        alignWithLabel: true,
        length: -5,
      },
      axisLine: { onZero: false },
    },
    {
      data: [],
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
  series: [
    {
      data: [],
    },
  ],
}

function ViewChart({ Data, style }) {
  const domRef = useRef()
  const [echartsInstance, setEchartsInstance] = useState(null) //用来勾住生成后的 图表实例对象
  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(domRef.current, null, {
      renderer: 'svg',
    })
    // 绘制图表
    myChart.setOption(option)
    setEchartsInstance(myChart)
  }, [])

  useEffect(() => {
    if (echartsInstance && Data) {
      const timeData = []
      // console.log(Data)
      var time0 = +new Date(2022, 1, 1)
      for (let i = 0; i < Data.timearr.length; ++i) {
        timeData.push(
          echarts.time.format(time0 + Data.timearr[i], '{HH}:{mm}:{ss}', false)
        )
      }
      console.log(timeData)
      echartsInstance.setOption({
        xAxis: [
          {
            data: timeData,
          },
        ],
        yAxis: [
          {
            data: Data.pixelarr,
          },
        ],
      })
    }
  }, [Data])
  return (
    <>
      <div ref={domRef} style={{ flex: 1 }}></div>
    </>
  )
}

export default ViewChart
