import { products } from '@/lib/products';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilters } from '@/components/products/ProductFilters';
import { Suspense } from 'react';
import { ProductSort } from '@/components/products/ProductSort';
import { sortProducts } from '@/lib/utils';
import { SortOption } from '@/lib/types';
import { ProductGridSkeleton } from '@/components/products/ProductGridSkeleton';

export default function ProductsPage({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    category?: string;
    style?: string;
    material?: string;
    brand?: string;
    maxPrice?: string;
    sort?: SortOption;
  };
}) {
  let filteredProducts = products.filter(product => {
    if (searchParams?.q && !product.name.toLowerCase().includes(searchParams.q.toLowerCase())) {
        return false;
    }
    if (searchParams?.category && product.category !== searchParams.category) {
      return false;
    }
    if (searchParams?.style && product.style !== searchParams.style) {
      return false;
    }
    if (searchParams?.material && product.material !== searchParams.material) {
      return false;
    }
    if (searchParams?.brand && product.brand !== searchParams.brand) {
        return false;
    }
    if (searchParams?.maxPrice && product.price > Number(searchParams.maxPrice)) {
      return false;
    }
    return true;
  });

  const sortedProducts = sortProducts(filteredProducts, searchParams?.sort);

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl">Our Collections</h1>
        <p className="mt-2 text-lg text-muted-foreground">Find the perfect pieces to complete your home.</p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <h2 className="font-headline text-2xl mb-4">Filters</h2>
            <Suspense fallback={<div>Loading filters...</div>}>
              <ProductFilters />
            </Suspense>
          </div>
        </aside>
        <main className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">{sortedProducts.length} products found</p>
            <Suspense fallback={<div>Loading sort options...</div>}>
              <ProductSort />
            </Suspense>
          </div>
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid products={sortedProducts} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
