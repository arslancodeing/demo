'use client';
import { bundles } from '@/lib/bundles';
import { products } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';

export function StyleWithThis({ productId }: { productId: string }) {
    const { addItem } = useCart();
    const { toast } = useToast();

    const relevantBundles = bundles.filter(b => b.productIds.includes(productId));

    if (relevantBundles.length === 0) {
        return null;
    }

    const handleAddBundleToCart = (bundleName: string, productIds: string[]) => {
        let itemsAdded = 0;
        productIds.forEach(pId => {
            const product = products.find(p => p.id === pId);
            if (product) {
                addItem(product, 1);
                itemsAdded++;
            }
        });

        if(itemsAdded > 0){
            toast({
                title: 'Bundle Added to Cart',
                description: `Added ${itemsAdded} items from the "${bundleName}" set to your cart.`
            })
        }
    };

    return (
        <section className="py-16 md:py-24 bg-card">
            <div className="container mx-auto px-4">
                <h2 className="font-headline text-3xl md:text-4xl text-center mb-12">Style With This</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {relevantBundles.map(bundle => {
                        const bundleProducts = products.filter(p => bundle.productIds.includes(p.id));
                        const bundleImage = PlaceHolderImages.find(img => img.id === bundle.imageId);
                        const totalBundlePrice = bundleProducts.reduce((acc, p) => acc + p.price, 0);

                        return (
                            <Card key={bundle.id} className="overflow-hidden">
                                <div className="grid grid-cols-1 items-center">
                                    <div className="relative aspect-video bg-muted">
                                        {bundleImage && (
                                            <Image
                                                src={bundleImage.imageUrl}
                                                alt={bundle.name}
                                                fill
                                                className="object-cover"
                                                data-ai-hint={bundleImage.imageHint}
                                            />
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-headline text-2xl font-semibold">{bundle.name}</h3>
                                        <p className="text-muted-foreground mt-2">{bundle.description}</p>
                                        <ul className="mt-4 space-y-2 text-sm">
                                            {bundleProducts.map(p => (
                                                <li key={p.id}>
                                                    <Link href={`/products/${p.id}`} className="hover:underline flex justify-between">
                                                        <span>{p.name}</span>
                                                        <span>{formatPrice(p.price)}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                        <Separator className="my-4" />
                                        <div className="flex justify-between items-center font-bold">
                                            <span>Total Price:</span>
                                            <span>{formatPrice(totalBundlePrice)}</span>
                                        </div>
                                        <Button className="w-full mt-4" onClick={() => handleAddBundleToCart(bundle.name, bundle.productIds)}>
                                            <ShoppingCart className="mr-2 h-4 w-4"/>
                                            Add Set to Cart
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
