'use client';

import React from 'react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { Badge } from '../ui/badge';
import { useCart } from '@/app/context/CartContext';
import { useWish } from '@/app/context/WishListContext';

export default function Navbar() {
  const session = useSession();
  const { cartDetails } = useCart();
  const { wishDetails } = useWish();

  const wishCount = wishDetails?.data?.length ?? 0;

  return (
    <NavigationMenu className='max-w-7xl p-5 mx-auto flex justify-between'>
      <NavigationMenuList className='font-bold text-4xl tracking-tighter'>
        <NavigationMenuItem className='flex gap-2'>
          <Image src="/favicon.ico" alt="Zenya Logo" width={32} height={32} />
          <Link href='/'>Zenya</Link>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuList className='text-md font-bold gap-4'>
        <NavigationMenuItem><Link href='/'>Home</Link></NavigationMenuItem>
        <NavigationMenuItem><Link href='/products'>Products</Link></NavigationMenuItem>
        <NavigationMenuItem><Link href='/cart'>Cart</Link></NavigationMenuItem>
        <NavigationMenuItem><Link href='/wishlist'>WishList</Link></NavigationMenuItem>
        <NavigationMenuItem><Link href='/cat'>Categories</Link></NavigationMenuItem>
        <NavigationMenuItem><Link href='/brands'>Brands</Link></NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuList className='text-md font-bold gap-4'>
        <NavigationMenuItem className='relative'>
          <ShoppingCart className='cursor-pointer' />
          {cartDetails?.numOfCartItems > 0 && (
            <Badge className="absolute top-[-20px] right-[-25px]">
              {cartDetails.numOfCartItems}
            </Badge>
          )}
        </NavigationMenuItem>

        <NavigationMenuItem className='relative'>
          <Heart className='cursor-pointer' />
          {wishCount > 0 && (
            <Badge className="absolute top-[-20px] right-[-25px]">
              {wishCount}
            </Badge>
          )}
        </NavigationMenuItem>

        {session.data ? (
          <NavigationMenuItem>
            <Link href='/' onClick={() => signOut({ callbackUrl: '/login' })}>Logout</Link>
          </NavigationMenuItem>
        ) : (
          <>
            <NavigationMenuItem><Link href='/login'>Login</Link></NavigationMenuItem>
            <NavigationMenuItem><Link href='/register'>Register</Link></NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
