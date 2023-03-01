import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'
const option = {
  title: {
    text: '',
    left: 10,
  },
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
      type: 'heatmap',
      data: [],
      emphasis: {
        itemStyle: {
          borderColor: '#333',
        },
      },
      itemStyle: {
        color: upColor,
        color0: downColor,
      },
      progressive: 3000,
      animation: false,
    },
  ],
}

function ViewChart(Data, xData, yData, title) {
  const domRef = useRef()
  const chartInit = () => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(domRef.current)
    // 绘制图表
    myChart.setOption({
      title: {
        text: title,
      },
      tooltip: {},
      xAxis: {
        data: xData,
      },
      yAxis: {},
      series: [
        {
          name: 'title',
          type: 'custuom',
          data: Data,
        },
      ],
    })
  }
  useEffect(() => {
    chartInit()
  })
  return (
    <div>
      {/* 准备一个挂载节点 */}
      <div ref={domRef} style={style}></div>
    </div>
  )
}
