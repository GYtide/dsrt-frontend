import React from 'react'
import { NavBar } from '../NavBar/NavBar'
import { DataCalendar } from '../DataCalendar/DataCalendar'
import './OverView.css'
import { DropDown } from '../DropDown/DropDown'
export class OverView extends React.Component {
  render() {
    return (
      <>
        <NavBar></NavBar>
        {/* <DropDown></DropDown> */}
        <div className="overview">
          <DataCalendar></DataCalendar>
        </div>
      </>
    )
  }
}
