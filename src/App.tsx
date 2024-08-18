import "normalize.css"
// border: 1px; 一像素边框在不同的移动端中展示效果不一样，因此需要引入 border.css，
// 使用 border 的时候，直接使用 border.css 中定义好的即可
import './styles/border.css'
import "./styles/base.css"

import { createHashRouter, RouterProvider } from "react-router-dom"
import Guide from './containers/Guide'
import Account from './containers/Account'
import Login from './containers/Account/Login'
import Register from './containers/Account/Register'

const router = createHashRouter([
    {
        path: '/',
        element: <Guide />,
    },
    {
        path: '/account',
        element: <Account />,
        children: [
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
        ]
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App;