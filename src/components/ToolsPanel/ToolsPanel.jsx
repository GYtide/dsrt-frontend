import { useRef, useContext } from 'react'

export const ToolPanel = () => {
  const domRef = useRef()
  return (
    <div id="tools-container">
      <div className="lm_header">
        <span className="tab_title">Tools</span>
      </div>
      <div className="lm_body">
        <div id="toolspanel">
          <div ref={domRef} style={{ height: '100%' }}></div>
        </div>
      </div>
    </div>
  )
}
