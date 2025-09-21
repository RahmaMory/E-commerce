import { getProductsDetails } from '@/app/actions/products.action';
import ProductDetails from '@/components/productGrid-comp/ProductDetails';
import React from 'react'

export default async function productsDetails({params}:{params :{id:string}}) {
    const {id}=await params;
    const {data : productDetails} =await getProductsDetails(id);
    

  return (
    <>
      <div className="container mx-auto">
        <ProductDetails productDetails={productDetails}/>

      </div>
    </>
  )
}
