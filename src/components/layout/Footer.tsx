
import Link from 'next/link';
import { Logo } from '@/components/shared/Logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="md:col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-4 text-muted-foreground text-sm">
              Timeless furniture for the modern British home.
            </p>
             <div className="mt-6 flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-transform hover:scale-110">
                    <Facebook className="h-5 w-5" />
                </Link>
                 <Link href="#" className="text-muted-foreground hover:text-foreground transition-transform hover:scale-110">
                    <Instagram className="h-5 w-5" />
                </Link>
                 <Link href="#" className="text-muted-foreground hover:text-foreground transition-transform hover:scale-110">
                    <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-transform hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-headline text-lg font-semibold">Shop</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/products" className="text-muted-foreground hover:text-foreground text-sm">All Products</Link></li>
              <li><Link href="/products?category=Sofas" className="text-muted-foreground hover:text-foreground text-sm">Sofas</Link></li>
              <li><Link href="/products?category=Chairs" className="text-muted-foreground hover:text-foreground text-sm">Chairs</Link></li>
              <li><Link href="/products?category=Tables" className="text-muted-foreground hover:text-foreground text-sm">Tables</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline text-lg font-semibold">About Us</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground text-sm">Our Story</Link></li>
              <li><Link href="/testimonials" className="text-muted-foreground hover:text-foreground text-sm">Testimonials</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground text-sm">Sustainability</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground text-sm">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline text-lg font-semibold">Support</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/support" className="text-muted-foreground hover:text-foreground text-sm">Contact Us</Link></li>
              <li><Link href="/support" className="text-muted-foreground hover:text-foreground text-sm">Delivery & Returns</Link></li>
              <li><Link href="/support" className="text-muted-foreground hover:text-foreground text-sm">FAQs</Link></li>
              <li><Link href="/terms-and-conditions" className="text-muted-foreground hover:text-foreground text-sm">Terms & Conditions</Link></li>
              <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground text-sm">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                 <div>
                    <p className="font-semibold">Subscribe to our newsletter</p>
                    <p className="text-sm text-muted-foreground">Get the latest deals and style inspiration.</p>
                </div>
                <form className="flex w-full max-w-sm items-center space-x-2">
                    <Input type="email" placeholder="Email" />
                    <Button type="submit">Subscribe</Button>
                </form>
            </div>
            <div className="mt-8 text-center text-sm text-muted-foreground space-y-2">
                <p>&copy; {new Date().getFullYear()} Atelier. All rights reserved.</p>
                <p>Made with ❤️ by Arslan Maverick</p>
            </div>
        </div>
      </div>
    </footer>
  );
}
