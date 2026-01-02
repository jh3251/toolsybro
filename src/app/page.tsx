

'use client';

import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { toolCategories } from '@/lib/data';
import type { ToolCategory } from '@/lib/data';
import { cn } from '@/lib/utils';
import { AdPlaceholder } from '@/components/layout/AdPlaceholder';
import { ArrowLeft, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

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
             <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent py-2">
               {selectedCategory.name}
             </h1>
           </div>
        </header>

        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {selectedCategory.tools.map((tool, toolIndex) => (
            <Link href={tool.href} key={tool.name} className="group">
              <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary">
                <CardHeader className="flex-row items-center gap-4">
                  <div
                    className={cn(
                      'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg',
                      iconBgColors[toolIndex % iconBgColors.length]
                    )}
                  >
                    <tool.icon
                      className={cn('h-6 w-6', iconTextColors[toolIndex % iconTextColors.length])}
                    />
                  </div>
                  <CardTitle className="font-headline text-lg">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">{tool.description}</p>
                </CardContent>
                <CardFooter>
                    <div className="flex items-center text-sm font-semibold text-primary">
                        Open Tool <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                </CardFooter>
              </Card>
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
        <h2 className="text-3xl font-semibold text-primary mb-2 animate-fade-in-down" style={{ animationDelay: '0.2s' }}>100% Free</h2>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent animate-fade-in-down">
          The Ultimate Suite of Free Online Tools
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
              <p className="text-sm text-muted-foreground mt-1 transition-all group-hover:scale-105 group-hover:text-primary">
                Contains {category.tools.length} tools
              </p>
            </div>
          </button>
        ))}
      </div>
      <Card className="bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg">
        <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-3 bg-white/20 rounded-full">
                <Heart className="h-6 w-6 text-white"/>
            </div>
            <div>
                <CardTitle>Support Our Mission</CardTitle>
                <CardDescription className="text-white/80">Enjoying the free tools? Consider supporting the site!</CardDescription>
            </div>
        </CardHeader>
        <CardContent>
             <Link href="https://www.paypal.com/donate/?business=jhshifat21@gmail.com" target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-white text-pink-600 hover:bg-white/90 font-bold text-lg py-6 rounded-full shadow-lg transition-transform transform hover:scale-105">
                Donate Now
              </Button>
            </Link>
        </CardContent>
      </Card>
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
