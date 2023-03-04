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

const ColorBar = ({ option }) => {
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
  }, [option])

  return <div ref={domRef} style={{ flex: 1 }}></div>
}

export default ColorBar
