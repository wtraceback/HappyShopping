import './style.scss'
import 'swiper/css';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import swiperImg from '../../images/首页_banner_@2x.png'


function Home() {
    const [page, setPage] = useState(1)

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