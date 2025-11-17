
'use client';

import React, { createContext, ReactNode } from 'react';
import useLocalStorageState from 'use-local-storage-state';

interface CompareContextType {
  compareList: string[];
  toggleCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
}

export const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareList, setCompareList] = useLocalStorageState<string[]>('compareList', {
    defaultValue: [],
  });

  const toggleCompare = (productId: string) => {
    setCompareList(prevList =>
      prevList.includes(productId)
        ? prevList.filter(id => id !== productId)
        : [...prevList, productId]
    );
  };

  const isInCompare = (productId: string) => {
    return compareList.includes(productId);
  };
  
  const clearCompare = () => {
    setCompareList([]);
  }

  return (
    <CompareContext.Provider value={{ compareList, toggleCompare, isInCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
}
