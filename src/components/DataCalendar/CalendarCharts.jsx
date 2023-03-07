import * as echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/calendar'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/visualMap'
import { Spin } from 'antd'
import { useRef, useEffect, uesContext, useState } from 'react'
import { HeatmapChart } from 'echarts/charts'
import { dateContext } from '../DataQuery/DataQuery'
const CalendarCharts = ({ option, flex, range }) => {
  const domRef = useRef() //图表的dom
  const [echartsInstance, setEchartsInstance] = useState(null) //用来勾住生成后的 图表实例对象
  const [isLoading, setIsLoading] = useState(false)
  // const [dateData, setDatedata] = useState([])

  const getDate = async (year) => {
    const dataRes = await fetch(`/overview/yearlist?year=${year}`, {
      method: 'get',
    })
    const data = await dataRes.json()
  }

  // 初次加载并初始化日历
  useEffect(() => {
    setIsLoading(true)
    getDate(range)
    option.calendar.range = range
    let myChart = echarts.init(domRef.current, null, {
      renderer: 'svg',
    })
    myChart.setOption(option)
    window.onresize = function () {
      myChart.resize()
    }
    setEchartsInstance(myChart)
    setIsLoading(false)
  }, [])

  //当切换年份时刷新
  useEffect(() => {
    getDate(range)
    if (echartsInstance) {
      echartsInstance.setOption({
        calendar: {
          range: range,
        },
      })
    }
  }, [range])

  return (
    <>
      {isLoading ? (
        <div className="example">
          <Spin />
        </div>
      ) : (
        <div ref={domRef} style={{ flex: flex }}></div>
      )}
    </>
  )
}
export default CalendarCharts
