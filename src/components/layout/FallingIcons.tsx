
'use client';

import { Bed, Sofa, Armchair } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const icons = [Bed, Sofa, Armchair];
const iconCount = 25; // Increased icon count for a denser particle effect

export function FallingIcons() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="falling-icons-container">
        {Array.from({ length: iconCount }).map((_, i) => {
          const Icon = icons[i % icons.length];
          const animationName = `fall-sway-${(i % 3) + 1}`;
          const animationDelay = `${Math.random() * 20}s`;
          const animationDuration = `${Math.random() * 10 + 15}s`; // Slower duration
          const left = `${Math.random() * 100}%`;
          const size = `${Math.random() * 1.25 + 0.5}rem`; // Smaller, more varied sizes
          const opacity = Math.random() * 0.15 + 0.05; // More subtle

          return (
            <Icon
              key={i}
              className={cn(
                'absolute top-[-10%] text-white animate-fall',
              )}
              style={{
                left,
                animationName,
                animationDelay,
                animationDuration,
                width: size,
                height: size,
                opacity,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
