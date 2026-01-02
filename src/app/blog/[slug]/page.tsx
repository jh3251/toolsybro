import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
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
    openGraph: {
        images: [post.imageUrl],
    }
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
       <header className="space-y-4">
        <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-xl">
            <Image 
                src={post.imageUrl} 
                alt={post.title} 
                fill 
                className="object-cover" 
                data-ai-hint={`${post.slug} cover`}
            />
        </div>
        <div className="space-y-2 text-center">
            <p className="text-muted-foreground">
                Published on {format(new Date(post.date), 'MMMM d, yyyy')}
            </p>
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">{post.title}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{post.excerpt}</p>
        </div>
      </header>
      
      <div className="prose prose-lg dark:prose-invert max-w-3xl mx-auto" 
           dangerouslySetInnerHTML={{ __html: post.content.replace('<!-- In-content ad placeholder -->', '<div class="my-8 flex justify-center"><div id="ad-placeholder-content"></div></div>') }}
      />
      
      <div className="flex justify-center">
         <AdPlaceholder width={300} height={250} title="In-Article Ad" />
      </div>
    </article>
  );
}
