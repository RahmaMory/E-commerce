'use client'
import React from 'react'
import { useCart } from '@/app/context/CartContext';
import { Brand } from '@/app/types/brand.model';
import BrandCart from './BrandCart';

export default function BrandGrid({brands} : {brands :Brand[]}) {
    // console.log(products, 'grid system');
    
const x= useCart()
console.log(x,'cart');

  return (
    <>
    <div className="container mx-auto">

    <div className="text-start text-4xl tracking-tighter font-extrabold my-7">
    brands :
  </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {brands.map((brand)=><BrandCart key={brand._id} brand={brand} />)}
    </div>
    </div>
        
      
    </>
  )
}
