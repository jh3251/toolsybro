
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
import { Menu, Wrench, ChevronDown, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toolCategories } from '@/lib/data';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Wrench className="h-7 w-7" />
          <span className="font-headline hidden sm:inline-block">MultiToolSuite</span>
        </Link>
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-6">
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-white/80',
                  pathname === link.href ? 'text-white font-semibold' : 'text-white/70'
                )}
              >
                {link.label}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium text-white/70 hover:text-white/80 hover:bg-white/10 focus-visible:ring-0">
                  Tools <ChevronDown className="ml-1 h-4 w-4" />
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
          </nav>
            <Link href="https://www.paypal.com/donate/?business=jhshifat21@gmail.com" target="_blank" rel="noopener noreferrer">
              <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg transition-transform transform hover:scale-105">
                <Heart className="mr-2 h-4 w-4" />
                Donate
              </Button>
            </Link>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background text-foreground">
                <div className="grid gap-4 py-6">
                  <Link
                    href="/"
                    className="flex items-center gap-2 font-bold text-lg text-foreground"
                  >
                    <Wrench className="h-6 w-6 text-primary" />
                    <span className="font-headline">MultiToolSuite</span>
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
                   <p className='font-bold text-lg text-foreground pt-4'>Tools</p>
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
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
