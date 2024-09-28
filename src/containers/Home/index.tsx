import './style.scss'
import 'swiper/css';
import type { ResponseType } from './types';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import swiperImg from '../../images/首页_banner_@2x.png'
import useRequest from '../../hooks/useRequest';
import vegetableImg from '../../images/home_xxsc_icon_@2x.png'
import freshImg from '../../images/xpcx金锣去皮五花肉_@2x.png'


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
    const [page, setPage] = useState(1)
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

    return (
        <div className="page home-page">
            <div className='banner'>
                <h3 className='location'>
                    <span className='iconfont'>&#xe650;</span>
                    {data?.data.location.address || ''}
                </h3>
                <div className='search'>
                    <span className='iconfont'>&#xe64e;</span>
                    请输入你需要搜索的在内容
                </div>
                <div className='swiper-area'>
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={1}
                        onSlideChange={(e: any) => setPage(e.activeIndex + 1)}
                    >
                        {
                            (data?.data.banners || []).map((item) => {
                                return (
                                    <SwiperSlide key={item.id}>
                                        <div className='swiper-item'>
                                            <img className='swiper-item-img' src={item.url ? item.url : swiperImg} alt='轮播图' />
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                    <div className='pagination'>{page}/{data?.data.banners.length || 0}</div>
                </div>
            </div>
            <div className='category'>
                {
                    (data?.data.categories || []).map((item) => {
                        return (
                            <div className="category-item" key={item.id}>
                                <img className="category-item-img" alt={item.name} src={item.imgUrl ? item.imgUrl : vegetableImg} />
                                <p className="category-item-desc">{item.name}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className="card">
                <h3 className="card-title">
                    <img alt="新品尝鲜" className="card-title-img" src="http://statics.dell-lee.com/shopping/hot.png" />
                    新品尝鲜
                    <div className="card-title-more">
                        更多<span className="iconfont">&#xe7ad;</span>
                    </div>
                </h3>
                <div className="card-content">
                    {
                        (data?.data.freshes || []).map((item) => {
                            return (
                                <div className="card-content-item" key={item.id}>
                                    <img alt={item.name} className="card-content-item-img" src={item.imgUrl ? item.imgUrl : freshImg} />
                                    <p className="card-content-item-desc">{item.name}</p>
                                    <div className="card-content-item-price">
                                        <span className="card-content-item-yen">¥</span>{item.price}
                                        <div className="iconfont">&#xe758;</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
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