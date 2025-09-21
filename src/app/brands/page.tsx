import React from 'react'
import { getBrands } from '../actions/brand.action';
import BrandGrid from '@/components/brand-comp/BrandsGrid';

export default async function Brandspage() {

    const {data: brands} =await getBrands();
    console.log(brands.data,'brands page');
  return (
    <>
    <div>

      <BrandGrid brands={brands} />
    </div>

    </>
  )
}

      
 