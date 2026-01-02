import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toolCategories } from '@/lib/data';

export default function Home() {
  return (
    <div className="flex flex-col space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
          The Ultimate Suite of Free Online Tools
        </h1>
        <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
          A comprehensive collection of utilities to boost your productivity. Simple, powerful, and free.
        </p>
      </section>

      {toolCategories.map((category) => (
        <section key={category.name}>
          <h2 className="text-3xl font-bold tracking-tight font-headline mb-6 flex items-center gap-3">
             <category.icon className="h-8 w-8 text-primary" />
            {category.name}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.tools.map((tool) => (
              <Link href={tool.href} key={tool.name} className="group">
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <tool.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="font-headline group-hover:text-primary">{tool.name}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
