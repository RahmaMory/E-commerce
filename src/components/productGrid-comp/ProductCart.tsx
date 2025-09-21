
'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Products } from '@/app/types/product.model';
import Image from 'next/image';
import { StarRating } from 'react-flexible-star-rating';
import { Heart, ShoppingCart, ZoomIn } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useCart } from '@/app/context/CartContext';
import { addProductToCart } from '@/app/actions/cart.action';
import { addProductToWish, removeProductFromWish } from '@/app/actions/wishLIst.action';
import { useWish } from '@/app/context/WishListContext';

export default function ProductCart({ product }: { product: Products }) {
  const { getCartDetails } = useCart();
  const { getWishDetails, wishDetails } = useWish();

const isInWishlist = useMemo(() => {
  const raw = wishDetails?.data ?? [];
  return raw.some((x: any) => x === product._id || x?._id === product._id);
}, [wishDetails, product._id]);

  const [loading, setLoading] = useState(false);

  async function handleAddCart(productId: string) {
    const response = await addProductToCart(productId);
    toast.success(response?.message || "Added to cart");
    await getCartDetails();
  }

  async function toggleWish(productId: string) {
    try {
      setLoading(true);
      if (isInWishlist) {
        const res = await removeProductFromWish(productId);
        toast.success(res?.message || "Removed from wishlist");
      } else {
        const res = await addProductToWish(productId);
        toast.success(res?.message || "Added to wishlist");
      }
      await getWishDetails();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className='relative group overflow-hidden'>
      <div className="absolute top-[150px] right-[-100px] z-1 flex flex-col gap-2 group-hover:right-0 transition-all duration-500">
        <button
          onClick={() => handleAddCart(product._id)}
          className='bg-slate-200 px-2 py-2 text-black hover:text-blue-600'
        >
          <ShoppingCart />
        </button>

       <button
  disabled={loading}
  onClick={() => toggleWish(product._id)}
  className="bg-slate-200 px-2 py-2"
>
  <Heart
    className="w-5 h-5 hover:text-blue-600 transition-colors"
    color={isInWishlist ? 'red' : 'black'}
    fill={isInWishlist ? 'red' : 'none'}
  />
</button>


        <button className='bg-slate-200 px-2 py-2 text-black hover:text-blue-600'>
          <Link href={`/products/${product._id}`}>
            <ZoomIn />
          </Link>
        </button>
      </div>

      <CardHeader>
        <CardTitle>{product?.title ? product.title.split(' ').slice(0, 2).join(' ') : "No Title"}</CardTitle>
        <CardDescription>{product?.description ? product.description.split(' ').slice(0, 4).join(' ') + "..." : "No description"}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="relative w-full h-[300px]">
          {product?.imageCover ? (
            <Image src={product.imageCover} fill sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw" alt={product?.title || "product"} />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">No Image</div>
          )}
        </div>
      </CardContent>

      <CardFooter className='flex flex-col'>
        <h2 className='text-1xl font-bold'>Price: <span className='text-red-400'>{product?.price}</span> EGP</h2>
        <StarRating initialRating={Math.floor(product?.ratingsAverage)} dimension={5} />
      </CardFooter>
    </Card>
  );
}

