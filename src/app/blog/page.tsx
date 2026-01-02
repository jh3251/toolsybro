import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/lib/data';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ToolsyBro Blog | Tips & Tricks for Free Tools',
  description: 'Articles, tips, and tutorials on productivity and using our free online tools to their full potential.',
};

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-6xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          The ToolsyBro Blog
        </h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
          Tips, tutorials, and insights on productivity and using our free tools to work smarter.
        </p>
      </header>

      {/* Featured Post */}
      <section>
        <Link href={`/blog/${featuredPost.slug}`} className="group">
          <Card className="grid grid-cols-1 md:grid-cols-2 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary">
            <div className="relative h-64 md:h-auto">
              <Image 
                src={featuredPost.imageUrl} 
                alt={featuredPost.title} 
                fill 
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={featuredPost.imageHint}
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <p className="text-sm text-muted-foreground mb-2">{format(new Date(featuredPost.date), 'MMMM d, yyyy')}</p>
              <h2 className="text-3xl font-bold font-headline mb-4 group-hover:text-primary">{featuredPost.title}</h2>
              <p className="text-muted-foreground mb-6 flex-grow">{featuredPost.excerpt}</p>
              <div className="flex items-center text-primary font-semibold">
                Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Card>
        </Link>
      </section>
      
      {/* Other Posts */}
      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {otherPosts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
            <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary hover:-translate-y-1">
              <div className="relative h-48 w-full">
                  <Image src={post.imageUrl} alt={post.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={post.imageHint} />
              </div>
              <CardHeader className="flex-grow">
                <p className="text-sm text-muted-foreground">{format(new Date(post.date), 'MMMM d, yyyy')}</p>
                <CardTitle className="font-headline text-xl group-hover:text-primary">{post.title}</CardTitle>
                <CardDescription className="pt-2">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardFooter>
                 <Button variant="link" className="p-0">Read More</Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}

    
