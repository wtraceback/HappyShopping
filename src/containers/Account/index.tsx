import './style.scss'
import { useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'


function Account() {
    const location = useLocation()
    const isLoginActivated = location.pathname === '/account/login'
    const loginActiveClass = isLoginActivated ? 'tab-item-active' : ''
    const registerActiveClass = !isLoginActivated ? 'tab-item-active' : ''
    const navigate = useNavigate()

    // 如果已经登录，自动跳转到商城首页
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/home')
        }
    }, [navigate])

    return (
        <div className="page account-page">
            <div className="tab">
                <div className={`tab-item tab-item-left ${loginActiveClass}`}>
                    <Link to="/account/login">登录</Link>
                </div>
                <div className={`tab-item tab-item-right ${registerActiveClass}`}>
                    <Link to="/account/register">注册</Link>
                </div>
            </div>

            <Outlet />
        </div>
    )
}

export default Account