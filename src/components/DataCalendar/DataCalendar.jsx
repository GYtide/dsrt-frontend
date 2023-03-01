import React from 'react'
import { Option } from './option'
import { CalendarCharts } from './CalendarCharts'
import './DataCalendar.css'
export class DataCalendar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const year = 2023
    const { width = '80%', height = '100%' } = this.props
    return (
      <CalendarCharts
        option={Option}
        year={year}
        style={{ flex: 1, width }}></CalendarCharts>
    )
  }
}
