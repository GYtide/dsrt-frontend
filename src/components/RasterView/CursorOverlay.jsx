/**
 * 鼠标指针所指向的值
 */

import { useEffect } from 'react'
import './RasterView.css'
const CursorOverlay = ({ value }) => {
  return (
    <div className="cursor-overlay">
      <div className="cursor-overlay-view">{`(${value.x} ,${value.y}) value:${value.data}`}</div>
    </div>
  )
}

export default CursorOverlay
