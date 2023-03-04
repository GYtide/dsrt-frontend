/**
 * 鼠标指针所指向的值
 */

import './RasterView.css'
import { frameContext, cursorContext } from '../ImageView'
import { useEffect, useContext } from 'react'
const CursorOverlay = () => {
  const { cursor, setCursor } = useContext(cursorContext)
  return (
    <div className="cursor-overlay">
      <div className="cursor-overlay-view">{`(${cursor.x} ,${
        cursor.y
      }) value:${0}`}</div>
    </div>
  )
}

export default CursorOverlay
