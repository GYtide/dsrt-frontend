/**
 * 鼠标指针所指向的值
 */

import './RasterView.css'
import { frameContext, cursorContext } from '../ImageView'
import { useEffect, useContext } from 'react'
const CursorOverlay = () => {
  const { cursor, setCursor } = useContext(cursorContext)
  const { frame, setframe } = useContext(frameContext)
  return (
    <div className="cursor-overlay">
      {cursor.x >= 0 && cursor.y < 128 && cursor.y >= 0 && cursor.y < 128 ? (
        <div className="cursor-overlay-view">{`(${cursor.x} ,${
          cursor.y
        }) value:${frame[cursor.y * 128 + cursor.x]}`}</div>
      ) : (
        <div className="cursor-overlay-view">{`(${cursor.x} ,${cursor.y})`}</div>
      )}
    </div>
  )
}

export default CursorOverlay
