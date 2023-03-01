import { Tabs } from 'antd'
const onChange = (key) => {
  console.log(key)
}
const FileTab = (props) => (
  <Tabs
    style={{ flex: props.flex }}
    onChange={onChange}
    type="card"
    items={new Array('image', 'spetrum').map((value, index) => {
      return {
        label: `${value}`,
        key: index,
        children: `Content of Tab Pane ${value}`,
      }
    })}
  />
)
export default FileTab
