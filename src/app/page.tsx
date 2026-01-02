import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { tools } from '@/lib/data';

export default function Home() {
  return (
    <div className="flex flex-col space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
          Free Online Tools to Boost Your Productivity
        </h1>
        <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
          A suite of simple, powerful, and free utilities to help you with your daily tasks. No ads in your workspace, just the tools you need.
        </p>
      </section>

      <section>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
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
    </div>
  );
}
