
'use client';

import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { products } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { ProductCarousel } from '@/components/products/ProductCarousel';
import { Reviews } from '@/components/products/Reviews';
import { ShoppingCart, Minus, Plus, Heart, GitCompareArrows, FileDown, Tag, Bell, MapPin, CheckCircle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { useWishlist } from '@/hooks/use-wishlist';
import { useCompare } from '@/hooks/use-compare';
import { useRecentlyViewed } from '@/hooks/use-recently-viewed';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { ProductQuestions } from '@/components/products/ProductQuestions';
import { CustomersAlsoBought } from '@/components/products/CustomersAlsoBought';
import { StyleWithThis } from '@/components/products/StyleWithThis';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Head from 'next/head';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSwatch, setSelectedSwatch] = useState<string | null>(null);
  const [stockLocation, setStockLocation] = useState('');
  const [stockMessage, setStockMessage] = useState('');

  const { addItem: addToCart } = useCart();
  const { toast } = useToast();
  const { addProduct } = useRecentlyViewed();

  const product = products.find((p) => p.id === params.id);
  
  const { isInWishlist, toggleWishlist } = useWishlist(product?.id);
  const { isInCompare, toggleCompare } = useCompare(product?.id);


  useEffect(() => {
    if (product) {
      addProduct(product.id);
      if (product.swatches && product.swatches.length > 0) {
        setSelectedSwatch(product.swatches[0].color);
      }
    }
  }, [product, addProduct]);

  if (!product) {
    notFound();
  }
  
  const getProductSchema = () => {
    if (!product) return '{}';
    const primaryImage = PlaceHolderImages.find(img => img.id === product.images[0]);
    
    const schema: any = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.name,
      "image": primaryImage?.imageUrl,
      "description": product.description,
      "brand": {
        "@type": "Brand",
        "name": product.brand
      },
      "sku": product.id,
      "offers": {
        "@type": "Offer",
        "url": typeof window !== 'undefined' ? window.location.href : '',
        "priceCurrency": "GBP",
        "price": product.price,
        "availability": "https://schema.org/InStock", // This can be made dynamic later
        "itemCondition": "https://schema.org/NewCondition"
      },
    };

    if (product.reviews.length > 0) {
      const avgRating = product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length;
      schema.aggregateRating = {
        "@type": "AggregateRating",
        "ratingValue": avgRating.toFixed(1),
        "reviewCount": product.reviews.length
      };
      schema.review = product.reviews.map(review => ({
          "@type": "Review",
          "reviewRating": {
              "@type": "Rating",
              "ratingValue": review.rating
          },
          "author": {
              "@type": "Person",
              "name": review.author
          },
          "reviewBody": review.comment
      }));
    }

    return JSON.stringify(schema);
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name}${selectedSwatch ? ` (${selectedSwatch})` : ''}`,
    });
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handlePriceDropAlert = () => {
    toast({
      title: "Alert Set!",
      description: "We'll notify you if the price drops.",
    })
  };

  const handleCheckStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stockLocation) {
        setStockMessage("Please enter a postcode or city.");
        return;
    }
    // Simulate stock check
    const isHighStock = Math.random() > 0.3;
    if (isHighStock) {
        setStockMessage(`Good news! This item is in stock for delivery to ${stockLocation}.`);
    } else {
        setStockMessage(`This item is currently on backorder for ${stockLocation}. Expected in 2-3 weeks.`);
    }
  };


  return (
    <>
      <Head>
        <script type="application/ld+json">
          {getProductSchema()}
        </script>
      </Head>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductCarousel imageIds={product.images} productName={product.name} videoUrl={product.videoUrl} />
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-4">
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  {product.badge && <Badge variant={product.badge === 'Sale' ? 'destructive' : 'default'}>{product.badge}</Badge>}
              </div>
              <h1 className="font-headline text-4xl md:text-5xl font-bold">{product.name}</h1>
              <p className="text-3xl font-semibold mt-2">{formatPrice(product.price)}</p>
            </div>

            {product.swatches && product.swatches.length > 0 && (
              <div>
                <Label className="font-medium">Color: <span className="text-muted-foreground">{selectedSwatch}</span></Label>
                <div className="flex items-center gap-2 mt-2">
                  {product.swatches.map(swatch => (
                    <button
                      key={swatch.color}
                      onClick={() => setSelectedSwatch(swatch.color)}
                      className={cn(
                        "h-8 w-8 rounded-full border-2 transition-transform duration-100",
                        selectedSwatch === swatch.color ? 'border-primary scale-110' : 'border-transparent'
                      )}
                      style={{ backgroundColor: swatch.hex }}
                      title={swatch.color}
                    >
                        {selectedSwatch === swatch.color && <CheckCircle className="h-4 w-4 text-white mix-blend-difference" />}
                        <span className="sr-only">{swatch.color}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4">
               <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleQuantityChange(quantity - 1)}>
                     <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10) || 1)}
                    className="h-10 w-16 text-center"
                  />
                  <Button variant="outline" size="icon" onClick={() => handleQuantityChange(quantity + 1)}>
                     <Plus className="h-4 w-4" />
                  </Button>
               </div>
               <Button size="lg" onClick={handleAddToCart} className="flex-1">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
               </Button>
            </div>

            <Card>
                <CardContent className="p-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <Button variant="ghost" className="h-auto p-2 flex-col gap-1" onClick={toggleWishlist}>
                        <Heart className={cn("h-5 w-5", isInWishlist && "fill-destructive text-destructive")} />
                        <span>{isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}</span>
                    </Button>
                     <Button variant="ghost" className="h-auto p-2 flex-col gap-1" onClick={toggleCompare}>
                        <GitCompareArrows className={cn("h-5 w-5", isInCompare && "text-primary")} />
                        <span>{isInCompare ? 'In Compare' : 'Add to Compare'}</span>
                    </Button>
                     <Button variant="ghost" className="h-auto p-2 flex-col gap-1" onClick={handlePriceDropAlert}>
                        <Bell className="h-5 w-5" />
                        <span>Price Drop Alert</span>
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                         <Button variant="ghost" className="h-auto p-2 flex-col gap-1">
                            <MapPin className="h-5 w-5" />
                            <span>Check Stock</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Check Stock Availability</DialogTitle>
                          <DialogDescription>
                            Enter your postcode or city to check stock in your area.
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleCheckStock}>
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="location" className="sr-only">
                                    Location
                                </Label>
                                <Input
                                    id="location"
                                    placeholder="e.g. London or SW1A 0AA"
                                    value={stockLocation}
                                    onChange={(e) => setStockLocation(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="w-full mt-4">Check Availability</Button>
                        </form>
                        {stockMessage && (
                            <div className="mt-4 text-center text-sm text-muted-foreground p-4 bg-muted rounded-md">
                                {stockMessage}
                            </div>
                        )}
                        <DialogFooter className="sm:justify-start">
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>

            <Tabs defaultValue="description">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({product.reviews.length})</TabsTrigger>
                <TabsTrigger value="qa">Q&A ({product.questions.length})</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-4">
                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </TabsContent>
              <TabsContent value="specifications" className="pt-4">
                   <Card>
                      <CardContent className="p-6">
                           <Table>
                              <TableBody>
                                  <TableRow><TableCell className="font-medium">Style</TableCell><TableCell>{product.style}</TableCell></TableRow>
                                  <TableRow><TableCell className="font-medium">Material</TableCell><TableCell>{product.material}</TableCell></TableRow>
                                  <TableRow><TableCell className="font-medium">Brand</TableCell><TableCell>{product.brand}</TableCell></TableRow>
                                  <TableRow><TableCell className="font-medium">Dimensions (cm)</TableCell><TableCell>{`${product.dimensions.width} (W) x ${product.dimensions.height} (H) x ${product.dimensions.depth} (D)`}</TableCell></TableRow>
                                  <TableRow><TableCell className="font-medium">Weight (kg)</TableCell><TableCell>{product.weight} kg</TableCell></TableRow>
                                  <TableRow><TableCell className="font-medium">Assembly</TableCell><TableCell>{product.assembly}</TableCell></TableRow>
                                  <TableRow><TableCell className="font-medium">Care Instructions</TableCell><TableCell>{product.care}</TableCell></TableRow>
                                  {product.warranty && <TableRow><TableCell className="font-medium">Warranty</TableCell><TableCell>{product.warranty}</TableCell></TableRow>}
                              </TableBody>
                          </Table>
                           {product.dimensionsPdfUrl && (
                              <a href={product.dimensionsPdfUrl} target="_blank" rel="noopener noreferrer">
                                  <Button variant="outline" className="w-full mt-4">
                                      <FileDown className="mr-2" />
                                      Download Dimensions PDF
                                  </Button>
                              </a>
                          )}
                      </CardContent>
                   </Card>
              </TabsContent>
              <TabsContent value="reviews" className="pt-4">
                <Reviews product={product} />
              </TabsContent>
              <TabsContent value="qa" className="pt-4">
                <ProductQuestions product={product} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <StyleWithThis productId={product.id} />
      <CustomersAlsoBought currentProductId={product.id} category={product.category} />
    </>
  );
}
