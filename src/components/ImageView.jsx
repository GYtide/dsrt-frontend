import RasterView from './RasterView/RasterView'
import { Histogram } from './Histogram'
import { CursorInfo } from './CursorInfo/CursorInfo'
import { InfoContainer } from './InfoContainer'
import { NavBar } from './NavBar/NavBar'
import { ToolPanel } from './ToolsPanel/ToolsPanel'
import styles from './ImageView.css'
import { useState, useContext, createContext, useEffect } from 'react'
import { Space, Spin } from 'antd'

export const frameContext = createContext() //帧数据(数据矩阵以及横纵坐标参数)
export const cursorContext = createContext() //帧数据(数据矩阵以及横纵坐标参数)

export const ImageView = ({ fitsid }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [cursor, setCursor] = useState({ x: 0, y: 0 }) //指针所指向的位置对应的值
  // const [fitsid, setfitsid] = useState('IMG2021010101') //当前预览文件
  const [hdu, sethdu] = useState('') //当前hdu文件头信息
  const [frame, setframe] = useState([]) //当前帧(帧序列)
  const [renderoption, setrenderoption] = useState('') //渲染参数

  // const onchangeCursor = () => {}

  /**
   * 获取文件的基本参数和第一帧
   */

  /**
   * 加载文件
   */
  useEffect(() => {
    const loadingFile = async () => {
      setIsLoading(true)
      const dataRes = await fetch('/data/image/image.bin', {
        method: 'get',
        responseType: 'arraybuffer',
      })
      const data = new Float32Array(await dataRes.arrayBuffer())
      setframe(data)
      setIsLoading(false)
    }
    loadingFile()
  }, [])

  return (
    <>
      {isLoading ? (
        <>
          <Spin size="small" />
          <Spin size="large" />
        </>
      ) : (
        <>
          <NavBar></NavBar>
          <div className="imageView">
            <frameContext.Provider value={{ frame, setframe }}>
              <cursorContext.Provider value={{ cursor, setCursor }}>
                <div className="gl-container-app">
                  <div className="lm_item_left">
                    <RasterView></RasterView>
                    <div className="lm_splitter_horizontal"></div>
                    <Histogram></Histogram>
                  </div>
                  <div className="lm_splitter_vertical"></div>
                  <div className="lm_item_right">
                    <ToolPanel></ToolPanel>
                    <div className="lm_splitter_horizontal"></div>
                    <CursorInfo></CursorInfo>
                    <div className="lm_splitter_horizontal"></div>
                    <InfoContainer></InfoContainer>
                  </div>
                </div>
              </cursorContext.Provider>
            </frameContext.Provider>
          </div>
        </>
      )}
    </>
  )
}
