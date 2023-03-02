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

function RasterChart({ option }) {
  const domRef = useRef()
  const initChart = () => {
    const myChart = echarts.init(domRef.current) //初始化echarts

    var canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 128
    //设置options
    myChart.setOption({
      ...option,
      series: [
        {
          type: 'custom',
          geoIndex: 0,
          renderItem: function (params, api) {
            var x = myChart.convertToPixel('grid', [-40, 40])[0]
            var y = myChart.convertToPixel('grid', [-40, 40])[1]
            console.log(params.coordSys)
            return {
              type: 'image',
              style: {
                image: canvas,
                x: x,
                y: y,
                width: 512,
                height: 512,
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
    initChart()
  }, [])
  return (
    <>
      <div ref={domRef} style={{ flex: 25 }}></div>
    </>
  )
}
const RasterView = () => {
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
          <RasterChart option={Option}></RasterChart>
          <ColorBar></ColorBar>
        </div>
      </div>
    </div>
  )
}

export default RasterView
