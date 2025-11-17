
'use client';
import { useContext } from 'react';
import { CompareContext } from '@/context/compare-context';

export function useCompare(productId?: string) {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  
  const { toggleCompare, ...rest } = context;

  const toggle = () => {
    if (productId) {
      toggleCompare(productId);
    }
  };
  
  const isInCompare = productId ? context.isInCompare(productId) : false;

  return { ...rest, toggleCompare: toggle, isInCompare };
}
