import React from 'react'
import { Option } from './option'
import { CursorCharts } from './CursorCharts'
export class CursorInfo extends React.Component {
  render() {
    return (
      <div id="x-profile-container">
        <div className="lm_header">
          <span className="tab_title">X Profile: Cursor</span>
        </div>
        <div className="lm_body">
          <div id="xcoordinate">
            <CursorCharts option={Option}></CursorCharts>
          </div>
        </div>
      </div>
    )
  }
}
