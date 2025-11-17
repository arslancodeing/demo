'use client';

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages, ImagePlaceholder } from '@/lib/placeholder-images';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Video } from 'lucide-react';
import { useState } from 'react';

interface ProductCarouselProps {
  imageIds: string[];
  productName: string;
  videoUrl?: string;
}

export function ProductCarousel({ imageIds, productName, videoUrl }: ProductCarouselProps) {
  const images = imageIds.map(id => PlaceHolderImages.find(img => img.id === id)).filter(Boolean) as ImagePlaceholder[];
  const [open, setOpen] = useState(false);

  const getYoutubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length == 11) {
      return 'https://www.youtube.com/embed/' + match[2] + '?autoplay=1';
    }
    return null;
  };

  const embedUrl = videoUrl ? getYoutubeEmbedUrl(videoUrl) : null;

  return (
    <>
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="overflow-hidden cursor-zoom-in">
                    <CardContent className="p-0 aspect-[4/3] relative">
                      <Image
                        src={image.imageUrl}
                        alt={`${productName} - view ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        data-ai-hint={image.imageHint}
                      />
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0">
                  <div className="aspect-video relative">
                    <Image
                      src={image.imageUrl}
                      alt={`${productName} - view ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </CarouselItem>
          ))}
          {embedUrl && (
            <CarouselItem>
               <Card className="overflow-hidden">
                  <CardContent className="p-0 aspect-[4/3] relative bg-black">
                     <iframe
                        width="100%"
                        height="100%"
                        src={embedUrl.replace('autoplay=1', 'autoplay=0')}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="border-0"
                      ></iframe>
                  </CardContent>
               </Card>
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4" />
        <CarouselNext className="absolute right-4" />
      </Carousel>
      {videoUrl && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="mt-4 w-full md:w-auto">
              <Video className="mr-2" />
              Watch Video
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl p-0">
            <div className="aspect-video">
               <iframe
                  width="100%"
                  height="100%"
                  src={embedUrl || ''}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="border-0"
                ></iframe>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
