import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useSelector } from 'react-redux';
import "../assets/css/swiperStyles.css";
import "swiper/css";
import "swiper/css/pagination";
import SliderCard from './sliderCard';
const Swipers = () => {
    const products = useSelector(state => state.products);
    const [fruits,setFruits] = useState();
    useEffect(() => {
        setFruits(products?.filter((data) => {
 return  data.productCategory === "fruits";
        }));
    }, [products]);
    return ( <div className=' w-full pt-8'>
     <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={false}
        modules={[Pagination]}
        grabCursor = {true}
        className="mySwiper"
      >
        {fruits && fruits?.map((fruit,i) => {
         return  <SwiperSlide key={i}><SliderCard key={i} data={fruit} index={i} /></SwiperSlide>
        })}
      </Swiper></div>
       );
}
 
export default Swipers;