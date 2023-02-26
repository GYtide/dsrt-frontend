import React from 'react'
import { RasterView } from './RasterView'
import { Histogram } from './Histogram'
import { CursorInfo } from './CursorInfo'
import { InfoContainer } from './InfoContainer'
export class ImageView extends React.Component {
  render() {
    return (
      <div id="root">
        <div class="App">
          <div class="gl-container-app">
            <div class="lm_item_left">
              <RasterView></RasterView>
              <div class="lm_splitter_horizontal"></div>
              <Histogram></Histogram>
            </div>
            <div class="lm_splitter_vertical"></div>
            <div class="lm_item_right">
              <CursorInfo></CursorInfo>
              <div class="lm_splitter_horizontal"></div>
              <CursorInfo></CursorInfo>
              <div class="lm_splitter_horizontal"></div>
              <InfoContainer></InfoContainer>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
