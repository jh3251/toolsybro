
'use client';

import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { toolCategories } from '@/lib/data';
import type { ToolCategory } from '@/lib/data';
import { cn } from '@/lib/utils';
import { AdPlaceholder } from '@/components/layout/AdPlaceholder';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
];

function HomeComponent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | null>(null);

  useEffect(() => {
    const categoryName = searchParams.get('category');
    if (categoryName) {
      const category = toolCategories.find(c => c.name === decodeURIComponent(categoryName));
      setSelectedCategory(category || null);
    } else {
      setSelectedCategory(null);
    }
  }, [searchParams]);

  const handleCategoryClick = (category: ToolCategory) => {
    setSelectedCategory(category);
    window.history.pushState(null, '', `/?category=${encodeURIComponent(category.name)}`);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
    window.history.pushState(null, '', '/');
  };

  if (selectedCategory) {
    return (
      <div className="flex flex-col space-y-8 animate-in fade-in duration-500">
        <header className="flex items-center gap-4">
           <Button variant="outline" size="icon" onClick={handleBackClick}>
             <ArrowLeft className="h-4 w-4" />
             <span className="sr-only">Back to Categories</span>
           </Button>
           <div>
             <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
               {selectedCategory.name}
             </h1>
             <p className="mt-2 text-xl text-muted-foreground">
                Browse all {selectedCategory.tools.length} tools in this category.
             </p>
           </div>
        </header>

        <div className="grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {selectedCategory.tools.map((tool, toolIndex) => (
                <Link href={tool.href} key={tool.name} className="group">
                <div className={cn(
                    "h-full rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 p-6 flex flex-col items-center justify-center gap-4 text-center",
                )}>
                    <div className={cn("flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-300 group-hover:bg-primary", iconBgColors[toolIndex % iconBgColors.length])}>
                    <tool.icon className={cn("h-8 w-8 transition-colors duration-300 group-hover:text-primary-foreground", iconTextColors[toolIndex % iconTextColors.length])} />
                    </div>
                    <div className="flex-grow">
                    <h3 className="font-bold text-lg tracking-tight font-headline text-foreground">
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

        <div className="flex justify-center pt-8">
            <AdPlaceholder width={728} height={90} title="Horizontal Ad" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-500">
      <section className="text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent animate-fade-in-down">
          All Your Online Tools, One Platform
        </h1>
      </section>

      <div className="grid w-full gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {toolCategories.map((category, categoryIndex) => (
          <button
            key={category.name}
            onClick={() => handleCategoryClick(category)}
            className={cn(
              'group h-full rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 p-6 flex flex-col items-center justify-center gap-4 text-center'
            )}
          >
            <div
              className={cn(
                'flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-300 group-hover:bg-primary',
                iconBgColors[categoryIndex % iconBgColors.length]
              )}
            >
              <category.icon
                className={cn(
                  'h-8 w-8 transition-colors duration-300 group-hover:text-primary-foreground',
                  iconTextColors[categoryIndex % iconTextColors.length]
                )}
              />
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-lg tracking-tight font-headline text-foreground">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Contains {category.tools.length} tools
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HomeComponent />
        </Suspense>
    )
}
