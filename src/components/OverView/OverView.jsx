import { Tabs } from 'antd'

const Tab = () => <Tabs />

const OverView = (props) => {
  return (
    <Tabs
      style={{ flex: props.flex }}
      type="card"
      items={new Array('overview').map((value, index) => {
        return {
          label: `${value}`,
          key: index,
          children: `Content of Tab Pane ${value}`,
        }
      })}></Tabs>
  )
}

export default OverView
