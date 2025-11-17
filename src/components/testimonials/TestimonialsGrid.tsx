import { TestimonialCard } from '@/components/testimonials/TestimonialCard';
import type { Product, ProductReview } from '@/lib/types';

type ReviewWithProduct = {
  review: ProductReview;
  product: Product;
};

interface TestimonialsGridProps {
    reviews: ReviewWithProduct[];
}

export function TestimonialsGrid({ reviews }: TestimonialsGridProps) {

  if (reviews.length === 0) {
    return (
        <div className="text-center py-16">
            <h3 className="text-xl">No reviews found</h3>
            <p className="text-muted-foreground">Try adjusting your search.</p>
        </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {reviews.map(({ review, product }) => (
        <TestimonialCard key={`${product.id}-${review.id}`} review={review} product={product} />
      ))}
    </div>
  );
}
