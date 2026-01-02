import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { blogPosts } from '@/lib/data';
import { format } from 'date-fns';
import { AdPlaceholder } from '@/components/layout/AdPlaceholder';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">{post.title}</h1>
        <p className="text-muted-foreground">
          Published on {format(new Date(post.date), 'MMMM d, yyyy')}
        </p>
      </header>
      
      <div className="prose prose-lg dark:prose-invert max-w-none" 
           dangerouslySetInnerHTML={{ __html: post.content.replace('<!-- In-content ad placeholder -->', '<div class="my-8 flex justify-center"><div id="ad-placeholder-content"></div></div>') }}
      />
      
      <div className="flex justify-center">
         <AdPlaceholder width={300} height={250} title="In-Article Ad" />
      </div>
    </article>
  );
}
