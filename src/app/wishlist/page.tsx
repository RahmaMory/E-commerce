import React from 'react';
import { getProducts } from '@/app/actions/products.action';
import { getWishlist } from '@/app/actions/wishLIst.action';
import TableWishCart from '@/components/wish-comp/TableWish';

export default async function WishListPage() {
  const { data: catalog } = await getProducts();   
  await getWishlist(); 

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      <TableWishCart catalog={catalog} />
    </div>
  );
}
