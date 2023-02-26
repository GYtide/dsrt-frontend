import React from 'react'

export class CursorInfo extends React.Component {
  render() {
    return (
      <div id="x-profile-container">
        <div class="lm_header"> 
          <ul class="lmtabs">
            <li class="lm_tab">
              <span class="tab_title">X Profile: Cursor</span>
            </li>
          </ul>
        </div>
        <div class="lm_body">
          <div id="xcoordinate"></div>
        </div>
      </div>
    )
  }
}
