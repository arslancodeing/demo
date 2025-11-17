
'use client';

import { cn } from '@/lib/utils';

export function MobileMenuToggle({ isOpen }: { isOpen: boolean }) {
    return (
        <div className="relative h-6 w-6">
            <span
                className={cn(
                    'absolute left-1/2 top-1/2 h-[2px] w-5 -translate-x-1/2 -translate-y-1/2 bg-foreground transition-all duration-300',
                    isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-[35%]'
                )}
            />
            <span
                className={cn(
                    'absolute left-1/2 top-1/2 h-[2px] w-5 -translate-x-1/2 -translate-y-1/2 bg-foreground transition-all duration-300',
                    isOpen ? 'opacity-0' : 'opacity-100'
                )}
            />
            <span
                className={cn(
                    'absolute left-1/2 top-1/2 h-[2px] w-5 -translate-x-1/2 -translate-y-1/2 bg-foreground transition-all duration-300',
                    isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'top-[65%]'
                )}
            />
        </div>
    );
}
