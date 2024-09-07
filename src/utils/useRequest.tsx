import { useState, useRef, useCallback } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { useNavigate } from 'react-router-dom'

// 默认请求参数
const defaultRequestConfig = {
    url: '/', method: 'GET', data: {}, params: {},
}

// T 为传递进来的 ResponseType
function useRequest<T>(options: AxiosRequestConfig = defaultRequestConfig) {
    // data 的类型定义为 ResponseType | null
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState('')
    const [loaded, setLoaded] = useState(false)
    const controllerRef = useRef(new AbortController())
    const navigate = useNavigate()

    const cancel = () => {
        controllerRef.current.abort()
    }

    const request = useCallback((requestOptions?: AxiosRequestConfig) => {
        // 清空之前的请求状态和数据
        setData(null)
        setError('')
        setLoaded(false)

        // 发请求时，携带登录 token 给后端
        const loginToken = localStorage.getItem('token')
        const headers = loginToken ? {
            token: loginToken,
        } : {}

        // 发送请求
        return axios.request<T>({
            url: requestOptions?.url || options.url,
            method: requestOptions?.method || options.method,
            signal: controllerRef.current.signal,
            data: requestOptions?.data || options.data,
            params: requestOptions?.params || options.params,
            headers
        }).then(response => {
            setData(response.data)
            return response.data
        }).catch((e: any) => {
            if (e?.response?.status === 403) {
                localStorage.removeItem('token')
                navigate('/account/login')
            }
            setError(e.message || 'unknow request error.')
            throw new Error(e)
        }).finally(() => {
            setLoaded(true)
        })
    }, [navigate, options])

    // 把 data 返回，返回 data 的类型一定为 ResponseType | null
    return { data, error, loaded, request, cancel }
}

export default useRequest