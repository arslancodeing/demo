'use client';

import React, { createContext, ReactNode } from 'react';
import useLocalStorageState from 'use-local-storage-state';

interface RecentlyViewedContextType {
  recentlyViewed: string[];
  addProduct: (productId: string) => void;
}

export const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

const MAX_RECENTLY_VIEWED = 10;

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [recentlyViewed, setRecentlyViewed] = useLocalStorageState<string[]>('recentlyViewed', {
    defaultValue: [],
  });

  const addProduct = (productId: string) => {
    setRecentlyViewed(prev => {
      const newList = [productId, ...prev.filter(id => id !== productId)];
      return newList.slice(0, MAX_RECENTLY_VIEWED);
    });
  };

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, addProduct }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}
