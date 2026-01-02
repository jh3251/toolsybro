import Link from "next/link";
import { AdPlaceholder } from "./AdPlaceholder";

const footerLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-and-conditions', label: 'Terms & Conditions' },
];

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 py-8">
            <AdPlaceholder width={728} height={90} title="Footer Ad (728x90)" className="mb-4" />
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t py-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ToolsyBro. All rights reserved.
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {footerLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
