import './style.scss'
import 'swiper/css';
import type { ResponseType } from './types';
import { useEffect, useState } from 'react';
import useRequest from '../../hooks/useRequest';
import Banner from './components/Banner'
import Category from './components/Category'
import Card from './components/Card'


const localLocation = localStorage.getItem('location')
const locationHistory = localLocation ? JSON.parse(localLocation) : null

// 默认请求数据
const defaultRequestData = {
    url: '/home',
    method: 'POST',
    data: {
        latitude: locationHistory ? locationHistory.latitude : 37.7304167,
        longitude: locationHistory ? locationHistory.longitude : -122.384425,
    }
}

function Home() {
    const [requestData, setRequestData] = useState(defaultRequestData)
    const { data } = useRequest<ResponseType>(requestData)

    // 获取经纬度信息
    useEffect(() => {
        if (navigator.geolocation && !locationHistory) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position)
                const { coords } = position
                const { latitude, longitude } = coords

                localStorage.setItem('location', JSON.stringify({
                    latitude, longitude
                }))

                setRequestData({
                    ...defaultRequestData,
                    data: { latitude, longitude }
                })
            }, (error) => {
                console.log(error)
            }, {timeout: 500})
        }
    }, [])

    let location, banners, categories, freshes = undefined
    const dataResult = data?.data
    if (dataResult) {
        location = dataResult.location
        banners = dataResult.banners
        categories = dataResult.categories
        freshes = dataResult.freshes
    }

    return (
        <div className="page home-page">
            <Banner location={location} banners={banners} />
            <Category categories={categories} />
            <Card title={"新品尝鲜"} freshes={freshes} />

            <div className="bottom">- 我是有底线的 -</div>
            <div className='docker'>
                <div className="docker-item docker-item-active">
                    <p className="iconfont docker-item-icon">&#xe603;</p>
                    <p className="docker-item-title">首页</p>
                </div>
                <div className="docker-item">
                    <p className="iconfont docker-item-icon">&#xe60d;</p>
                    <p className="docker-item-title">分类</p>
                </div>
                <div className="docker-item">
                    <p className="iconfont docker-item-icon">&#xe6b1;</p>
                    <p className="docker-item-title">购物车</p>
                </div>
                <div className="docker-item">
                    <p className="iconfont docker-item-icon">&#xe618;</p>
                    <p className="docker-item-title">我的</p>
                </div>
            </div>
        </div>
    );
}

export default Home;