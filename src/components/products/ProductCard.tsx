
'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { formatPrice } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { useWishlist } from '@/hooks/use-wishlist';
import { Heart, GitCompareArrows, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCompare } from '@/hooks/use-compare';
import { ProductQuickView } from './ProductQuickView';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === product.images[0]);
  const { isInWishlist, toggleWishlist } = useWishlist(product.id);
  const { isInCompare, toggleCompare } = useCompare(product.id);
  const [isPulsing, setIsPulsing] = useState(false);

  const handleWishlistToggle = () => {
    if (!isInWishlist) {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 500); // Duration of the pulse animation
    }
    toggleWishlist();
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-neon group hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <Link href={`/products/${product.id}`} className="block">
          <div className="aspect-[4/3] relative bg-muted">
            {image && (
              <Image
                src={image.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                data-ai-hint={image.imageHint}
              />
            )}
            {product.badge && (
                <Badge className="absolute top-2 left-2" variant={product.badge === 'Sale' ? 'destructive' : 'default'}>{product.badge}</Badge>
            )}
          </div>
        </Link>
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="outline" size="icon" className="h-8 w-8 bg-background/80" onClick={handleWishlistToggle} title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}>
                <Heart className={cn("h-4 w-4", isInWishlist && 'fill-destructive text-destructive', isPulsing && 'animate-pulse-heart')} />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 bg-background/80" onClick={toggleCompare} title={isInCompare ? 'Remove from Compare' : 'Add to Compare'}>
                <GitCompareArrows className={cn("h-4 w-4", isInCompare && 'text-primary')} />
            </Button>
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[calc(100%-1rem)] opacity-0 group-hover:opacity-100 transition-opacity">
            <ProductQuickView product={product}>
                 <Button variant="outline" className="w-full bg-background/80">
                    <Eye className="mr-2 h-4 w-4" /> Quick View
                </Button>
            </ProductQuickView>
        </div>
      </div>
      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.id}`} className="block">
          <h5 className="font-headline text-base font-semibold truncate">{product.name}</h5>
          <p className="text-sm text-muted-foreground">{product.category}</p>
        </Link>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="font-semibold text-lg">{formatPrice(product.price)}</p>
        <Button asChild size="sm">
          <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
