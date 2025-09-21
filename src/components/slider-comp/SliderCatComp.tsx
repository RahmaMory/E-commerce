'use client'
import { categories } from '@/app/types/category.model'
import React from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// import required modules
import { EffectFade, Navigation, Pagination } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'

export default function SliderCatComp({ category }: { category: categories[] }) {
  return (
    <>
   <div className="container mx-auto my-5">
    <h2 className='text-start text-4xl font-extrabold tracking-tighter my-7'>category :</h2>
       <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        {category.map((cat)  => (
          <SwiperSlide key={cat._id}>
            <div className="relative h-[250px] w-full">
              <Link href={`/cat/${cat._id}`}>
              <Image
                src={cat.image}
                priority
                loading="eager"
                fill
                sizes="(max-width:768px)100 vw (max-width:1200px) 50vw , 25vw"
                alt="slider-img"
                className="object-cover"
              />
              </Link>
              
            </div>
                          <p className='text-center text-2xl my-2'>{cat.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
   </div>
    </>
  )
}
