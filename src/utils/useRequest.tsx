import { useState, useRef } from 'react'
import axios, { AxiosRequestConfig, Method } from 'axios'

// T 为传递进来的 ResponseType
function useRequest<T>(
    url: string,
    method: Method,
    payload: AxiosRequestConfig
) {
    // data 的类型定义为 ResponseType | null
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState('')
    const [loaded, setLoaded] = useState(false)
    const controllerRef = useRef(new AbortController())

    const cancel = () => {
        controllerRef.current.abort()
    }

    const request = () => {
        // 清空之前的请求状态和数据
        setData(null)
        setError('')
        setLoaded(false)

        // 发送请求
        return axios.request<T>({
            url,
            method,
            signal: controllerRef.current.signal,
            data: payload
        }).then(response => {
            setData(response.data)
            return response.data
        }).catch((e: any) => {
            setError(e.message || 'unknow request error.')
            throw new Error(e)
        }).finally(() => {
            setLoaded(true)
        })
    }

    // 把 data 返回，返回 data 的类型一定为 ResponseType | null
    return { data, error, loaded, request, cancel }
}

export default useRequest