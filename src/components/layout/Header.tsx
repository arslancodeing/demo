
'use client';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/shared/Logo';
import { useCart } from '@/hooks/use-cart';
import { CartSheet } from '@/components/cart/CartSheet';
import { MainNav } from './MainNav';
import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { useState } from 'react';
import { Dialog } from '../ui/dialog';
import { MobileMenuToggle } from './MobileMenuToggle';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';

export function Header() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="flex items-center gap-2 md:gap-4">
            <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MobileMenuToggle isOpen={isMobileMenuOpen} />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-3/4">
                <SheetHeader className="p-4 border-b">
                    <SheetTitle className="sr-only">Main Menu</SheetTitle>
                    <Logo />
                </SheetHeader>
                <div className="flex flex-col h-full">
                    <nav className="flex-grow p-4">
                    <MainNav className="flex-col items-start gap-4" onLinkClick={() => setIsMobileMenuOpen(false)} />
                    </nav>
                </div>
                </SheetContent>
            </Sheet>
            </div>
            
            <div className="hidden md:flex">
                <Logo />
            </div>
        </div>
        
        <div className="hidden md:flex flex-1 justify-center ml-10">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <MainNav />
          </nav>
        </div>
        
        <div className="flex-1 md:flex-grow-0 md:ml-auto flex items-center justify-end gap-2">
            <div className="md:hidden">
                <Dialog>
                </Dialog>
            </div>
          <ThemeToggle />
          <Button variant="ghost" size="icon" asChild className="transition-all hover:drop-shadow-neon-primary hover:text-primary">
            <Link href="/wishlist" title="Wishlist">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
            </Link>
          </Button>
          <CartSheet>
            <Button variant="ghost" size="icon" className={cn("relative transition-all hover:drop-shadow-neon-primary hover:text-primary")}>
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Button>
          </CartSheet>
        </div>
      </div>
    </header>
  );
}
