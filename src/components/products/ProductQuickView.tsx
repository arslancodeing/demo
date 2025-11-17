'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ProductCarousel } from '@/components/products/ProductCarousel';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/types';
import Link from 'next/link';

interface ProductQuickViewProps {
  product: Product;
  children: React.ReactNode;
}

export function ProductQuickView({ product, children }: ProductQuickViewProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem: addToCart } = useCart();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name}`,
    });
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
          <ProductCarousel imageIds={product.images} productName={product.name} />

          <div className="space-y-4">
            <DialogHeader>
              <DialogTitle className="font-headline text-3xl">{product.name}</DialogTitle>
            </DialogHeader>

            <div>
                <div className="flex items-center gap-4 mb-2">
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    {product.badge && <Badge variant={product.badge === 'Sale' ? 'destructive' : 'default'}>{product.badge}</Badge>}
                </div>
                <p className="text-2xl font-semibold">{formatPrice(product.price)}</p>
            </div>
            
            <p className="text-muted-foreground text-sm">{product.description}</p>
            
            <Separator />

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleQuantityChange(quantity - 1)}>
                        <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10) || 1)}
                        className="h-10 w-16 text-center"
                    />
                    <Button variant="outline" size="icon" onClick={() => handleQuantityChange(quantity + 1)}>
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
                <Button size="lg" onClick={handleAddToCart} className="flex-1">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                </Button>
            </div>

            <Separator />
            
            <Button variant="link" asChild className="p-0 h-auto" onClick={() => setIsOpen(false)}>
              <Link href={`/products/${product.id}`}>View full details</Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
