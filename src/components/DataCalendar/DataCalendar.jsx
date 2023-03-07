import { Option } from './option'
import CalendarCharts from './CalendarCharts'
import './DataCalendar.css'
import { DatePicker, Select } from 'antd'
import { dateContext } from '../DataQuery/DataQuery'
import { useContext, useEffect, useState } from 'react'
import { Spin } from 'antd'

/**
 * 年份选择
 */
const DateSelect = ({ flex }) => {
  const { date, setDate } = useContext(dateContext)

  const onChange = (date, dateString) => {
    setDate(date)
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
  const [isLoading, setIsLoading] = useState(false)
  const [dateData, setDatedata] = useState([]) //当前选择年中有数据的日期

  const onChange = (date, dateString) => {
    setDate(date)
  }

  useEffect(() => {
    setIsLoading(true)
    const getDateData = async (year) => {
      const dataRes = await fetch(`/overview/yearlist?year=${year}`, {
        method: 'get',
      })
      const data = await dataRes.json()
      setDatedata(data)
    }
    getDateData(date.year())
    setIsLoading(false)
  }, [date])

  return (
    <div className="date-select">
      <>
        {isLoading ? (
          <>
            <Spin></Spin>
            <DateSelect flex={1}></DateSelect>
          </>
        ) : (
          <>
            <CalendarCharts
              option={Option}
              flex={3}
              range={date.year()}
              data={dateData}></CalendarCharts>
            <DateSelect flex={1}></DateSelect>
          </>
        )}
      </>
    </div>
  )
}

export default DataCalendar
