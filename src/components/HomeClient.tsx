
'use client';

import Link from 'next/link';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toolCategories, tools } from '@/lib/data';
import type { Tool, ToolCategory } from '@/lib/data';
import { cn } from '@/lib/utils';
import { AdPlaceholder } from '@/components/layout/AdPlaceholder';
import { ArrowLeft, Heart, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { FeatureHighlights } from '@/components/FeatureHighlights';
import { Stats } from '@/components/Stats';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"


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
  'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30',
  'bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30',
  'bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30',
  'bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30',
  'bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30',
  'bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30',
  'bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30',
  'bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-900/30 dark:to-teal-800/30',
];

const iconTextColors = [
  'text-blue-600 dark:text-blue-300',
  'text-red-600 dark:text-red-300',
  'text-purple-600 dark:text-purple-300',
  'text-green-600 dark:text-green-300',
  'text-yellow-600 dark:text-yellow-300',
  'text-pink-600 dark:text-pink-300',
  'text-indigo-600 dark:text-indigo-300',
  'text-teal-600 dark:text-teal-300',
];

const popularTools = [
  ...toolCategories[0].tools.slice(0, 2), // Word Counter, Character Counter
  ...toolCategories[1].tools.slice(0, 3), // Image Compressor, Resizer, Cropper
  ...toolCategories[2].tools.slice(0, 2), // PDF to JPG, JPG to PDF
  ...toolCategories[3].tools.slice(0, 2), // JSON Formatter, XML Formatter
  ...toolCategories[4].tools.slice(0, 3), // QR Code, Barcode, Password Gen
];


export function HomeClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const plugins = useRef([
    Autoplay({ delay: 2000, stopOnInteraction: true })
  ]);


  useEffect(() => {
    const categoryName = searchParams.get('category');
    if (categoryName) {
      const category = toolCategories.find(c => c.name === decodeURIComponent(categoryName));
      setSelectedCategory(category || null);
    } else {
      setSelectedCategory(null);
    }
  }, [searchParams]);

  const allTools = useMemo(() => {
    return toolCategories.flatMap(category => category.tools.map(tool => ({ ...tool, categoryName: category.name })));
  }, []);

  const filteredTools = useMemo(() => {
    if (!searchQuery) {
      return [];
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return allTools.filter(tool =>
      tool.name.toLowerCase().includes(lowerCaseQuery) ||
      tool.description.toLowerCase().includes(lowerCaseQuery)
    );
  }, [searchQuery, allTools]);

  const handleCategoryClick = (category: ToolCategory) => {
    setSelectedCategory(category);
    router.push(`/?category=${encodeURIComponent(category.name)}`);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
    router.push('/');
  };
  
  const handleToolSelect = (href: string) => {
      router.push(href);
      setIsSearchOpen(false);
  }

  if (selectedCategory) {
    return (
      <div className="flex flex-col space-y-8 animate-in fade-in duration-500">
        <header className="flex items-center gap-4">
           <Button variant="outline" size="icon" onClick={handleBackClick}>
             <ArrowLeft className="h-4 w-4" />
             <span className="sr-only">Back to Categories</span>
           </Button>
           <div className="py-2">
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
    <div className="flex flex-col space-y-8">
      <section className="text-center space-y-6">
        <p className="text-4xl font-semibold text-green-600">Fast-Simple & 100% Free.</p>
        <h2 className="text-2xl font-bold font-headline">Popular Tools</h2>
        <Carousel
          plugins={plugins.current}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {popularTools.map((tool, index) => (
              <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/5">
                <div className="p-1">
                  <Link href={tool.href} className="group">
                    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary">
                      <CardContent className="flex flex-col items-center justify-center p-4 gap-3 aspect-square">
                        <div
                          className={cn(
                            'flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110',
                            iconBgColors[index % iconBgColors.length]
                          )}
                        >
                          <tool.icon className={cn('h-8 w-8', iconTextColors[index % iconTextColors.length])} />
                        </div>
                        <p className="text-base font-semibold text-center group-hover:text-primary">{tool.name}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </section>

      <section className="text-center space-y-4">
         <div className="mt-6 max-w-lg mx-auto">
            <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                <PopoverTrigger asChild>
                    <button
                        role="combobox"
                        aria-expanded={isSearchOpen}
                        className="w-full justify-start rounded-full h-12 text-base text-muted-foreground relative group inline-flex items-center px-4 py-2 text-lg font-medium transition-colors"
                        onClick={() => setIsSearchOpen(true)}
                    >
                      <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-green-400 to-green-600 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
                       <div className="relative flex h-full w-full items-center justify-start rounded-full bg-background px-4">
                         <Search className="mr-4 h-5 w-5 shrink-0" />
                          <span className="sm:hidden">Search for a tool...</span>
                          <span className="hidden sm:inline">Search for a tool (like-'qr code generetor')</span>
                       </div>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                    <Command>
                        <CommandInput
                            placeholder="Search for a tool..."
                            value={searchQuery}
                            onValueChange={setSearchQuery}
                            />
                        <CommandList>
                            <CommandEmpty>No tools found.</CommandEmpty>
                            <CommandGroup>
                                {filteredTools.map((tool) => (
                                    <CommandItem
                                        key={tool.href}
                                        value={tool.name}
                                        onSelect={() => handleToolSelect(tool.href)}
                                    >
                                        <tool.icon className="mr-2 h-4 w-4" />
                                        <span>{tool.name}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
          </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent animate-fade-in-down">
          Our Tools Collection
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Free Tools - No Signup - No Limits.
        </p>
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
                'flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110',
                iconBgColors[categoryIndex % iconBgColors.length]
              )}
            >
              <category.icon
                className={cn(
                  'h-8 w-8 transition-transform duration-300 group-hover:rotate-[-12deg]',
                  iconTextColors[categoryIndex % iconTextColors.length]
                )}
              />
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-lg tracking-tight font-headline text-foreground">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 transition-all group-hover:scale-105 group-hover:text-primary">
                Contains {category.tools.length} 100% free tools
              </p>
            </div>
          </button>
        ))}
      </div>
      <FeatureHighlights />
      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
        <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-3 bg-white/20 rounded-full">
                <Heart className="h-6 w-6 text-white"/>
            </div>
            <div>
                <CardTitle>Support Our Mission</CardTitle>
                <CardDescription className="text-white/80">Enjoying our 100% free tools? Consider supporting the site!</CardDescription>
            </div>
        </CardHeader>
        <CardContent>
             <Link href="https://revolut.me/jabedhy13p" target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-white text-green-600 hover:bg-white/90 font-bold text-lg py-6 rounded-full shadow-lg transition-transform transform hover:scale-105">
                Donate Now
              </Button>
            </Link>
        </CardContent>
      </Card>
      <Stats />
    </div>
  );
}
