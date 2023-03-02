import React from 'react'
import styles from './ColorBar.css'
import * as echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
import 'echarts/lib/chart/bar'
import { useEffect, useRef, useState } from 'react'
/**
 * colorbar 使用Echarts实现：一个很窄的图标，colorbar的对应数值就是Y轴，
 * 没有X轴（X轴就是一个category），在数值区域显示一个渐变效果的条.
 */

const Option = {
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
      name: '威胁值',
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

const Charts = ({ option }) => {
  const domRef = useRef()

  const initChart = () => {
    let myChart = echarts.init(domRef.current) //初始化echarts

    //设置options
    myChart.setOption(option)
    window.onresize = function () {
      myChart.resize()
    }
  }

  useEffect(() => {
    initChart()
  })

  // const { width = '100%', height = '100%' } = this.props
  return <div ref={domRef} style={{ flex: 1 }}></div>
}

export class ColorBar extends React.Component {
  render() {
    return (
      <>
        <Charts option={Option}></Charts>
      </>
    )
  }
}
