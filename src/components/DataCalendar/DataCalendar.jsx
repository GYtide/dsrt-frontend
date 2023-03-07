import { Option } from './option'
import CalendarCharts from './CalendarCharts'
import './DataCalendar.css'
import { DatePicker, Select } from 'antd'
import { dateContext } from '../DataQuery/DataQuery'
import { useContext, useEffect, useState } from 'react'

/**
 * 年份选择
 */
const DateSelect = ({ flex }) => {
  const { date, setDate } = useContext(dateContext)
  const onChange = (asd, dateString) => {
    setDate(asd)
  }
  // antd的组件没法直接读取js的date对象所以使用 moment 转换为 moment 时间对象
  return (
    <div style={{ flex: flex }}>
      <h3>日期选择</h3>
      {
        <DatePicker
          size="large"
          value={date}
          picker="year"
          onChange={onChange}
          className="select"></DatePicker>
      }
    </div>
  )
}

const DataCalendar = () => {
  const { date, setDate } = useContext(dateContext)
  return (
    <div className="date-select">
      <CalendarCharts
        option={Option}
        flex={2}
        range={date.year()}></CalendarCharts>
      <DateSelect flex={1}></DateSelect>
    </div>
  )
}

export default DataCalendar
