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
import { Label } from "@/components/ui/label";
import { SortOption } from '@/lib/types';

const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'rating', label: 'Average Rating' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
];

export function ProductSort() {
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
  
  const handleSortChange = (value: string) => {
    router.push(`${pathname}?${createQueryString('sort', value)}`);
  };

  const currentSort = searchParams.get('sort') || 'popularity';

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="sort-by" className="text-sm">Sort by</Label>
      <Select onValueChange={handleSortChange} value={currentSort}>
        <SelectTrigger className="w-[180px]" id="sort-by">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map(option => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
