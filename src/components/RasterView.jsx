import React from 'react'

export class RasterView extends React.Component {
  render() {
    return (
      <div id="file_container">
        <div class="lm_header">
          <ul class="lmtabs">
            <li class="lm_tab">
              <span class="tab_title">
                ODACH_DSRT05_SRSP_L1_05M_20220212081001_V01.01.fits
              </span>
            </li>
          </ul>
        </div>
        <div class="lm_body">
          <div id="image-panel"></div>
        </div>
      </div>
    )
  }
}
