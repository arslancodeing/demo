
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import { products } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';
import { RecentlyViewed } from '@/components/products/RecentlyViewed';
import { ShopTheLook } from '@/components/products/ShopTheLook';
import { HomepageTestimonials } from '@/components/testimonials/HomepageTestimonials';
import { WhyChooseUs } from '@/components/shared/WhyChooseUs';
import { WeeklySaleBanner } from '@/components/layout/WeeklySaleBanner';
import { FallingIcons } from '@/components/layout/FallingIcons';
import { FeaturedCategories } from '@/components/home/FeaturedCategories';
import { CustomFurniture } from '@/components/home/CustomFurniture';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { InspirationGallery } from '@/components/home/InspirationGallery';
import { BlogSection } from '@/components/home/BlogSection';
import { TrustBadges } from '@/components/home/TrustBadges';
import { HomeSupportSection } from '@/components/home/HomeSupportSection';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-1');
  const bestSellers = products.filter(p => p.badge === 'Best Seller').slice(0, 5);
  const newArrivals = products.filter(p => p.badge === 'New').slice(0, 8);

  return (
    <div className="flex flex-col">
      {heroImage && (
        <section className="relative w-full h-[60vh] md:h-[80vh] text-white overflow-hidden">
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover animate-fade-in-slow"
            priority
            data-ai-hint={heroImage.imageHint}
          />
          <div className="absolute inset-0 bg-black/40" />
          <FallingIcons />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-4">
            <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold !leading-tight animate-text-focus-in bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent animate-gradient-text">
              Luxury Furniture for Modern Living
            </h1>
            <p className="mt-4 max-w-xl text-lg md:text-xl animate-slide-up-fade [animation-delay:1s]">
              Discover premium craftsmanship, timeless designs, and comfort built to last. Transform your home with furniture made for real life.
            </p>
            <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/40 animate-slide-up-fade [animation-delay:1.5s] animate-pulse-subtle">
              <Link href="/products">Explore Collections</Link>
            </Button>
          </div>
        </section>
      )}

      <TrustBadges />

      <FeaturedCategories />

      <WeeklySaleBanner />

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl text-center mb-12 animate-slide-up-fade [animation-delay:0.2s]">Our Best Sellers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {bestSellers.map((product, i) => (
              <div key={product.id} className="animate-slide-up-fade" style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="text-center mt-12 animate-slide-up-fade [animation-delay:0.8s]">
            <Button asChild variant="outline" className="group">
              <Link href="/products">Shop All Products <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" /></Link>
            </Button>
          </div>
        </div>
      </section>
      
      <div className="animate-slide-up-fade">
        <CustomFurniture />
      </div>

       <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl text-center mb-12">New Arrivals</h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {newArrivals.map((product) => (
                <CarouselItem key={product.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="p-1">
                      <ProductCard product={product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 hidden lg:flex" />
            <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 hidden lg:flex" />
          </Carousel>
        </div>
      </section>

      <div className="animate-slide-up-fade">
        <WhyChooseUs />
      </div>

      <div className="animate-slide-up-fade">
        <InspirationGallery />
      </div>

      <div className="animate-slide-up-fade">
        <ShopTheLook />
      </div>
      
      <div className="animate-slide-up-fade">
        <HomepageTestimonials />
      </div>

      <div className="animate-slide-up-fade">
        <BlogSection />
      </div>
      
      <div className="animate-slide-up-fade">
        <HomeSupportSection />
      </div>

      <div className="animate-slide-up-fade">
        <RecentlyViewed />
      </div>

    </div>
  );
}
