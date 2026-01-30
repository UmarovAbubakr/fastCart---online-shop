import React from 'react'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { notification } from 'antd';
import { Eye, Heart, ShoppingBag } from 'lucide-react';

import '../../App.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
const Swiper = () => {
    return (
        <div>
            <div className="max-w-[1170px] mx-auto">
                <Swiper
                    style={{ borderRadius: '5px' }}
                    spaceBetween={0}
                    autoplay={{ delay: 4000 }}
                    pagination={{ clickable: true }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper w-full bg-black text-white min-h-[400px] md:h-[444px]"
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="flex flex-col md:flex-row items-center justify-between h-full px-8 md:px-16 py-10">
                                <div className="flex flex-col gap-4 w-full md:w-1/2">
                                    <div className="flex items-center gap-4">
                                        <img src={slide.logo} alt="" className="w-8 h-8 object-contain" />
                                        <p>{slide.name}</p>
                                    </div>
                                    <h1 className="text-3xl md:text-5xl font-semibold leading-tight">{slide.name1} <br /> {slide.name2}</h1>
                                    <Link to="/shop" className="flex items-center gap-2 border-b border-white w-fit pb-1 group">
                                        <span>Shop Now</span>
                                        <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                                    </Link>
                                </div>
                                <img src={slide.img} alt="" className="h-[250px] md:h-[350px] object-contain" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default Swiper
