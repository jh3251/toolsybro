
import Link from 'next/link';
import { toolCategories } from '@/lib/data';
import { cn } from '@/lib/utils';
import { AdPlaceholder } from '@/components/layout/AdPlaceholder';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ChevronDown } from 'lucide-react';

const toolColors = [
  'border-blue-500',
  'border-red-500',
  'border-purple-500',
  'border-green-500',
  'border-yellow-500',
  'border-pink-500',
  'border-indigo-500',
  'border-teal-500',
];

const iconBgColors = [
  'bg-blue-100 dark:bg-blue-900/30',
  'bg-red-100 dark:bg-red-900/30',
  'bg-purple-100 dark:bg-purple-900/30',
  'bg-green-100 dark:bg-green-900/30',
  'bg-yellow-100 dark:bg-yellow-900/30',
  'bg-pink-100 dark:bg-pink-900/30',
  'bg-indigo-100 dark:bg-indigo-900/30',
  'bg-teal-100 dark:bg-teal-900/30',
];

const iconTextColors = [
  'text-blue-500',
  'text-red-500',
  'text-purple-500',
  'text-green-500',
  'text-yellow-500',
  'text-pink-500',
  'text-indigo-500',
  'text-teal-500',
]

export default function Home() {
  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-500">
      <section className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-headline animate-fade-in-down">
          All Your Online Tools, One Platform
        </h1>
      </section>

      <Accordion type="multiple" className="w-full space-y-4" defaultValue={[toolCategories[0].name]}>
        {toolCategories.map((category, categoryIndex) => (
          <AccordionItem value={category.name} key={category.name} className="border-b-0">
             <AccordionTrigger className={cn(
                "h-full rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-lg p-6 flex items-center gap-4 hover:no-underline [&[data-state=open]]:rounded-b-none",
                "border-t-4",
                toolColors[categoryIndex % toolColors.length]
              )}>
                <div className="flex-1 flex items-start gap-4">
                    <div className={cn("flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg", iconBgColors[categoryIndex % iconBgColors.length])}>
                        <category.icon className={cn("h-6 w-6", iconTextColors[categoryIndex % iconTextColors.length])} />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-lg tracking-tight font-headline text-foreground">
                        {category.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                        Contains {category.tools.length} tools
                        </p>
                    </div>
                </div>
                <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
            </AccordionTrigger>
            <AccordionContent className="border border-t-0 rounded-b-lg bg-card p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {category.tools.map((tool, toolIndex) => (
                  <Link href={tool.href} key={tool.name} className="group">
                    <div className={cn(
                      "h-full rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 p-6 flex flex-col items-start gap-4",
                    )}>
                      <div className={cn("flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg", iconBgColors[(categoryIndex + toolIndex) % iconBgColors.length])}>
                        <tool.icon className={cn("h-6 w-6", iconTextColors[(categoryIndex + toolIndex) % iconTextColors.length])} />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-bold text-lg tracking-tight font-headline">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {categoryIndex === 0 && (
                <div className="flex justify-center pt-8">
                  <AdPlaceholder width={728} height={90} title="Horizontal Ad" />
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
