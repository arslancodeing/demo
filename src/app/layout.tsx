
import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/context/cart-context';
import { cn } from '@/lib/utils';
import { WishlistProvider } from '@/context/wishlist-context';
import { RecentlyViewedProvider } from '@/context/recently-viewed-context';
import { CompareProvider } from '@/context/compare-context';
import { RealTimePurchasePopup } from '@/components/layout/RealTimePurchasePopup';
import { AlertCircle } from 'lucide-react';
import { SaleBanner } from '@/components/layout/SaleBanner';
import { CookieConsentBanner } from '@/components/layout/CookieConsentBanner';
import { DevelopmentBanner } from '@/components/layout/DevelopmentBanner';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { ScrollToTopButton } from '@/components/layout/ScrollToTopButton';
import { WebsiteLoader } from '@/components/layout/WebsiteLoader';


export const metadata: Metadata = {
  title: 'Atelier Home UK',
  description: 'Beautifully crafted furniture for the modern British home.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased", "min-h-screen flex flex-col")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <WebsiteLoader />
          <SaleBanner />
          <WishlistProvider>
            <RecentlyViewedProvider>
              <CompareProvider>
                <CartProvider>
                  <Header />
                  <main className="flex-grow">{children}</main>
                  <Footer />
                  <Toaster />
                  <RealTimePurchasePopup />
                  <CookieConsentBanner />
                  <DevelopmentBanner />
                  <ScrollToTopButton />
                </CartProvider>
              </CompareProvider>
            </RecentlyViewedProvider>
          </WishlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
