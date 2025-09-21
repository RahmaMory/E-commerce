import CatygoryGrid from '@/components/catygory-comp/CatygoryGrid'
import React from 'react'
import getCatigories from '../actions/categories.action';

export default async function Catpage() {
      const {data: categories} =await getCatigories();
  return (
    <div>
        <CatygoryGrid categories={categories}/>
      
    </div>
  )
}
