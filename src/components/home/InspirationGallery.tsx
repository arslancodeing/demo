
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export function InspirationGallery() {
  const galleryImages = [
    PlaceHolderImages.find(img => img.id === 'inspiration-1'),
    // PlaceHolderImages.find(img => img.id === 'inspiration-2'), // Minimalist Bedroom removed
    PlaceHolderImages.find(img => img.id === 'inspiration-3'),
    PlaceHolderImages.find(img => img.id === 'inspiration-4'),
    PlaceHolderImages.find(img => img.id === 'inspiration-5'),
  ].filter(Boolean);

  const gridClasses = [
    'col-span-2 row-span-2',
    // '', // Class for minimalist bedroom removed
    'row-span-2',
    '',
    'col-span-2',
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl">Get Inspired</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore beautiful room setups, design ideas, and home makeovers to spark your creativity.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 h-[600px]">
            {galleryImages.map((image, index) => {
                if (!image) return null;
                return (
                    <div key={image.id} className={`relative rounded-lg overflow-hidden shadow-lg group ${gridClasses[index]}`}>
                        <Image 
                            src={image.imageUrl}
                            alt={image.description}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={image.imageHint}
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                         <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                         <div className="absolute bottom-4 left-4 text-white">
                            <p className="font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">{image.description}</p>
                         </div>
                    </div>
                )
            })}
        </div>
      </div>
    </section>
  );
}
