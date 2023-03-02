import React from 'react'
// import style from './RasterView.css'
import * as echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
// import 'echarts/lib/chart/custom'
import 'echarts/lib/component/dataZoom'
import { ColorBar } from '../ColorBar/ColorBar'

import { useEffect, useRef, useState } from 'react'

const Option = {
  tooltip: {
    triggerOn: 'none',
    formatter: function (params) {
      return (
        'X: ' +
        params.data[0].toFixed(2) +
        '<br>Y: ' +
        params.data[1].toFixed(2)
      )
    },
  },
  grid: {
    top: '2%',
    bottom: '5%',
    left: '4%',
    right: '1%',
  },
  xAxis: [
    {
      min: -128,
      max: 128,
      type: 'value',
      position: 'top',
      axisLine: { onZero: false },
      // axisLine: { lineStyle: { width: -0.1 } },
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
    },
    {
      min: -128,
      max: 128,
      type: 'value',
      position: 'bottom',
      axisLine: { onZero: false },
      axisTick: {
        // 隐藏X轴刻度
        show: true,
        alignWithLabel: true,
        length: -5,
      },
    },
  ],
  yAxis: [
    {
      min: -30,
      max: 128,
      type: 'value',
      axisLine: { onZero: false },
      axisTick: {
        // 隐藏X轴刻度
        show: true,
        alignWithLabel: true,
        length: -5,
      },
    },
    {
      min: -30,
      max: 128,
      type: 'value',
      position: 'right',
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
  dataZoom: [
    {
      type: 'inside',
      xAxisIndex: [0, 1],
      filterMode: 'none',
    },
    // {
    //   type: 'slider',
    //   xAxisIndex: [0, 1],
    //   filterMode: 'none',
    // },
    // {
    //   type: 'slider',
    //   yAxisIndex: [0, 1],
    //   filterMode: 'none',
    // },
    {
      type: 'inside',
      yAxisIndex: [0, 1],
      filterMode: 'none',
    },
  ],
}

function RasterChart({ option, data }) {
  const domRef = useRef()
  const initChart = (canvas) => {
    const myChart = echarts.init(domRef.current) //初始化echarts
    //设置options
    myChart.setOption({
      ...option,
      series: [
        {
          type: 'custom',
          geoIndex: 0,
          renderItem: function (params, api) {
            var x = myChart.convertToPixel('grid', [-64])[0]
            var y = myChart.convertToPixel('grid', [, 120])[1]
            console.log(params.coordSys)
            return {
              type: 'image',
              style: {
                image: canvas,
                x: x,
                y: y,
                width:
                  myChart.convertToPixel('grid', [64, 40])[0] -
                  myChart.convertToPixel('grid', [-64, 40])[0],
                height:
                  myChart.convertToPixel('grid', [64, 40])[0] -
                  myChart.convertToPixel('grid', [-64, 40])[0],
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
  useEffect(() => {
    var canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 128
    var ctx = canvas.getContext('2d')
    if (data) {
      console.log(data)
      // 找到数组中的最小值和最大值
      const minValue = Math.min(...data)
      const maxValue = Math.max(...data)

      // 归一化至0到1之间
      const normalized = data.map(
        (value) => (value - minValue) / (maxValue - minValue)
      )

      // 缩放至0到255之间
      const scaled = normalized.map((value) => Math.round(value * 255))
      var rasterdata = []
      console.log(scaled)

      for (let i = 0; i < scaled.length; ++i) {
        rasterdata[4 * i] = scaled[i]
        rasterdata[4 * i + 1] = scaled[i]
        rasterdata[4 * i + 2] = scaled[i]
        rasterdata[4 * i + 3] = 255
      }
      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      imageData.data.set(rasterdata)
      ctx.putImageData(imageData, 0, 0)
    }
    initChart(canvas)
  }, [])
  return (
    <>
      <div ref={domRef} style={{ flex: 25 }}></div>
    </>
  )
}
const RasterView = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(null)

  const getData = async () => {
    setIsLoading(true)
    const dataRes = await fetch('/data/image/image.bin', {
      method: 'get',
      responseType: 'arraybuffer',
    })

    const data = new Float32Array(await dataRes.arrayBuffer())
    setData(data)
    setIsLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <div id="file_container">
      <div className="lm_header">
        <div className="tabs">
          <span className="tab_title">
            ODACH_DSRT05_SRSP_L1_05M_20220212081001_V01.01.fits
          </span>
        </div>
      </div>
      <div className="lm_body">
        <div id="image-panel">
          {isLoading ? (
            <>
              <RasterChart option={Option} data={null}></RasterChart>
              <ColorBar></ColorBar>
            </>
          ) : (
            <>
              <RasterChart option={Option} data={data}></RasterChart>
              <ColorBar></ColorBar>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default RasterView
