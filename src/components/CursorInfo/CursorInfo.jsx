// import { CursorCharts } from './CursorCharts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
import 'echarts/lib/chart/line'
import * as echarts from 'echarts/lib/echarts' //必须
import { useEffect, useState, useRef, useContext } from 'react'
import { option } from './option'
import { frameContext, cursorContext } from '../ImageView'

export const CursorInfo = () => {
  const { cursor, setCursor } = useContext(cursorContext)
  const { frame, setframe } = useContext(frameContext)
  /**
   * 使用实例来自
   * https://github.com/puxiao/react-hook-tutorial/blob/master/18%20%E7%A4%BA%E4%BE%8B%EF%BC%9AReact%E4%BD%BF%E7%94%A8Echarts%E6%89%80%E7%94%A8%E5%88%B0%E7%9A%84hooks.md
   */
  const domRef = useRef() //用来勾住渲染后的 DOM
  const [echartsInstance, setEchartsInstance] = useState(null) //用来勾住生成后的 图表实例对象

  useEffect(() => {
    const myChart = echarts.init(domRef.current) //初始化echarts
    //设置options
    myChart.setOption(option)
    window.onresize = function () {
      myChart.resize()
    }
    setEchartsInstance(myChart)
  }, [])

  /**
   * 更新数据
   */
  useEffect(() => {
    if (echartsInstance) {
      //首次加载时echartsInstance未被初始化，所以进行一下判断
      if (cursor.x >= 0 && cursor.x < 128 && cursor.y >= 0 && cursor.y < 128) {
        var xcoordata = frame.filter((_, index) => index % 128 == cursor.x)
        var ycoordata = frame.filter(
          (_, index) => Math.floor(index / 128) === cursor.y
        )
        echartsInstance.setOption({
          xAxis: [
            {
              type: 'category',
              axisLine: { onZero: false },
              gridIndex: 0,
            },
            {
              type: 'category',
              axisLine: { onZero: false },
              gridIndex: 0,
            },
            {
              type: 'category',
              axisLine: { onZero: false },
              gridIndex: 1,
            },
            {
              type: 'category',
              axisLine: { onZero: false },
              gridIndex: 1,
            },
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: function (value, index) {
                  return value.toExponential(1)
                },
                fontSize: 10,
              },
              // gridIndex: 0,
            },
            {
              type: 'value',
              axisLabel: {
                formatter: function (value, index) {
                  return value.toExponential(1)
                },
                fontSize: 10,
              },
              gridIndex: 1,
            },
          ],
          series: [
            {
              symbol: 'none',
              data: Array.from(ycoordata),
              type: 'line',
              dimensions: [null],
              xAxisIndex: [0, 1],
              yAxisIndex: 0,
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: '#106ba3',
                  },
                },
              },
            },
            {
              symbol: 'none',
              data: Array.from(xcoordata),
              type: 'line',
              xAxisIndex: [2, 3],
              yAxisIndex: 1,
              dimensions: [null],
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: '#106ba3',
                  },
                },
              },
            },
          ],
        })
      }
    }
  }, [echartsInstance, frame, cursor])
  return (
    <div id="profile-container">
      <div className="lm_header">
        <span className="tab_title">Profile: Cursor</span>
      </div>
      <div className="lm_body">
        <div id="coordinate">
          <div ref={domRef} style={{ height: '100%' }}></div>
        </div>
      </div>
    </div>
  )
}
