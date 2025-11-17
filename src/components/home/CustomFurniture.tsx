
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";

export function CustomFurniture() {
  const image = PlaceHolderImages.find(img => img.id === 'inspiration-3');

  return (
    <section className="py-16 md:py-24 bg-card text-foreground">
        <div className="container mx-auto">
            <Card className="border-none bg-primary/10">
                <div className="grid md:grid-cols-2 items-center">
                    <div className="p-8 md:p-12 text-center md:text-left">
                        <h2 className="font-headline text-3xl md:text-4xl font-bold">Design Your Own Furniture</h2>
                        <p className="mt-4 text-lg text-foreground/80">
                            Can't find the perfect fit? Customize your own sofa, bed, or chair with our wide selection of fabrics, colors, and sizes. Create a piece that is uniquely yours.
                        </p>
                        <Button size="lg" className="mt-6" asChild>
                            <Link href="/support">Start Designing</Link>
                        </Button>
                    </div>
                    <div className="relative h-64 md:h-full w-full">
                        {image && (
                            <Image
                                src={image.imageUrl}
                                alt="Fabric swatches"
                                fill
                                className="object-cover md:rounded-r-lg"
                                data-ai-hint="fabric swatches"
                            />
                        )}
                    </div>
                </div>
            </Card>
        </div>
    </section>
  )
}
