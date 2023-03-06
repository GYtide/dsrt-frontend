import React from 'react'
import { NavBar } from '../NavBar/NavBar'
import DataCalendar from '../DataCalendar/DataCalendar'
import './DataQuery.css'
import { DropDown } from '../DropDown/DropDown'
import FileTab from '../FileList/FileTab'
import OverView from '../OverView/OverView'
import { createContext, useEffect, useState } from 'react'

export const dateContext = createContext() //创建当前查询日期的共享状态
const DataQuery = () => {
  const [date, setDate] = useState(new Date())
  useEffect(() => {
    // console.log(date)
  })
  return (
    <>
      <NavBar></NavBar>
      <div className="queryview">
        <div className="overview">
          <dateContext.Provider value={{ date, setDate }}>
            {/* <h2>数据检索</h2> */}
            <DataCalendar></DataCalendar>
            <div className="queryout">
              <FileTab flex={2}></FileTab>
              <OverView flex={1}></OverView>
            </div>
          </dateContext.Provider>
        </div>
      </div>
    </>
  )
}

export default DataQuery
