'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Menu, ChevronDown, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toolCategories } from '@/lib/data';
import { ThemeToggle } from './ThemeToggle';
import { ScrollArea } from '../ui/scroll-area';
import Image from 'next/image';

const navLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Image src="https://i.postimg.cc/JzP4jd7H/gghg.png" alt="ToolsyBro Logo" width={40} height={40} className="h-10 w-10" />
          <span className="font-headline hidden sm:inline-block text-foreground">ToolsyBro</span>
        </Link>
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
          <nav className="hidden items-center gap-4 md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-primary focus-visible:ring-0">
                  Free Tools <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  {toolCategories.map((category) => (
                    <Link href={`/?category=${encodeURIComponent(category.name)}`} key={category.name}>
                       <DropdownMenuItem>
                         <category.icon className="mr-2 h-4 w-4" />
                         <span>{category.name}</span>
                       </DropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href="/"
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === '/' ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              Home
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
            <Link href="https://revolut.me/jabedhy13p" target="_blank" rel="noopener noreferrer">
               <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg transition-transform transform hover:scale-105">
                <Heart className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Donate</span>
              </Button>
            </Link>
            <ThemeToggle />
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-accent text-foreground">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background text-foreground p-0">
                <ScrollArea className="h-full">
                  <div className="grid gap-4 p-6">
                    <Link
                      href="/"
                      className="flex items-center gap-2 font-bold text-lg text-foreground"
                    >
                      <Image src="https://i.postimg.cc/JzP4jd7H/gghg.png" alt="ToolsyBro Logo" width={32} height={32} className="h-8 w-8" />
                      <span className="font-headline">ToolsyBro</span>
                    </Link>
                    <p className='font-bold text-lg text-foreground pt-4'>Free Tools</p>
                      {toolCategories.map((category) => (
                        <Link
                          key={category.name}
                          href={`/?category=${encodeURIComponent(category.name)}`}
                          className='flex w-full items-center py-2 text-md font-medium text-muted-foreground hover:text-primary'
                        >
                          <category.icon className="mr-2 h-4 w-4" />
                          {category.name}
                        </Link>
                      ))}
                    <div className="border-t pt-4 mt-4 grid gap-4">
                      <Link
                          href="/"
                          className={cn(
                            'flex w-full items-center py-2 text-lg font-medium',
                            pathname === '/'
                              ? 'text-primary'
                              : 'text-muted-foreground hover:text-primary'
                          )}
                        >
                          Home
                        </Link>
                        {navLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                              'flex w-full items-center py-2 text-lg font-medium',
                              pathname === link.href
                                ? 'text-primary'
                                : 'text-muted-foreground hover:text-primary'
                            )}
                          >
                            {link.label}
                          </Link>
                        ))}
                    </div>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
