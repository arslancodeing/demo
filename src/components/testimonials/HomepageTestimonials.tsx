
'use client';

import { products } from '@/lib/products';
import { TestimonialCard } from './TestimonialCard';
import type { Product, ProductReview } from '@/lib/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

type ReviewWithProduct = {
  review: ProductReview;
  product: Product;
};

export function HomepageTestimonials() {
  // Get a few top-rated reviews
  const allReviews: ReviewWithProduct[] = products.flatMap(product =>
    product.reviews.map(review => ({ review, product }))
  );

  const featuredReviews = allReviews
    .filter(r => r.review.rating >= 4) // Filter for good reviews
    .slice(0, 6); // Take up to 6

  if (featuredReviews.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="font-headline text-3xl md:text-4xl text-center mb-12">Loved by Homeowners</h2>
         <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {featuredReviews.map(({ review, product }) => (
              <CarouselItem key={`${product.id}-${review.id}`} className="md:basis-1/2 lg:basis-1/3">
                 <div className="p-4 h-full">
                    <TestimonialCard review={review} product={product} className="h-full" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 hidden xl:flex" />
          <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 hidden xl:flex" />
        </Carousel>
        <div className="text-center mt-12">
            <Button asChild variant="outline">
                <Link href="/testimonials">Read All Reviews <ArrowRight className="ml-2" /></Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
