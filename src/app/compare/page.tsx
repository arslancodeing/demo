
import { CompareClient } from '@/components/products/CompareClient';

export default function ComparePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl">Compare Products</h1>
        <p className="mt-2 text-lg text-muted-foreground">Side-by-side comparison of your selected items.</p>
      </header>
      <main>
        <CompareClient />
      </main>
    </div>
  );
}
