import React from 'react'
import { Option } from './option'
import CalendarCharts from './CalendarCharts'
import './DataCalendar.css'

/**
 * 年份选择
 */
const DataSelect = () => {
  return <div> </div>
}

const DataCalendar = () => {
  return
  <div className="date-select">
    <CalendarCharts option={Option}></CalendarCharts>
    <DataSelect></DataSelect>
  </div>
}

export default DataCalendar
