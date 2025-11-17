
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Cookie } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CookieConsentBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (consent !== 'true') {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        setIsVisible(false);
        localStorage.setItem('cookieConsent', 'true');
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className={cn(
            "fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500",
            isVisible ? "translate-y-0" : "translate-y-full"
        )}>
            <div className="container mx-auto px-4 pb-4">
                 <div className="bg-card border shadow-2xl rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Cookie className="h-6 w-6 text-primary flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">
                            We use cookies to enhance your shopping experience. By continuing to browse, you agree to our{' '}
                            <Link href="/privacy-policy" className="underline hover:text-primary">
                                Privacy Policy
                            </Link>.
                        </p>
                    </div>
                    <Button onClick={handleAccept} size="sm" className="flex-shrink-0">Accept</Button>
                </div>
            </div>
        </div>
    );
}
