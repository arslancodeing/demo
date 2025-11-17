'use client';

import { useWishlist } from '@/hooks/use-wishlist';
import { products } from '@/lib/products';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl">Your Wishlist</h1>
      </header>
      <main>
        {wishlistedProducts.length > 0 ? (
          <ProductGrid products={wishlistedProducts} />
        ) : (
          <div className="text-center py-16 flex flex-col items-center gap-4">
            <Heart className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-xl">Your wishlist is empty</h3>
            <p className="text-muted-foreground">Add items you love to your wishlist to see them here.</p>
          </div>
        )}
      </main>
    </div>
  );
}
