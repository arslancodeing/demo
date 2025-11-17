
import Link from 'next/link';
import { Sofa, Bed, Armchair, Lamp, UtensilsCrossed, Tv, Box } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { productCategories } from '@/lib/products';
import { cn } from '@/lib/utils';

const categoryIcons: { [key: string]: React.ReactNode } = {
  'Sofas': <Sofa className="h-8 w-8" />,
  'Beds': <Bed className="h-8 w-8" />,
  'Chairs': <Armchair className="h-8 w-8" />,
  'Tables': <UtensilsCrossed className="h-8 w-8" />,
  'Storage': <Box className="h-8 w-8" />,
  'Lighting': <Lamp className="h-8 w-8" />,
};

export function FeaturedCategories() {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl text-shadow-3d">Find What Your Home Needs</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">From cozy sofas to elegant dining tables, explore expertly crafted furniture designed to elevate every space.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {productCategories.map(category => (
            <Link href={`/products?category=${category}`} key={category} className="group">
              <Card className="flex flex-col items-center justify-center p-6 text-center h-full transition-all duration-300 hover:bg-primary/10 hover:-translate-y-1">
                <div className="text-primary transition-colors group-hover:text-primary-foreground group-hover:bg-primary rounded-full p-4 mb-3">
                  {categoryIcons[category] || <Box className="h-8 w-8" />}
                </div>
                <h3 className="font-headline text-lg font-semibold">{category}</h3>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
