import React from 'react'
import RasterView from './RasterView/RasterView'
import { Histogram } from './Histogram'
import { CursorInfo } from './CursorInfo/CursorInfo'
import { InfoContainer } from './InfoContainer'
import { NavBar } from './NavBar/NavBar'
import styles from './ImageView.css'

export class ImageView extends React.Component {
  render() {
    return (
      <div className="imageView">
        <NavBar></NavBar>
        <div class="gl-container-app">
          <div className="lm_item_left">
            <RasterView></RasterView>
            <div className="lm_splitter_horizontal"></div>
            <Histogram></Histogram>
          </div>
          <div className="lm_splitter_vertical"></div>
          <div className="lm_item_right">
            <CursorInfo></CursorInfo>
            <div className="lm_splitter_horizontal"></div>
            <CursorInfo></CursorInfo>
            <div className="lm_splitter_horizontal"></div>
            <InfoContainer></InfoContainer>
          </div>
        </div>
      </div>
    )
  }
}
