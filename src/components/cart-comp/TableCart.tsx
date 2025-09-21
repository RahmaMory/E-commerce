'use client'
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from 'next/image'
import { Badge } from '../ui/badge'
import { useCart } from '@/app/context/CartContext'
import { removeFromCart, updateFromCart } from '@/app/actions/cart.action'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function TableCart() {
  const { cartDetails, getCartDetails } = useCart();

  async function handleRemoveFromCart(productId:string){

    const response=await removeFromCart(productId);
    console.log(response,'remove from cart');
    // update cart context
     await getCartDetails();
     toast.success('Product removed from cart')
  }

    async function handleUpdatedCart(productId:string , count:number){

    const response=await updateFromCart (productId ,count);
    console.log(response,'ubdate cart');
    // update cart context
     await getCartDetails();
     toast.success('Product Ubdated successfully')
  }

  return (
    <div className="mx-auto w-3/4">
    {cartDetails && cartDetails.data?.products?.length > 0 ?   <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center p-6">Products</TableHead>
            <TableHead className="text-center p-6">Price</TableHead>
            <TableHead className="text-center p-6">Quantity</TableHead>
            <TableHead className="text-center p-6">SubTotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartDetails?.data.products.map((product) => (
            <TableRow key={product._id}>
              <TableCell className="font-medium p-3">
                <div className="flex gap-4 justify-center items-center text-center">
                  <div className="relative">
                    <Badge onClick={()=> handleRemoveFromCart(product.product._id)} className='absolute top-[-10px] left-[-10px] cursor-pointer'> x </Badge>
                    <Image 
                      src={product.product.imageCover}
                      width={60} 
                      height={60} 
                      alt={product.product.title} 
                    />
                  </div>
                  <p>{product.product.title.split(' ').slice(0,2).join(' ')}</p>
                </div>
              </TableCell>
              
              <TableCell className='text-center p-3'>{product.price} EGP</TableCell>
              
              <TableCell>
                <div className="flex justify-center items-center gap-2 p-3">
                  <button onClick={()=>handleUpdatedCart(product.product._id,product.count+1)} className='px-2 py-1 cursor-pointer bg-slate-400 border'>+</button>
                  <p>{product.count}</p>
                  <button onClick={()=>handleUpdatedCart(product.product._id,product.count-1)} className='px-2 py-1 cursor-pointer bg-slate-400 border'>-</button>
                </div>
              </TableCell>
              
              <TableCell className="text-center p-3">{product.price * product.count} EGP</TableCell>
            </TableRow>
          ))}

          <TableRow className='bg-slate-200'>
            <TableCell className='text-center p-6 font-bold'>Total Price</TableCell>
            <TableCell className='text-center p-6' colSpan={2}>{cartDetails?.data?.totalCartPrice} EGP</TableCell>
            <TableCell className='text-center p-6'>
              <button className='px-8 py-5 bg-black text-white rounded-md'>
                <Link href='/checkout'>
                CheckOut
                </Link>
                </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>:  <h2 className='text-center text-red-400 font-bold text-3xl'>Your Cart Is Empty!</h2>
      }
    </div>
  )
}
