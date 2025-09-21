'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import toast from 'react-hot-toast';
import axios from 'axios';

import { useWish } from '@/app/context/WishListContext';
import { removeProductFromWish } from '@/app/actions/wishLIst.action';
import { Products } from '@/app/types/product.model';

type Props = { catalog?: Products[] };

export default function TableWishCart({ catalog }: Props) {
  const { wishDetails, getWishDetails } = useWish();
  const [items, setItems] = useState<Products[]>([]);
  const [loading, setLoading] = useState(false);

  const idList = useMemo(() => {
    const raw = wishDetails?.data ?? [];
    return (raw as any[]).map(x => (typeof x === 'string' ? x : x?._id)).filter(Boolean) as string[];
  }, [wishDetails]);

  useEffect(() => {
    async function resolveItems() {
      if (!idList.length) { setItems([]); return; }

      if (catalog?.length) {
        const setIds = new Set(idList);
        setItems(catalog.filter(p => setIds.has(p._id)));
        return;
      }

      setLoading(true);
      try {
        const results = await Promise.all(
          idList.map(id =>
            axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
                 .then(r => r?.data?.data as Products)
                 .catch(() => null)
          )
        );
        setItems(results.filter(Boolean) as Products[]);
      } finally {
        setLoading(false);
      }
    }
    resolveItems();
  }, [idList, catalog]);

  async function handleRemove(productId: string) {
    try {
      const response = await removeProductFromWish(productId);
      toast.success(response?.message || 'Product removed from wishlist');
      await getWishDetails();
    } catch (err) {
      console.error(err);
      toast.error('Failed to remove product');
    }
  }

  if (loading) return <div className='text-center text-2xl font-bold my-10'>Loading wishlist…</div>;
  if (!idList.length) return <div className='text-center text-2xl font-bold my-10'>No Products in Wish Cart</div>;

  return (
    <div className="mx-auto w-3/4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center p-6">Products</TableHead>
            <TableHead className="text-center p-6">Price</TableHead>
            <TableHead className="text-center p-6">Remove</TableHead>
            <TableHead className="text-center p-6">View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((product) => (
            <TableRow key={product._id}>
              <TableCell className="font-medium p-3">
                <div className="flex gap-4 justify-center items-center text-center">
                  <div className="relative">
                    <Badge
                      onClick={() => handleRemove(product._id)}
                      className='absolute top-[-10px] left-[-10px] cursor-pointer'
                    >
                      x
                    </Badge>
                    <Image src={product.imageCover} width={60} height={60} alt={product.title} />
                  </div>
                  <p>{product.title.split(' ').slice(0, 2).join(' ')}</p>
                </div>
              </TableCell>

              <TableCell className='text-center p-3'>{product.price} EGP</TableCell>

              <TableCell className='text-center p-3'>
                <button
                  onClick={() => handleRemove(product._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md"
                >
                  Remove
                </button>
              </TableCell>

              <TableCell className='text-center p-3'>
                <Link href={`/products/${product._id}`}>
                  <button className='px-3 py-1 bg-black text-white rounded-md'>View Product</button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
