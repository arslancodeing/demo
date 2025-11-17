
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Gift, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SaleBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only run this on the client
        const bannerDismissed = localStorage.getItem('saleBannerDismissed');
        if (bannerDismissed !== 'true') {
            setIsVisible(true);
        }
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem('saleBannerDismissed', 'true');
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className={cn(
            "relative bg-red-600 text-white transition-all duration-300",
            isVisible ? "py-2 px-4" : "py-0 px-0 h-0 overflow-hidden"
        )}>
            <div className="container mx-auto flex items-center justify-center gap-4">
                <Gift className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm font-medium text-center">
                    <span className="font-headline tracking-wider uppercase">Christmas Sale!</span>
                    {' '}Don't miss out on festive deals. <Link href="/products" className="underline hover:text-red-200">Shop Now &rarr;</Link>
                </p>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 hover:bg-red-700"
                    onClick={handleDismiss}
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Dismiss</span>
                </Button>
            </div>
        </div>
    );
}
