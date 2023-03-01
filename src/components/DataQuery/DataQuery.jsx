import React from 'react'
import { NavBar } from '../NavBar/NavBar'
import { DataCalendar } from '../DataCalendar/DataCalendar'
import './DataQuery.css'
import { DropDown } from '../DropDown/DropDown'
import FileTab from '../FileList/FileTab'
import OverView from '../OverView/OverView'
const DataQuery = () => {
  return (
    <>
      <NavBar></NavBar>
      {/* <DropDown></DropDown> */}
      <div className="overview">
        <DataCalendar></DataCalendar>
        <div className="queryout">
          <FileTab flex={2}></FileTab>
          <OverView flex={1}></OverView>
        </div>
      </div>
    </>
  )
}

export default DataQuery
