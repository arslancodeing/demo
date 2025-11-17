'use client';
import { useContext } from 'react';
import { RecentlyViewedContext } from '@/context/recently-viewed-context';

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (context === undefined) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
}
