
import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact ToolsyBro | Feedback on Our 100% Free Tools',
  description: 'Get in touch with the ToolsyBro team. We welcome your feedback and suggestions about our 100% free tools.',
};

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Contact Us</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Have a question or suggestion about our 100% free tools? Drop us a line!
        </p>
      </header>
      <div className="max-w-2xl">
        <ContactForm />
      </div>
    </div>
  );
}
