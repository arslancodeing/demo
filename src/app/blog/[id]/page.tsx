
import { blogPosts } from '@/lib/blog';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { HomeSupportSection } from '@/components/home/HomeSupportSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find(p => p.id === params.id);

  if (!post) {
    notFound();
  }

  const image = PlaceHolderImages.find(img => img.id === post.imageId);

  return (
    <div className="container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto">
            <header className="mb-8">
                <Button variant="ghost" asChild className="mb-4">
                    <Link href="/blog">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Blog
                    </Link>
                </Button>
                <Badge variant="secondary">{post.category}</Badge>
                <h1 className="font-headline text-4xl md:text-5xl mt-2">{post.title}</h1>
                <p className="mt-2 text-muted-foreground">
                    Published on {new Date(post.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
            </header>

            {image && (
                <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
                    <Image 
                        src={image.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                        data-ai-hint={image.imageHint}
                        priority
                    />
                </div>
            )}
            
            <div 
                className="prose prose-lg dark:prose-invert max-w-none" 
                dangerouslySetInnerHTML={{ __html: post.content }} 
            />

        </article>
        
        <div className="mt-16 md:mt-24">
            <HomeSupportSection />
        </div>
    </div>
  );
}
