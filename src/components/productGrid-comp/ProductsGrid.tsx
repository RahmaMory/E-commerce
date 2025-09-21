'use client'
import { Products } from '@/app/types/product.model'
import React from 'react'
import ProductCart from './ProductCart';
import { useCart } from '@/app/context/CartContext';

export default function ProductsGrid({products} : {products :Products[]}) {
    // console.log(products, 'grid system');
    
const x= useCart()
console.log(x,'cart');

  return (
    <>
    <div className="container mx-auto">

    <div className="text-start text-4xl tracking-tighter font-extrabold my-7">
    products :
  </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {products.map((product)=><ProductCart key={product._id} product={product} />)}
    </div>
    </div>
        
      
    </>
  )
}


