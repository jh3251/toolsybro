import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/lib/data';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles, tips, and tutorials on productivity and using our free online tools to their full potential.',
};

export default function BlogPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">MultiToolSuite Blog</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Tips, tutorials, and insights on productivity and web tools.
        </p>
      </header>
      <div className="grid gap-8 md:grid-cols-2">
        {blogPosts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
            <Card className="flex h-full flex-col transition-all duration-300 hover:shadow-lg hover:border-primary">
              <CardHeader>
                <p className="text-sm text-muted-foreground">{format(new Date(post.date), 'MMMM d, yyyy')}</p>
                <CardTitle className="font-headline text-2xl group-hover:text-primary">{post.title}</CardTitle>
                <CardDescription className="flex-grow">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardFooter>
                 <Button variant="link" className="p-0">Read More</Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
