import logo from './logo.svg'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { ImageView } from './components/ImageView'
import { OverView } from './components/OverView/OverView'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Link to="/view">VIEW</Link> */}
        <Routes>
          <Route path="/" element={<OverView />}></Route>
          <Route path="/view" element={<ImageView />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
