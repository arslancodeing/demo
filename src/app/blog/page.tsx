
import { blogPosts } from '@/lib/blog';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl">Our Blog</h1>
        <p className="mt-2 text-lg text-muted-foreground">Expert tips, buying guides, and design inspiration.</p>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map(post => {
          const image = PlaceHolderImages.find(img => img.id === post.imageId);
          return (
            <Card key={post.id} className="overflow-hidden group">
              <Link href={`/blog/${post.id}`} className="block">
                <div className="relative aspect-video bg-muted">
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={image.imageHint}
                    />
                  )}
                </div>
              </Link>
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-2">{post.category}</Badge>
                <Link href={`/blog/${post.id}`}>
                  <h3 className="font-headline text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                </Link>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                <Button variant="link" asChild className="p-0 h-auto">
                  <Link href={`/blog/${post.id}`}>Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </main>
    </div>
  );
}
