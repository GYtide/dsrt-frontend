import React from 'react'
import styles from './view.css'
export class InfoContainer extends React.Component {
  render() {
    return (
      <div id="info-container">
        <div className="lm_header">
          <span className="tab_title">Image Info</span>
        </div>
        <div className="lm_body"></div>
      </div>
    )
  }
}
