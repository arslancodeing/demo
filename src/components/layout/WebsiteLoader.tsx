
'use client';

import { useState, useEffect } from 'react';
import { Sofa } from 'lucide-react';
import { cn } from '@/lib/utils';

export function WebsiteLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // This effect should only run once on the client after hydration
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      // Clean up from DOM after fade out animation completes
      setTimeout(() => setIsLoading(false), 1000); // Corresponds to animation-fade-out duration
    }, 1500); // Minimum time loader is visible

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-[1000] flex items-center justify-center bg-background transition-opacity duration-1000",
        isFadingOut ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <Sofa className="h-16 w-16 animate-pulse-loader text-primary" />
        <p className="text-muted-foreground animate-pulse">Loading Atelier...</p>
      </div>
    </div>
  );
}
