import React from 'react'
import { NavBar } from '../NavBar/NavBar'
import DataCalendar from '../DataCalendar/DataCalendar'
import './DataQuery.css'
import { DropDown } from '../DropDown/DropDown'
import FileTab from '../FileList/FileTab'
import OverView from '../OverView/OverView'
import { createContext, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { Spin } from 'antd'
export const dateContext = createContext() //创建当前查询日期的共享状态
export const isLoadingContext = createContext() //创建当前当前网络请求状态
const DataQuery = () => {
  const [date, setDate] = useState(dayjs(new Date('2023-03-02')))
  // const [yaer, setYear] = useState(dayjs(new Date()).format('YYYY'))
  const [yearlist, setYearlist] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    //获取有数据的年份
  }, [])

  return (
    <>
      <NavBar></NavBar>
      <div className="queryview">
        <div className="overview">
          <dateContext.Provider value={{ date, setDate }}>
            <isLoadingContext.Provider value={{ isLoading, setIsLoading }}>
              {/* <h2>数据检索</h2> */}
              <DataCalendar></DataCalendar>
              <div className="queryout">
                <FileTab flex={2}></FileTab>
                <OverView flex={1}></OverView>
              </div>
            </isLoadingContext.Provider>
          </dateContext.Provider>
        </div>
      </div>
    </>
  )
}

export default DataQuery
