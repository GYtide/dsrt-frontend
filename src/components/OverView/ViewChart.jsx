import * as echarts from 'echarts'
import { useEffect, useRef, useState } from 'react'
import { array2canvasctx } from '../../util/array2canvasctx'
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
  const canvasRef = useRef()
  const [echartsInstance, setEchartsInstance] = useState(null) //用来勾住生成后的 图表实例对象
  const [canvasInstance, setCanvasInstance] = useState([]) //预览图的canvas实例
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
      // 创建 canvas实例
      const canvas = document.createElement('canvas')
      canvas.width = Data.timearr.length
      canvas.height = Data.pixelarr.length
      array2canvasctx(
        canvas,
        Data.data,
        'gray',
        Math.max(...Data.data),
        Math.min(...Data.data)
      )
      setCanvasInstance(canvas)
      console.log(Data.data)
      const timeData = []
      // console.log(Data)
      var time0 = +new Date(2022, 1, 1)
      for (let i = 0; i < Data.timearr.length; ++i) {
        timeData.push(
          echarts.time.format(time0 + Data.timearr[i], '{HH}:{mm}:{ss}', false)
        )
      }
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
        series: [
          {
            type: 'custom',
            geoIndex: 0,
            renderItem: function (params, api) {
              var x = echartsInstance.convertToPixel('grid', [0, 0])[0]
              var y = echartsInstance.convertToPixel('grid', [0, 128])[1]
              return {
                type: 'image',
                style: {
                  image: canvasInstance,
                  x: x,
                  y: y,
                  width:
                    echartsInstance.convertToPixel('grid', [128, 40])[0] -
                    echartsInstance.convertToPixel('grid', [0, 40])[0],
                  height:
                    echartsInstance.convertToPixel('grid', [128, 40])[0] -
                    echartsInstance.convertToPixel('grid', [0, 40])[0],
                },
                z: -1,
              }
            },
            clip: true,
            silent: true,
            data: [0],
          },
        ],
      })
    }
  }, [Data, canvasInstance])
  return (
    <>
      <div ref={domRef} style={{ flex: 1 }}></div>
    </>
  )
}

export default ViewChart
