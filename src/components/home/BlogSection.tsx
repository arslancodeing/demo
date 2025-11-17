
'use client';

import { blogPosts } from "@/lib/blog";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowRight } from "lucide-react";

export function BlogSection() {
  const latestPosts = blogPosts.slice(0, 3);
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl">Learn • Decorate • Upgrade</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Read expert tips on furniture care, interior styling, and home transformation ideas.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map(post => {
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
                )
            })}
        </div>
        <div className="text-center mt-12">
            <Button variant="outline" asChild>
                <Link href="/blog">View All Posts</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
