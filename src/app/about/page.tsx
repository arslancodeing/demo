
'use client';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gem, Users, Wallet, Wrench, Headset, Star } from 'lucide-react';

export default function AboutPage() {
    const artisanImage = PlaceHolderImages.find(img => img.id === 'about-me-portrait');

    const uniqueFeatures = [
        { icon: <Gem className="h-8 w-8 text-primary" />, text: 'Premium materials' },
        { icon: <Users className="h-8 w-8 text-primary" />, text: 'Skilled artisans & latest machinery' },
        { icon: <Wallet className="h-8 w-8 text-primary" />, text: 'Affordable luxury' },
        { icon: <Wrench className="h-8 w-8 text-primary" />, text: 'Custom furniture options' },
        { icon: <Headset className="h-8 w-8 text-primary" />, text: 'Friendly customer support' },
        { icon: <Star className="h-8 w-8 text-primary" />, text: 'Satisfaction-first approach' },
    ];

    return (
        <div className="container mx-auto px-4 py-12">
             <header className="text-center mb-12">
                <h1 className="font-headline text-4xl md:text-5xl">About Atelier Home</h1>
                <p className="mt-2 text-lg text-muted-foreground">The story behind the craft.</p>
            </header>
            <main className="space-y-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    {artisanImage && (
                        <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-lg">
                            <Image 
                                src={artisanImage.imageUrl}
                                alt={artisanImage.description}
                                fill
                                className="object-cover"
                                data-ai-hint={artisanImage.imageHint}
                            />
                        </div>
                    )}
                    <div className="space-y-4">
                        <h2 className="font-headline text-3xl">Who We Are</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We are a modern furniture brand dedicated to crafting premium-quality pieces that elevate your home with comfort, elegance, and long-lasting durability. Every product we design is created with passion, skilled craftsmanship, and attention to detail.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>Our Mission</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">To bring style, comfort, and innovation into every home by offering high-quality furniture at affordable prices, backed by exceptional customer care.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Our Vision</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">To become the most trusted and loved furniture brand — known for designs that are beautiful, functional, and built to last.</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Our Promise</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Quality furniture. Reliable service. 100% customer satisfaction.</p>
                        </CardContent>
                    </Card>
                </div>
                
                <section>
                    <div className="text-center mb-12">
                        <h2 className="font-headline text-3xl">What Makes Us Unique</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {uniqueFeatures.map((feature, index) => (
                            <div key={index} className="flex flex-col items-center text-center gap-2">
                                {feature.icon}
                                <p className="font-semibold">{feature.text}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
