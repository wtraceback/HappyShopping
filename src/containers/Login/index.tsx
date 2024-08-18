import { useCallback, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import useRequest from '../../utils/useRequest'

import './style.scss'
import Modal, { ModalInterfaceType} from '../../components/Modal'

// 定义接口返回内容
type ResponseType = {
    name: string;
}

function Login() {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const modalRef = useRef<ModalInterfaceType>(null!)

    // 通过泛型传递给 useRequest 方法
    // 接收 data 类型也一定为 ResponseType | null
    const { request } = useRequest<ResponseType>('/a.json', 'GET', {})

    function handleSubmitBtnClick() {
        if (!phoneNumber) {
            modalRef.current.showMessage('手机号码不得为空！')
            return
        }

        if (!password) {
            modalRef.current.showMessage('密码不得为空！')
            return
        }

        request().then((data) => {
            data && console.log(data.name)
        }).catch((e: any) => {
            modalRef.current?.showMessage(e?.message || '未知异常')
        })
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

            <Modal ref={modalRef} />
        </div>
    )
}

export default Login