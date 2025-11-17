'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { productCategories, productStyles, productMaterials, productBrands } from '@/lib/products';
import { Button } from '../ui/button';

export function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );
  
  const handleSelectChange = (name: string) => (value: string) => {
    router.push(`${pathname}?${createQueryString(name, value === 'all' ? '' : value)}`);
  };

  const handlePriceChange = (values: number[]) => {
    router.push(`${pathname}?${createQueryString('maxPrice', String(values[0]))}`);
  }

  const clearFilters = () => {
    router.push(pathname);
  }

  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 1500;

  return (
    <div className="space-y-6">
      <div>
        <Label>Category</Label>
        <Select onValueChange={handleSelectChange('category')} value={searchParams.get('category') || 'all'}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {productCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label>Style</Label>
        <Select onValueChange={handleSelectChange('style')} value={searchParams.get('style') || 'all'}>
          <SelectTrigger>
            <SelectValue placeholder="Select a style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Styles</SelectItem>
            {productStyles.map(style => <SelectItem key={style} value={style}>{style}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Material</Label>
        <Select onValueChange={handleSelectChange('material')} value={searchParams.get('material') || 'all'}>
          <SelectTrigger>
            <SelectValue placeholder="Select a material" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Materials</SelectItem>
            {productMaterials.map(mat => <SelectItem key={mat} value={mat}>{mat}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Brand</Label>
        <Select onValueChange={handleSelectChange('brand')} value={searchParams.get('brand') || 'all'}>
          <SelectTrigger>
            <SelectValue placeholder="Select a brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {productBrands.map(brand => <SelectItem key={brand} value={brand}>{brand}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="pt-2">
        <Label htmlFor="price-range">Price Range (max £{maxPrice})</Label>
        <Slider
          id="price-range"
          max={1500}
          step={50}
          defaultValue={[maxPrice]}
          onValueCommit={handlePriceChange}
          className="mt-4"
        />
      </div>

      <Button variant="outline" onClick={clearFilters} className="w-full">Clear Filters</Button>
    </div>
  );
}
