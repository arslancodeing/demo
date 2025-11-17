import type { Product } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Progress } from "../ui/progress";

interface ReviewsProps {
  product: Product;
}

const StarRating = ({ rating, showLabel = false }: { rating: number, showLabel?: boolean }) => {
    const avgRating = rating.toFixed(1);
    return (
        <div className="flex items-center gap-2">
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
            {showLabel && <span className="text-sm text-muted-foreground">{avgRating} out of 5</span>}
        </div>
    )
};

export function Reviews({ product }: ReviewsProps) {
  const totalReviews = product.reviews.length;
  const avgRating = totalReviews > 0 ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews : 0;
  
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => {
      const count = product.reviews.filter(r => r.rating === star).length;
      return { star, count, percentage: totalReviews > 0 ? (count / totalReviews) * 100 : 0 };
  });

  return (
    <div id="reviews" className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
                {totalReviews > 0 &&
                    <div className="flex items-center gap-2 pt-2">
                        <StarRating rating={avgRating} />
                        <span className="text-sm text-muted-foreground">{avgRating.toFixed(1)} out of 5 ({totalReviews} reviews)</span>
                    </div>
                }
            </CardHeader>
            <CardContent>
                {totalReviews > 0 ? (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            {ratingDistribution.map(item => (
                                <div key={item.star} className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">{item.star} star</span>
                                    <Progress value={item.percentage} className="w-1/2" />
                                    <span className="text-sm text-muted-foreground w-12 text-right">{item.count}</span>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-6 pt-6">
                            {product.reviews.map((review) => (
                                <div key={review.id} className="border-t pt-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold">{review.author}</p>
                                            <p className="text-xs text-muted-foreground mb-2">{new Date(review.date).toLocaleDateString('en-GB')}</p>
                                        </div>
                                        <StarRating rating={review.rating} />
                                    </div>
                                    <p className="text-muted-foreground">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
