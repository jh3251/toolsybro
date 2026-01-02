import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about MultiToolSuite, our mission to provide free and high-quality online tools, and the team behind it.',
};

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">About MultiToolSuite</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Our mission is to provide simple, powerful, and accessible online tools for everyone.
        </p>
      </header>
      <article className="prose prose-lg dark:prose-invert max-w-none space-y-4 text-muted-foreground">
        <p>
          MultiToolSuite was born from a simple idea: the best things in life should be free, and that includes high-quality digital tools. In a world cluttered with expensive software and ad-intrusive websites, we wanted to create a clean, user-friendly space where anyone can access the utilities they need to be more productive, without any barriers.
        </p>
        <p>
          Whether you're a student, a professional writer, a developer, or just someone looking to get a quick task done, our suite of tools is designed for you. From counting words in an essay to formatting complex JSON data, we've focused on creating tools that are both powerful and incredibly easy to use.
        </p>
        <h2 className="text-3xl font-bold font-headline text-foreground">Our Philosophy</h2>
        <p>
          <strong>Simplicity:</strong> Our tools have clean, intuitive interfaces. You shouldn't need a manual to figure them out.
        </p>
        <p>
          <strong>Performance:</strong> We believe in speed. Our website and tools are optimized to be as fast as possible, so you can get your work done without waiting.
        </p>
        <p>
          <strong>Accessibility:</strong> Our tools are free for everyone, forever. We support our work through unobtrusive advertising that complies with all industry standards, ensuring a great user experience.
        </p>
        <p>
          Thank you for using MultiToolSuite. We're constantly working on adding new tools and improving existing ones. If you have any feedback or suggestions, please don't hesitate to reach out to us through our contact page.
        </p>
      </article>
    </div>
  );
}
