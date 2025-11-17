
'use client';

import { useCompare } from '@/hooks/use-compare';
import { products } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { GitCompareArrows, X } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

export function CompareClient() {
  const { compareList, toggleCompare, clearCompare } = useCompare();
  const comparedProducts = products.filter(p => compareList.includes(p.id));

  if (comparedProducts.length === 0) {
    return (
      <div className="text-center py-16 flex flex-col items-center gap-4">
        <GitCompareArrows className="h-16 w-16 text-muted-foreground" />
        <h3 className="text-xl">No products to compare</h3>
        <p className="text-muted-foreground">Add products to the compare list to see them here.</p>
        <Button asChild>
            <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
        <div className="text-right mb-4">
            <Button variant="outline" onClick={clearCompare}>Clear All</Button>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
        {comparedProducts.map(product => {
          const image = PlaceHolderImages.find(img => img.id === product.images[0]);
          return (
            <Card key={product.id}>
              <CardHeader className="relative p-0">
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 z-10 h-8 w-8 bg-background/50 hover:bg-background/80" onClick={() => toggleCompare(product.id)}>
                    <X className="h-4 w-4"/>
                </Button>
                <div className="aspect-[4/3] relative">
                  {image && <Image src={image.imageUrl} alt={product.name} fill className="object-cover" />}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <Link href={`/products/${product.id}`}>
                    <h5 className="font-headline text-lg font-semibold truncate hover:underline">{product.name}</h5>
                </Link>
                <p className="text-lg font-semibold">{formatPrice(product.price)}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                 <Button asChild className="w-full">
                    <Link href={`/products/${product.id}`}>View Product</Link>
                 </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <div className="mt-8 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Feature</TableHead>
              {comparedProducts.map(p => <TableHead key={p.id}>{p.name}</TableHead>)}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold">Price</TableCell>
              {comparedProducts.map(p => <TableCell key={p.id}>{formatPrice(p.price)}</TableCell>)}
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Category</TableCell>
              {comparedProducts.map(p => <TableCell key={p.id}>{p.category}</TableCell>)}
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Style</TableCell>
              {comparedProducts.map(p => <TableCell key={p.id}>{p.style}</TableCell>)}
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Material</TableCell>
              {comparedProducts.map(p => <TableCell key={p.id}>{p.material}</TableCell>)}
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Dimensions</TableCell>
              {comparedProducts.map(p => <TableCell key={p.id}>{`${p.dimensions.width}x${p.dimensions.height}x${p.dimensions.depth} cm`}</TableCell>)}
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Rating</TableCell>
              {comparedProducts.map(p => {
                const avgRating = p.reviews.length > 0 ? (p.reviews.reduce((sum, r) => sum + r.rating, 0) / p.reviews.length).toFixed(1) : 'N/A';
                return <TableCell key={p.id}>{avgRating} ({p.reviews.length} reviews)</TableCell>
              })}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
