import { useState, useRef } from 'react'
import { Link } from 'react-router-dom';

import './style.scss'
import useRequest from '../../utils/useRequest'
import Modal, { ModalInterfaceType} from '../../components/Modal'

// 定义接口返回内容
type ResponseType = {
    success: boolean;
    data: {
        token: string;
    }
}

function Login() {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const modalRef = useRef<ModalInterfaceType>(null!)

    // 通过泛型传递给 useRequest 方法
    // 接收 data 类型也一定为 ResponseType | null
    const { request } = useRequest<ResponseType>()

    function handleSubmitBtnClick() {
        if (!phoneNumber) {
            modalRef.current.showMessage('手机号码不得为空！')
            return
        }

        if (!password) {
            modalRef.current.showMessage('密码不得为空！')
            return
        }

        request({
            url: '/api/login.json',
            // method: 'GET',
            // params: { phone: phoneNumber, password: password },
            method: 'POST',
            data: { phone: phoneNumber, password: password },
        }).then((data) => {
            data && console.log(data)
        }).catch((e: any) => {
            modalRef.current?.showMessage(e?.message || '未知异常')
        })
    }

    return (
        <div className="page login-page">
            <div className="tab">
                <div className="tab-item tab-item-left">登录</div>
                <div className="tab-item tab-item-right">
                    <Link to="/register">注册</Link>
                </div>
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