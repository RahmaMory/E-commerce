'use client'
import React from 'react'
import { Brand } from '@/app/types/brand.model'

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

export default function SliderBrandComp({ brand }: { brand: Brand[] }) {
  return (
    <>
   <div className="container mx-auto my-7">
    <h2 className='text-start text-4xl font-extrabold tracking-tighter my-5'>Brands :</h2>
       <Swiper
        slidesPerView={4}
        spaceBetween={5}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        {brand.map((brand)  => (
          <SwiperSlide key={brand._id}>
            <div className="relative h-[120px] w-full flex items-center justify-center my-5">
                <Link href={`/brands/${brand._id}`}>
                 <Image
    src={brand.image}
    priority
    loading="eager"
    fill
    sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
    alt={brand.name || "brand"}
    className="object-contain "
  />
                
                </Link>
 
</div>

                          {/* <p className='text-center text-2xl my-2'>{cat.name}</p> */}
          </SwiperSlide>
        ))}
      </Swiper>
   </div>
    </>
  )
}
