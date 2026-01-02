import type { LucideIcon } from 'lucide-react';
import { Calculator, Image, QrCode, CaseUpper, Braces, Pilcrow } from 'lucide-react';

export type Tool = {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export const tools: Tool[] = [
  {
    name: 'Online Word Counter',
    description: 'Count words, characters, sentences, and paragraphs in your text.',
    href: '/tools/word-counter',
    icon: Calculator,
  },
  {
    name: 'Image Compressor',
    description: 'Reduce image file sizes while maintaining quality for web optimization.',
    href: '/tools/image-compressor',
    icon: Image,
  },
  {
    name: 'QR Code Generator',
    description: 'Create custom QR codes from text or URLs with color options.',
    href: '/tools/qr-code-generator',
    icon: QrCode,
  },
  {
    name: 'Text Case Converter',
    description: 'Easily convert text between different cases like uppercase, lowercase, etc.',
    href: '/tools/text-case-converter',
    icon: CaseUpper,
  },
  {
    name: 'JSON Formatter',
    description: 'Format, validate, and beautify your JSON data for readability.',
    href: '/tools/json-formatter',
    icon: Braces,
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'maximize-writing-efficiency',
    title: 'Maximize Your Writing Efficiency with a Word Counter',
    date: '2023-10-26',
    excerpt: 'Discover how using an online word counter can streamline your writing process, improve readability, and help you meet strict length requirements for articles, essays, and social media posts.',
    content: `
<p class="text-lg text-muted-foreground">In the digital age, content is king. Whether you're a professional writer, a student, or a social media manager, the ability to produce concise and effective text is crucial. This is where an online word counter becomes an indispensable tool in your arsenal. It's more than just a utility for counting words; it's a partner in crafting perfect prose.</p>
<h2 class="text-3xl font-bold my-6 font-headline">Meeting Requirements with Precision</h2>
<p class="text-lg text-muted-foreground">Many platforms and publications have strict word or character limits. From Twitter's character count to a professor's essay requirements, staying within these boundaries is non-negotiable. A word counter provides immediate feedback, allowing you to edit on the fly and ensure your work meets the specified criteria without guesswork.</p>
<h2 class="text-3xl font-bold my-6 font-headline">Enhancing Readability</h2>
<p class="text-lg text-muted-foreground">Beyond simple counts, many word counters also provide metrics like sentence count, paragraph count, and reading time. This data is invaluable for improving the readability of your text. Are your sentences too long and complex? Are your paragraphs too dense? By analyzing these metrics, you can break up your text into more digestible chunks, making it more engaging for your audience.</p>
<div class="my-8 flex justify-center">
    <!-- In-content ad placeholder: The user can replace this with an actual ad component -->
</div>
<h2 class="text-3xl font-bold my-6 font-headline">Boosting SEO</h2>
<p class="text-lg text-muted-foreground">For content creators focused on search engine optimization (SEO), content length is a known ranking factor. While quality always trumps quantity, longer, more comprehensive articles tend to rank better for competitive keywords. A word counter helps you track your content length to ensure you're hitting the sweet spot for your target keywords, typically between 1,500 and 2,500 words for in-depth articles.</p>
<p class="text-lg text-muted-foreground">In conclusion, integrating an online word counter into your workflow is a simple change that can have a profound impact on your efficiency and the quality of your writing. Start using one today and take control of your content.</p>
    `,
  },
  {
    slug: 'why-image-compression-matters',
    title: 'Why Image Compression is a Must-Have for Your Website',
    date: '2023-10-22',
    excerpt: 'Slow-loading websites lose visitors. Learn how compressing your images can dramatically improve your site\'s performance, boost your SEO ranking, and enhance user experience.',
    content: `
<p class="text-lg text-muted-foreground">In today's fast-paced digital world, user attention spans are shorter than ever. If your website takes more than a few seconds to load, you risk losing a significant portion of your visitors. One of the biggest culprits behind slow websites is large, unoptimized images. This is why image compression is not just a recommendation; it's a necessity.</p>
<h2 class="text-3xl font-bold my-6 font-headline">The Impact on Page Speed</h2>
<p class="text-lg text-muted-foreground">High-resolution images can be several megabytes in size. When a user visits your page, their browser has to download all of these files. The larger the files, the longer the wait. Image compression tools reduce the file size of your images, often by over 70%, with little to no perceptible loss in quality. This directly translates to faster page load times.</p>
<div class="my-8 flex justify-center">
    <!-- In-content ad placeholder: The user can replace this with an actual ad component -->
</div>
<h2 class="text-3xl font-bold my-6 font-headline">SEO and User Experience</h2>
<p class="text-lg text-muted-foreground">Google has officially stated that page speed is a ranking factor for both desktop and mobile searches. A faster website doesn't just please your visitors; it pleases search engines too. By compressing your images, you're taking a critical step towards improving your SEO and outranking your competitors.</p>
<p class="text-lg text-muted-foreground">Furthermore, a snappy, responsive website provides a much better user experience (UX). Visitors are more likely to stay, engage with your content, and convert when they aren't frustrated by long loading screens. Happy users lead to lower bounce rates and higher engagement metrics, which also positively impact SEO.</p>
<h2 class="text-3xl font-bold my-6 font-headline">How to Get Started</h2>
<p class="text-lg text-muted-foreground">You don't need to be a graphic designer to compress your images. There are many free online image compressors that make the process incredibly simple. Just upload your image, and the tool will automatically apply the best compression techniques to reduce its file size. Download the optimized image and upload it to your website. It's a small step that yields huge results.</p>
    `,
  },
];
