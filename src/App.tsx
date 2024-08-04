import "normalize.css"
// border: 1px; 一像素边框在不同的移动端中展示效果不一样，因此需要引入 border.css，
// 使用 border 的时候，直接使用 border.css 中定义好的即可
import './styles/border.css'
import "./styles/base.css"

import { HashRouter, Routes, Route } from "react-router-dom"
import Guide from './containers/Guide'
import Login from './containers/Login'
import Register from './containers/Register'

function App() {
  return (
    <HashRouter>
        <Routes>
            <Route path="/" element={<Guide />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    </HashRouter>
  );
}

export default App;