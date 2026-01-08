
'use client';

import Link from 'next/link';
import { useState, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toolCategories } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
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
  ...toolCategories[4].tools.slice(0, 1), // QR Code Generator
  ...toolCategories[4].tools.slice(2, 4), // Barcode, Password Gen
  ...toolCategories[0].tools.slice(10, 11), // Plagiarism Checker
  ...toolCategories[4].tools.slice(11, 12), // CV Maker
];


export function SharedToolsHeader() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const plugins = useRef([
    Autoplay({ delay: 2000, stopOnInteraction: true })
  ]);
  
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

  const handleToolSelect = (href: string) => {
      router.push(href);
      setIsSearchOpen(false);
  }

  return (
    <div className="mb-8 space-y-8">
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
              <CarouselItem key={index} className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                <div className="p-1">
                  <Link href={tool.href} className="group">
                    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary">
                      <CardContent className="flex flex-col items-center justify-center p-2 sm:p-4 gap-2 sm:gap-3 aspect-square">
                        <div
                          className={cn(
                            'flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110',
                            iconBgColors[index % iconBgColors.length]
                          )}
                        >
                          <tool.icon className={cn('h-6 w-6 sm:h-8 sm:w-8', iconTextColors[index % iconTextColors.length])} />
                        </div>
                        <p className="text-sm sm:text-base font-semibold text-center group-hover:text-primary">{tool.name}</p>
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
      </section>
    </div>
  );
}
