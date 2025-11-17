import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Product, SortOption } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(price);
}

export function sortProducts(products: Product[], sortOption?: SortOption): Product[] {
  switch (sortOption) {
    case 'price-asc':
      return [...products].sort((a, b) => a.price - b.price);
    case 'price-desc':
      return [...products].sort((a, b) => b.price - a.price);
    case 'rating':
      return [...products].sort((a, b) => {
        const aRating = a.reviews.length > 0 ? a.reviews.reduce((acc, r) => acc + r.rating, 0) / a.reviews.length : 0;
        const bRating = b.reviews.length > 0 ? b.reviews.reduce((acc, r) => acc + r.rating, 0) / b.reviews.length : 0;
        return bRating - aRating;
      });
    case 'popularity': // Popularity can be defined by number of reviews
      return [...products].sort((a, b) => b.reviews.length - a.reviews.length);
    default:
      return products;
  }
}
