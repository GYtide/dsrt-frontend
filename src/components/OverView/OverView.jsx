import { Tabs } from 'antd'
import ViewChart from './ViewChart'
import { useEffect, useRef, useState, useContext } from 'react'
import { http } from '../../util'
import './index.css'
import { dateContext, isLoadingContext } from '../DataQuery/DataQuery'
const Tab = () => <Tabs />

const OverView = (props) => {
  const { date, setDate } = useContext(dateContext)
  const { isLoading, setIsLoading } = useContext(isLoadingContext)
  const [projectimg, setprojectimg] = useState([])
  const [speovimg, setspeovimg] = useState([])
  useEffect(() => {
    async function fetchData(datestr) {
      var resData = await fetch(`overview/projectview/?date=${datestr}`).then(
        (res) => res.json()
      )
      setprojectimg(resData[0])
    }
    setIsLoading(true)
    fetchData(date.format('YYYY-MM-DD'))
    setIsLoading(false)
  }, [date])

  const items = [
    {
      key: '1',
      label: `Tab 1`,
      children: (
        <div className="chartspanel">
          <ViewChart Data={projectimg} title={'一维投影概图'}></ViewChart>
          <ViewChart Data={projectimg} title={'频谱概图'}></ViewChart>
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
