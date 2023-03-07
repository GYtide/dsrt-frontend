import * as echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/calendar'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/visualMap'
import { useRef, useEffect, uesContext, useState } from 'react'
import { HeatmapChart } from 'echarts/charts'
import { dateContext } from '../DataQuery/DataQuery'
const CalendarCharts = ({ option, flex, range, data }) => {
  const domRef = useRef() //图表的dom
  const [echartsInstance, setEchartsInstance] = useState(null) //用来勾住生成后的 图表实例对象

  // 初次加载并初始化日历
  useEffect(() => {
    option.calendar.range = range
    let myChart = echarts.init(domRef.current, null, {
      renderer: 'svg',
    })
    myChart.setOption(option)
    window.onresize = function () {
      myChart.resize()
    }
    setEchartsInstance(myChart)
  }, [])
 
  //当切换年份时刷新
  useEffect(() => {
    if (echartsInstance) {
      // 设置数据为echarts的格式
      let dataValue = []
      for (let i = 0; i < data.length; ++i) {
        dataValue.push([data[i].date, 1])
      }

      console.log(dataValue)
      echartsInstance.setOption({
        calendar: {
          range: range,
        },
        series: {
          data: dataValue,
        },
      })
    }
  }, [range, data])

  return <div ref={domRef} style={{ flex: flex }}></div>
}
export default CalendarCharts
