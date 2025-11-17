export type ProductBadge = 'New' | 'Sale' | 'Best Seller';

export type ProductReview = {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
};

export type ProductQA = {
  id: string;
  question: string;
  answer: string | null;
  author: string;
  date: string;
};

export type ProductSwatch = {
  color: string; // e.g., 'Charcoal', 'Navy Blue'
  hex: string; // e.g., '#36454F'
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  videoUrl?: string;
  category: 'Sofas' | 'Tables' | 'Chairs' | 'Beds' | 'Storage' | 'Lighting';
  style: 'Modern' | 'Classic' | 'Rustic' | 'Industrial' | 'Minimalist';
  material: string;
  brand: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  weight: number;
  assembly: string;
  care: string;
  dimensionsPdfUrl?: string;
  reviews: ProductReview[];
  questions: ProductQA[];
  badge?: ProductBadge;
  swatches?: ProductSwatch[];
  warranty?: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type SortOption = 'price-asc' | 'price-desc' | 'popularity' | 'rating';

export type ProductBundle = {
  id: string;
  name:string;
  description: string;
  productIds: string[];
  imageId: string;
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageId: string;
  category: string;
  date: string;
};
