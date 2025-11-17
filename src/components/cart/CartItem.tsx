'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CartItem as CartItemType } from '@/lib/types';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus, Minus } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { formatPrice } from '@/lib/utils';

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart();
  const image = PlaceHolderImages.find((img) => img.id === item.product.images[0]);

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.product.id, newQuantity);
  };
  
  return (
    <div className="flex items-start gap-4 py-4">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
        {image && (
          <Image
            src={image.imageUrl}
            alt={item.product.name}
            width={96}
            height={96}
            className="object-cover"
            data-ai-hint={image.imageHint}
          />
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <Link href={`/products/${item.product.id}`} className="font-semibold hover:underline">
              {item.product.name}
            </Link>
            <p className="text-sm text-muted-foreground">{formatPrice(item.product.price)}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => removeItem(item.product.id)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.quantity - 1)}>
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10) || 1)}
              className="h-8 w-14 text-center"
            />
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.quantity + 1)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <p className="font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
        </div>
      </div>
    </div>
  );
}
