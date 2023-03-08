import React from 'react'
// import style from './RasterView.css'
import * as echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
// import 'echarts/lib/chart/custom'
import 'echarts/lib/component/dataZoom'
import ColorBar from '../ColorBar/ColorBar'
import CursorOverlay from './CursorOverlay'
import { frameContext, cursorContext } from '../ImageView'
import { useEffect, useRef, useState, createContext, useContext } from 'react'

import { Space, Spin } from 'antd'

const Option = {
  grid: {
    top: '2%',
    bottom: '5%',
    left: '4%',
    right: '1%',
  },
  xAxis: [
    {
      min: -64,
      max: 192,
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
      min: -64,
      max: 192,
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
      min: -8,
      max: 140,
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
      min: -8,
      max: 140,
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
    {
      type: 'inside',
      yAxisIndex: [0, 1],
      filterMode: 'none',
    },
  ],
}

const colorBarOption = {
  animation: false,
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '2%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: ['Hot'],
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
  yAxis: [
    {
      data: [30, 49, 26, 60, 26], //数据
      type: 'value',
      axisTick: {
        alignWithLabel: true,
      },
      position: 'right',
      axisLabel: {
        rotate: 90,
        formatter: function (value, index) {
          // value = parseFloat(value)
          // //保留小数位数
          // return value.toFixed(1)
          return value.toExponential(1)
        },
      },
    },
  ],
  series: [
    {
      type: 'bar',
      barWidth: 70,
      data: [30, 49, 26, 60, 26], //数据
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#06B5D7' }, //柱图渐变色
            { offset: 0.5, color: '#44C0C1' }, //柱图渐变色
            { offset: 1, color: '#71C8B1' }, //柱图渐变色
          ]),
        },
        emphasis: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#71C8B1' }, //柱图高亮渐变色
            { offset: 0.7, color: '#44C0C1' }, //柱图高亮渐变色
            { offset: 1, color: '#06B5D7' }, //柱图高亮渐变色
          ]),
        },
      },
    },
  ],
}

function RasterChart({ option, frame }) {
  const { cursor, setCursor } = useContext(cursorContext)
  const domRef = useRef()
  useEffect(() => {
    var canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 128
    var ctx = canvas.getContext('2d')
    if (frame) {
      // 找到数组中的最小值和最大值
      const minValue = Math.min(...frame)
      const maxValue = Math.max(...frame)

      // 归一化至0到1之间
      const normalized = frame.map(
        (value) => (value - minValue) / (maxValue - minValue)
      )

      // 缩放至0到255之间
      const scaled = normalized.map((value) => Math.round(value * 255))
      var rasterdata = []

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
    const myChart = echarts.init(domRef.current, null, {
      renderer: 'svg',
    }) //初始化echarts
    //设置options
    myChart.setOption({
      ...option,
      tooltip: {
        // trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999',
          },
        },
        formatter: function (params) {
          return ``
        },
        position: function (point, params, dom) {
          // 指定 tooltip 的位置，可以根据需要调整
          return [point[0] + 10, point[1] - 50]
        },
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 5,
        textStyle: {
          color: '#333',
        },
      },
      series: [
        {
          type: 'custom',
          geoIndex: 0,
          renderItem: function (params, api) {
            var x = myChart.convertToPixel('grid', [0, 0])[0]
            var y = myChart.convertToPixel('grid', [0, 128])[1]
            return {
              type: 'image',
              style: {
                image: canvas,
                x: x,
                y: y,
                width:
                  myChart.convertToPixel('grid', [128, 40])[0] -
                  myChart.convertToPixel('grid', [0, 40])[0],
                height:
                  myChart.convertToPixel('grid', [128, 40])[0] -
                  myChart.convertToPixel('grid', [0, 40])[0],
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
    myChart.getZr().on('mousemove', function (params) {
      const coords = myChart.convertFromPixel({ seriesIndex: 0 }, [
        params.offsetX,
        params.offsetY,
      ])
      let x = Math.floor(coords[0]),
        y = Math.floor(coords[1])
      setCursor({ x: x, y: y })
    })
  }, [frame])
  return (
    <>
      <div ref={domRef} style={{ flex: 25 }}></div>
    </>
  )
}

/**
 *
 *  RasterView 是展示栅格数据的组件有3个子组件 ColorBar、 RasterChart、 CursorOverlay
 *  ColorBar:颜色数据对照表
 *  RasterChart:基于echarts展示数据
 *  CursorOverlay:显示目前指向的数据
 *
 */

const RasterView = () => {
  const { frame, setframe } = useContext(frameContext)

  return (
    <div id="file_container">
      <div className="lm_header">
        <div className="tabs">
          <span className="tab_title">
            ODACH_DSRT05_SRSP_L1_05M_202202 12081001_V01.01.fits
          </span>
        </div>
      </div>
      <div className="lm_body">
        <CursorOverlay></CursorOverlay>
        <div id="image-panel">
          <>
            <RasterChart option={Option} frame={frame}></RasterChart>
            <ColorBar option={colorBarOption}></ColorBar>
          </>
        </div>
      </div>
    </div>
  )
}

export default RasterView
