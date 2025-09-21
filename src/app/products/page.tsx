import React from 'react'
import {getProducts} from '../actions/products.action';
import { getUserCart } from '../actions/cart.action';
import ProductsGrid from '@/components/productGrid-comp/ProductsGrid';

export default async function Productspage() {
    const {data: producuts} =await getProducts();
    await getUserCart();

  
  return (
    <div>
  <ProductsGrid products={producuts}/>
      
    </div>
  )
}
