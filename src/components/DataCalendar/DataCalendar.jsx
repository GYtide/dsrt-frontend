import React from 'react'
import { Option } from './option'
import CalendarCharts from './CalendarCharts'
import './DataCalendar.css'
import { DatePicker, Select } from 'antd'

/**
 * 年份选择
 */
const DataSelect = ({ flex }) => {
  return (
    <div style={{ flex: flex }}>
      <h3>日期选择</h3>
      {<DatePicker size="large" className="select"></DatePicker>}
    </div>
  )
}

const DataCalendar = () => {
  return (
    <div className="date-select">
      <CalendarCharts option={Option} flex={2}></CalendarCharts>
      <DataSelect flex={1}></DataSelect>
    </div>
  )
}

export default DataCalendar
