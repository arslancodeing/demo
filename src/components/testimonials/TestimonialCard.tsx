
'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { Product, ProductReview } from '@/lib/types';
import { Star, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  review: ProductReview;
  product: Product;
  className?: string;
}

const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={`h-5 w-5 ${
                i < Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
            />
            ))}
        </div>
    )
};


export function TestimonialCard({ review, product, className }: TestimonialCardProps) {
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <p className="font-semibold text-lg">{review.author}</p>
                <p className="text-xs text-muted-foreground">Verified Buyer</p>
            </div>
            <StarRating rating={review.rating} />
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex gap-4">
            <MessageSquare className="h-6 w-6 text-muted-foreground flex-shrink-0 mt-1" />
            <p className="text-muted-foreground italic">"{review.comment}"</p>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4 text-sm">
        <p className="truncate">
            Review for{' '}
            <Link href={`/products/${product.id}`} className="font-semibold text-primary hover:underline">
                {product.name}
            </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
