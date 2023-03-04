// import { CursorCharts } from './CursorCharts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
import 'echarts/lib/chart/line'
import * as echarts from 'echarts/lib/echarts' //必须
import { useEffect, useState, useRef } from 'react'
import { option } from './option'

export const CursorInfo = ({ data }) => {
  const domRef = useRef()

  const initChart = () => {
    console.log('data', data)
    const myChart = echarts.init(domRef.current) //初始化echarts
    //设置options
    myChart.setOption({
      ...option,
      series: [
        {
          data: data,
        },
      ],
    })
    window.onresize = function () {
      myChart.resize()
    }
  }

  useEffect(() => {
    initChart()
  }, [data])
  return (
    <div id="x-profile-container">
      <div className="lm_header">
        <span className="tab_title">X Profile: Cursor</span>
      </div>
      <div className="lm_body">
        <div id="xcoordinate">
          <div ref={domRef} style={{ height: '100%' }}></div>
        </div>
      </div>
    </div>
  )
}
