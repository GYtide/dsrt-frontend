import * as echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/calendar'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/visualMap'
import { useRef, useEffect } from 'react'
import { HeatmapChart } from 'echarts/charts'
echarts.use([HeatmapChart])
const CalendarCharts = ({ option }) => {
  const domRef = useRef()
  const initChart = () => {
    option.calendar.range = 1970
    let myChart = echarts.init(domRef.current) //初始化echarts
    //设置options
    myChart.setOption(option)
    window.onresize = function () {
      myChart.resize()
    }
  }

  useEffect(() => {
    initChart()
  }, [])
  return <div ref={domRef} style={{ flex: 1 }}></div>
}
export default CalendarCharts
