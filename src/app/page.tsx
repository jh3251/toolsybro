import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { toolCategories } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Home() {
  return (
    <div className="flex flex-col space-y-12 animate-in fade-in duration-500">
      <section className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl font-headline">
          All Your Online Tools, One Platform
        </h1>
      </section>

      <Accordion
        type="multiple"
        className="w-full space-y-4"
        defaultValue={[toolCategories[0].name]}
      >
        {toolCategories.map((category, index) => (
          <AccordionItem
            value={category.name}
            key={category.name}
            className="rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <AccordionTrigger className="p-6 text-left hover:no-underline">
              <div className="flex items-center gap-4">
                <category.icon className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight font-headline">
                  {category.name}
                </h2>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-6 pt-0">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.tools.map((tool) => (
                  <Link href={tool.href} key={tool.name} className="group">
                    <Card className="h-full border-2 border-transparent transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-1">
                      <CardHeader className="flex flex-row items-center gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <tool.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-grow">
                          <CardTitle className="font-headline text-lg">
                            {tool.name}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {tool.description}
                          </CardDescription>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
