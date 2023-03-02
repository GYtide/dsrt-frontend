import React from 'react'
import * as echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/calendar'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/visualMap'
import { HeatmapChart } from 'echarts/charts'
echarts.use([HeatmapChart])
export class CalendarCharts extends React.Component {
  constructor(props) {
    super(props)
    this.initChart = this.initChart.bind(this)
  }

  initChart() {
    const { option = {}, year } = this.props
    option.calendar.range = 1970
    let myChart = echarts.init(this.ID) //初始化echarts

    //设置options
    myChart.setOption(option)
    window.onresize = function () {
      myChart.resize()
    }
  }

  componentDidMount() {
    this.initChart()
  }

  componentDidUpdate() {
    this.initChart()
  }

  render() {
    // const { width = '100%', height = '100%' } = this.props
    return <div ref={(ID) => (this.ID = ID)} style={{ flex: 1 }}></div>
  }
}
