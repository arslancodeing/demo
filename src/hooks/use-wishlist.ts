'use client';
import { useContext } from 'react';
import { WishlistContext } from '@/context/wishlist-context';

export function useWishlist(productId?: string) {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  
  const { toggleWishlist, ...rest } = context;

  const toggle = () => {
    if (productId) {
      toggleWishlist(productId);
    }
  };
  
  const isInWishlist = productId ? context.isInWishlist(productId) : false;

  return { ...rest, toggleWishlist: toggle, isInWishlist };
}
