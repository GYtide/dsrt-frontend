import React from 'react'
import { Option } from './option'
import CalendarCharts from './CalendarCharts'
import './DataCalendar.css'
import { DatePicker, Select } from 'antd'

/**
 * 年份选择
 */
const DataSelect = () => {
  return (
    <div style={{ flex: 1 }}>
      {<DatePicker className="select"></DatePicker>}
    </div>
  )
}

const DataCalendar = () => {
  return (
    <div className="date-select">
      <CalendarCharts option={Option}></CalendarCharts>
      <DataSelect></DataSelect>
    </div>
  )
}

export default DataCalendar
