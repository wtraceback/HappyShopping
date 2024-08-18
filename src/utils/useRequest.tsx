import { useState, useRef } from 'react'
import axios, { AxiosRequestConfig } from 'axios'

// T 为传递进来的 ResponseType
function useRequest<T>(options: AxiosRequestConfig = {
    url: '/', method: 'GET', data: {}, params: {},
}) {
    // data 的类型定义为 ResponseType | null
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState('')
    const [loaded, setLoaded] = useState(false)
    const controllerRef = useRef(new AbortController())

    const cancel = () => {
        controllerRef.current.abort()
    }

    const request = (requestOptions?: AxiosRequestConfig) => {
        // 清空之前的请求状态和数据
        setData(null)
        setError('')
        setLoaded(false)

        // 发送请求
        return axios.request<T>({
            url: requestOptions?.url || options.url,
            method: requestOptions?.method || options.method,
            signal: controllerRef.current.signal,
            data: requestOptions?.data || options.data,
            params: requestOptions?.params || options.params,
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