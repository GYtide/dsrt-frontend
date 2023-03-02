import { Tabs } from 'antd'
import ViewChart from './ViewChart'
import { useEffect, useRef, useState } from 'react'
import { http } from '../../util'
import './index.css'
const Tab = () => <Tabs />

const OverView = (props) => {
  // const [date, setDate] = useState(props.date)
  const [isLoading, setIsLoading] = useState(true)
  const [time, setTime] = useState([])
  const [data, setData] = useState([])
  const [pixel, setPixel] = useState([])

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const dataRes = await fetch('/data/1d/1ddata.bin', {
        method: 'get',
        responseType: 'arraybuffer',
      })
      const timeRes = await fetch('/data/1d/1dtime.bin', {
        method: 'get',
        responseType: 'arraybuffer',
      })
      const pixelRes = await fetch('/data/1d/pix.bin', {
        method: 'get',
        responseType: 'arraybuffer',
      })

      const data = new Float32Array(await dataRes.arrayBuffer())
      const time = new Uint32Array(await timeRes.arrayBuffer())
      const pixel = new Uint8Array(await pixelRes.arrayBuffer())

      setTime(time)
      setData(data)
      setPixel(pixel)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const items = [
    {
      key: '1',
      label: `Tab 1`,
      children: (
        <div className="chartspanel">
          {isLoading ? (
            <div>加载中</div>
          ) : (
            <>
              <ViewChart
                Data={data}
                xData={time}
                yData={pixel}
                title={'一维投影概图'}></ViewChart>
              <ViewChart
                Data={data}
                xData={time}
                yData={pixel}
                title={'频谱概图'}></ViewChart>
            </>
          )}
        </div>
      ),
    },
  ]
  return (
    <Tabs
      defaultActiveKey="1"
      style={{ flex: props.flex }}
      items={items}></Tabs>
  )
}

export default OverView
