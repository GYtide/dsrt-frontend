import React from 'react'
import { NavBar } from '../NavBar/NavBar'
import DataCalendar from '../DataCalendar/DataCalendar'
import './DataQuery.css'
import { DropDown } from '../DropDown/DropDown'
import FileTab from '../FileList/FileTab'
import OverView from '../OverView/OverView'
import { createContext, useEffect, useState } from 'react'
const DataQuery = () => {
  const date = { year: 2023, month: 1, day: 1 }
  return (
    <>
      <NavBar></NavBar>
      <div className="queryview">
        <div className="overview">
          {/* <h2>数据检索</h2> */}
          <DataCalendar></DataCalendar>
          <div className="queryout">
            <FileTab flex={2}></FileTab>
            <OverView flex={1} date={{ date }}></OverView>
          </div>
        </div>
      </div>
    </>
  )
}

export default DataQuery
