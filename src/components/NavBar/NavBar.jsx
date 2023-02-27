import React from 'react'
import styles from './NavBar.css'
export class NavBar extends React.Component {
  render() {
    return (
      <nav class="navbar">
        <div class="navbar-container">
          <div class="row">
            <a class="nav-brand" width="260px"></a>
            <a class="nav-link">
              <div class="nav-item index-topNav-item" id="navLogin">
                Login
              </div>
            </a>
            <a class="nav-link index-topNav-link">
              <div class="nav-item index-topNav-item" id="navLogin">
                中文
              </div>
            </a>
          </div>
        </div>
      </nav>
    )
  }
}
