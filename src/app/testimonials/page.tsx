import { products } from '@/lib/products';
import { TestimonialCard } from '@/components/testimonials/TestimonialCard';
import type { Product, ProductReview } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { TestimonialsGrid } from '@/components/testimonials/TestimonialsGrid';
import { Suspense } from 'react';

export default function TestimonialsPage({
  searchParams,
}: {
  searchParams?: {
    q?: string;
  };
}) {
  
  const query = searchParams?.q || '';

  const allReviews = products.flatMap(product => 
    product.reviews.map(review => ({ review, product }))
  );

  const filteredReviews = query 
    ? allReviews.filter(({ review, product }) => 
        review.comment.toLowerCase().includes(query.toLowerCase()) ||
        review.author.toLowerCase().includes(query.toLowerCase()) ||
        product.name.toLowerCase().includes(query.toLowerCase())
      )
    : allReviews;


  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl">What Our Customers Say</h1>
        <p className="mt-2 text-lg text-muted-foreground">Real reviews from happy buyers.</p>
        <div className="mt-8 max-w-md mx-auto">
           <form>
              <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                      placeholder="Search reviews..." 
                      className="pl-10"
                      name="q"
                      defaultValue={query}
                  />
              </div>
           </form>
        </div>
      </header>
      <main>
        <Suspense fallback={<div>Loading reviews...</div>}>
          <TestimonialsGrid reviews={filteredReviews} />
        </Suspense>
      </main>
    </div>
  );
}
