import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import './style.scss'

function Login() {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')

    const [data, setData] = useState(null)
    const [error, setError] = useState('')
    const [loaded, setLoaded] = useState(false)

    function handleSubmitBtnClick() {
        axios.get('/a.json')
            .then((response) => {
                setLoaded(true)
                setData(response.data)
            })
            .catch((error) => {
                setLoaded(true)
                setError(error.message)
            })
    }

    if (loaded) {
        setLoaded(false)
        if (data) {
            alert('请求成功')
        } else {
            alert(error)
        }
    }

    // 处理页面跳转相关的逻辑
    const navigate = useNavigate()
    const handleRegisterClick = useCallback(() => {
        navigate('/register')
    }, [navigate])

    return (
        <div className="page login-page">
            <div className="tab">
                <div className="tab-item tab-item-left">登录</div>
                <div
                    className="tab-item tab-item-right"
                    onClick={handleRegisterClick}
                >注册</div>
            </div>
            <div className="form">
                <div className="form-item">
                    <div className="form-item-title">手机号</div>
                    <input
                        value={phoneNumber}
                        className="form-item-content"
                        placeholder="请输入手机号"
                        onChange={(e) => { setPhoneNumber(e.target.value) }}
                    />
                </div>
                <div className="form-item">
                    <div className="form-item-title">密码</div>
                    <input
                        value={password}
                        type="password"
                        className="form-item-content"
                        placeholder="请输入密码"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                </div>
            </div>
            <div
                className="submit"
                onClick={handleSubmitBtnClick}
            >
                登录
            </div>
            <p className="notice">
                *登录即表示您赞同使用条款及隐私政策
            </p>
        </div>
    )
}

export default Login