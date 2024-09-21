import './style.scss'
import 'swiper/css';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import swiperImg from '../../images/首页_banner_@2x.png'
import useRequest from '../../hooks/useRequest';

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
    const { request } = useRequest(requestData)

    useEffect(() => {
        request().then((data) => {
            console.log(data);
        }).catch(e => {
            console.log(e?.message);
        })
    }, [requestData, request])

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
                    <span className='iconfont'>&#xe67c;</span>
                    优果购（昌平店）
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
                        <SwiperSlide>
                            <div className='swiper-item'>
                                <img className='swiper-item-img' src={swiperImg} alt='轮播图' />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='swiper-item'>
                                <img className='swiper-item-img' src={swiperImg} alt='轮播图' />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                    <div className='pagination'>{page}/2</div>
                </div>
            </div>
        </div>
    );
}

export default Home;