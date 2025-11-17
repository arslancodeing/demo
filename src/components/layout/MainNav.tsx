
'use client';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import React from 'react';
import { productCategories, productStyles } from '@/lib/products';

const navLinks = [
  { href: '/products', label: 'All Products' },
  { href: '/compare', label: 'Compare' },
  { href: '/about', label: 'About' },
  { href: '/support', label: 'Support' },
];

export function MainNav({ className, onLinkClick }: { className?: string, onLinkClick?: () => void }) {
  return (
    <NavigationMenu orientation="vertical" className={cn("z-20", className)}>
      <NavigationMenuList className={cn("gap-6", className && "flex-col items-start gap-4 space-x-0")}>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="transition-all hover:drop-shadow-neon-primary">Shop by Category</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] grid-cols-2 lg:w-[600px] ">
              {productCategories.map((category) => (
                <ListItem key={category} href={`/products?category=${category}`} title={category} onClick={onLinkClick} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="transition-all hover:drop-shadow-neon-primary">Shop by Style</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] grid-cols-2 lg:w-[600px] ">
              {productStyles.map((style) => (
                <ListItem key={style} href={`/products?style=${style}`} title={style} onClick={onLinkClick} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {navLinks.map((link) => (
          <NavigationMenuItem key={link.href}>
            <Link href={link.href} legacyBehavior passHref>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "transition-all hover:drop-shadow-neon-primary")} onClick={onLinkClick}>
                {link.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, onClick, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            onClick={onClick}
            {...props}>
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';
