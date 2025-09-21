'use server';

import axios from 'axios';
import { getUserToken } from '@/lib/tokenUser.utils';

const BASE = 'https://ecommerce.routemisr.com/api/v1';

export async function addProductToWish(productId: string) {
  const token = await getUserToken();
  const res = await axios.post(
    `${BASE}/wishlist`,
    { productId },                           
    { headers: { token: token as string } }
  );
  return res.data as { status: string; message: string; data: string[] };
}

export async function getWishlist() {
  const token = await getUserToken();
  const res = await axios.get(`${BASE}/wishlist`, {
    headers: { token: token as string },
  });
  // { status, data: string[] } ← IDs only
  return res.data as { status: string; data: string[]; message?: string };
}

export async function removeProductFromWish(productId: string) {
  const token = await getUserToken();
  const res = await axios.delete(`${BASE}/wishlist/${productId}`, {
    headers: { token: token as string },
  });
  return res.data as { status: string; message: string; data: string[] };
}
