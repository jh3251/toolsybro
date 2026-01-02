import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact ToolsyBro',
  description: 'Get in touch with the ToolsyBro team. We welcome your feedback, suggestions, and inquiries about our free tools.',
};

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Contact Us</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Have a question, suggestion, or just want to say hi? Drop us a line!
        </p>
      </header>
      <div className="max-w-2xl">
        <ContactForm />
      </div>
    </div>
  );
}
