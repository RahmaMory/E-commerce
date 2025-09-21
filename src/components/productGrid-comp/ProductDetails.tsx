'use client'
import { ProductDetails } from '@/app/types/productDetails.model'
import Image from 'next/image';
import React from 'react'
import { StarRating } from 'react-flexible-star-rating';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


// import required modules
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import toast from 'react-hot-toast';
import { addProductToCart } from '@/app/actions/cart.action';
import { useCart } from '@/app/context/CartContext';


export default function ProductDetails(productDetails :{productDetails:ProductDetails}) {
        //  console.log(productDetails,'details');


  const {getCartDetails}=useCart();
  async function handleAddCart(productId:string){
    const response=await addProductToCart(productId);
    console.log(response,'add to cart');
    toast.success(response?.message);
    // update cart context
    await getCartDetails();

  }


  return (
    <>
    <div className="flex justify-between items-center gap-5">
      <div className="w-full md:w-1/2">
        
        <Swiper
             slidesPerView={1}
             spaceBetween={10}
             navigation={true}
             pagination={{
               clickable: true,
             }}
             modules={[EffectFade, Navigation, Pagination]}
             className="mySwiper"
           >
             {productDetails.productDetails.images.map((src,index)  => (
               <SwiperSlide key={index}>
                 <div className="relative h-[600px] w-full">
                   <Image
                     src={src}
                     priority
                     loading="eager"
                     fill
                     sizes="(max-width:768px)100 vw (max-width:1200px) 50vw , 25vw"
                     alt="slider-img"
                     className="object-contain"
                   />
                   
                 </div>
               </SwiperSlide>
             ))}
           </Swiper>
      </div>

      <div className="w-full md:w-1/2">
      <h2 className='text-3xl font-bold  tracking-tighter my-7'>{productDetails.productDetails.title}</h2>
      <p className='text-slate-500 tracking-tighter my-7 text-2xl'>{productDetails.productDetails.description}</p>
      <div className="flex justify-between items-center">
        <div className="catPrice">
          <p className='text-lg my-4'>{productDetails.productDetails.category.name}</p>
          <p className='text-lg my-4'>Price: {productDetails.productDetails.price}</p>
        </div>
           <div className=" flex gap-2">
            <StarRating initialRating={Math.floor(productDetails.productDetails.ratingsAverage)} dimension={5} />
           <span>{productDetails.productDetails.ratingsAverage}</span>
           </div>
        
      </div>
      <button onClick={()=>handleAddCart(productDetails.productDetails._id)} className='w-full cursor-pointer rounded-lg bg-black text-white py-4'>+ Add To Cart</button>

      </div>

    </div>
      
    </>
  )
}
