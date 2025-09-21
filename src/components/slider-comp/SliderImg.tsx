'use client'
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { MoveRight } from 'lucide-react';


// import required modules
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { Button } from '../ui/button';
export default function SliderImg() {
  return (
    <>
     <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
            <div className="relative h-[600px] w-full">
              <Image src='/slider/hair-salon-cosmetic-mockup_55-2147486365.avif' priority loading='eager' sizes='(max-width:768px)100 vw (max-width:1200px) 50vw , 25vw' fill alt='slider-img' className='object-cover' />
              <div className="absolute top-[200px] left-[40px] text-xl">
                
                    <h2 className='font-bold  my-7 text-red-900'>summer collection</h2>
                    <p className='font-bold my-7'>Upgrade your beauty routine with professional touch.</p>
                    <Button className='px-10 my-3'>Shop Now <MoveRight/></Button>
               

              </div>

            </div>
        </SwiperSlide>
       <SwiperSlide>
            <div className="relative h-[600px] w-full">
              <Image src='/slider/bestskincare.webp'  priority loading='eager' sizes='(max-width:768px)100 vw (max-width:1200px) 50vw , 25vw' fill alt='slider-img' className='object-cover' />
              <div className="absolute top-[200px] left-[40px]  text-xl">
                
                    <h2 className='font-bold  my-7  text-red-900'>summer collection</h2>
                    <p className='font-bold my-7'>Glow starts here – skincare that really works.</p>
                    <Button className='px-10 my-3'>Shop Now <MoveRight/></Button>
               

              </div>

            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="relative h-[600px] w-full">
              <Image src='/slider/metaworks.hu-termek-modellezes-3d-termekmodellezes-2023-2.jpg'  priority loading='eager' sizes='(max-width:768px)100 vw (max-width:1200px) 50vw , 25vw' fill alt='slider-img' className='object-cover' />
              <div className="absolute top-[200px] left-[40px]  text-xl">
                
                    <h2 className='font-bold  my-7 text-red-900'>summer collection</h2>
                    <p className='font-bold my-7'>Glow in every drop – discover the power of our serum.</p>
                    <Button className='px-10 my-3'>Shop Now <MoveRight/></Button>
               

              </div>

            </div>
        </SwiperSlide>
   
      </Swiper>
      
    </>
  )
}
