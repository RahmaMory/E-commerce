'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getWishlist } from '@/app/actions/wishLIst.action';

export type WishResponse = {
  status: string;
  data: string[];     // IDs only
  message?: string;
  count?: number;
};

interface WishContextType {
  wishDetails: WishResponse | null;
  getWishDetails: () => Promise<void>;
  setWishDetails: (w: WishResponse | null) => void;
}

const WishContext = createContext<WishContextType>({
  wishDetails: null,
  getWishDetails: async () => {},
  setWishDetails: () => {},
});

export default function WishContextProvider({ children }: { children: React.ReactNode }) {
  const [wishDetails, setWishDetails] = useState<WishResponse | null>(null);

  async function getWishDetails() {
    const res = await getWishlist();
    setWishDetails(res);
  }

  useEffect(() => { getWishDetails(); }, []);

  return (
    <WishContext.Provider value={{ wishDetails, getWishDetails, setWishDetails }}>
      {children}
    </WishContext.Provider>
  );
}

export function useWish() {
  return useContext(WishContext);
}
