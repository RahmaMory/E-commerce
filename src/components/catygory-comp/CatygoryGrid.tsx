'use client'
import React from 'react'
import { categories } from '@/app/types/category.model';
import CategoryCard from './CategoryCart';

export default function CatygoryGrid({categories} : {categories :categories[]}) {
        console.log(categories, 'grid system cat');

        


  return (
    <>
    <div className="container mx-auto">
      <div>
        <h2 className='text-start text-3xl tracking-tighter font-extrabold my-7'>Categories:</h2>
      </div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {categories.map((category)=><CategoryCard key={category._id} category={category} />)}
    </div>
    </div>

    </>
  )
}
