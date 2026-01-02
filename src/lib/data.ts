import type { LucideIcon } from 'lucide-react';
import {
  Calculator,
  Image,
  QrCode,
  CaseUpper,
  Braces,
  BookText,
  FileImage,
  FileText,
  Code,
  Box,
  GraduationCap,
  Briefcase,
  Globe,
  Palette,
  ShieldCheck,
  Type,
  ListTree,
  ListOrdered,
  Eraser,
  Replace,
  AudioLines,
  Mic,
  ArrowRightLeft,
  Crop,
  Droplet,
  FileLock,
  FileSliders,
  FileJson,
  FileCode,
  FileDigit,
  Shuffle,
  Link2,
  Fingerprint,
  MessageSquare,
  Regex,
  Barcode,
  KeyRound,
  Shield,
  Timer,
  Hourglass,
  Scale,
  Landmark,
  Clock,
  Cake,
  BookOpen,
  Percent,
  FlaskConical,
  CalendarCheck,
  Notebook,
  ClipboardList,
  Sigma,
  FunctionSquare,
  Banknote,
  TrendingUp,
  Receipt,
  CircleDollarSign,
  PenTool,
  Tag,
  Search,
  Network,
  Route,
  Share2,
  Server,
  Monitor,
  Eye,
  Vote,
  Hash,
  BadgeCheck,
  Lock,
  User,
  Mail,
  LocateFixed,
  Plug,
  Binary,
  Spline,
  AppWindow,
  Scissors,
  Layers,
  Combine,
  RotateCcw,
  Book,
  FileKey2,
} from 'lucide-react';

export type Tool = {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export type ToolCategory = {
  name: string;
  icon: LucideIcon;
  tools: Tool[];
};

export const toolCategories: ToolCategory[] = [
  {
    name: 'Text & Writing Tools',
    icon: BookText,
    tools: [
      { name: 'Word Counter', description: 'Count words in your text.', href: '/tools/word-counter', icon: Calculator },
      { name: 'Character Counter', description: 'Count characters in your text.', href: '/tools/character-counter', icon: Type },
      { name: 'Sentence Counter', description: 'Count sentences in your text.', href: '/tools/sentence-counter', icon: ListTree },
      { name: 'Paragraph Counter', description: 'Count paragraphs in your text.', href: '/tools/paragraph-counter', icon: ListOrdered },
      { name: 'Text Case Converter', description: 'Convert text to different cases.', href: '/tools/text-case-converter', icon: CaseUpper },
      { name: 'Remove Duplicate Lines', description: 'Remove duplicate lines from text.', href: '/tools/remove-duplicate-lines', icon: Eraser },
      { name: 'Text Sorter (A–Z / Z–A)', description: 'Sort text lines alphabetically.', href: '/tools/text-sorter', icon: Shuffle },
      { name: 'Find & Replace Text', description: 'Find and replace text.', href: '/tools/find-replace-text', icon: Replace },
      { name: 'Text to Speech', description: 'Convert text to speech.', href: '/tools/text-to-speech', icon: AudioLines },
      { name: 'Speech to Text', description: 'Convert speech to text.', href: '/tools/speech-to-text', icon: Mic },
    ],
  },
  {
    name: 'Image Tools',
    icon: FileImage,
    tools: [
      { name: 'Image Compressor', description: 'Compress image file sizes.', href: '/tools/image-compressor', icon: Image },
      { name: 'Image Resizer', description: 'Resize image dimensions.', href: '/tools/image-resizer', icon: Crop },
      { name: 'Image Cropper', description: 'Crop images to a specific area.', href: '/tools/image-cropper', icon: Scissors },
      { name: 'Image Converter', description: 'Convert between PNG, JPG, WEBP.', href: '/tools/image-converter', icon: ArrowRightLeft },
      { name: 'Image to Base64', description: 'Encode images to Base64.', href: '/tools/image-to-base64', icon: FileCode },
      { name: 'Base64 to Image', description: 'Decode Base64 to an image.', href: '/tools/base64-to-image', icon: FileImage },
      { name: 'Image Watermark Tool', description: 'Add watermarks to images.', href: '/tools/image-watermark', icon: PenTool },
      { name: 'Image Background Remover', description: 'Remove backgrounds from images.', href: '/tools/image-background-remover', icon: Eraser },
      { name: 'Image Metadata Viewer', description: 'View image EXIF data.', href: '/tools/image-metadata-viewer', icon: FileJson },
      { name: 'Image Color Picker', description: 'Pick colors from an image.', href: '/tools/image-color-picker', icon: Droplet },
    ],
  },
  {
    name: 'PDF Tools',
    icon: FileText,
    tools: [
        { name: 'PDF to JPG', description: 'Convert PDF pages to JPG images.', href: '/tools/pdf-to-jpg', icon: FileImage },
        { name: 'JPG to PDF', description: 'Convert JPG images to a PDF file.', href: '/tools/jpg-to-pdf', icon: FileDigit },
        { name: 'PDF Compressor', description: 'Reduce the file size of PDFs.', href: '/tools/pdf-compressor', icon: FileSliders },
        { name: 'PDF Merger', description: 'Combine multiple PDFs into one.', href: '/tools/pdf-merger', icon: Combine },
        { name: 'PDF Splitter', description: 'Split a PDF into multiple files.', href: '/tools/pdf-splitter', icon: Layers },
        { name: 'PDF Password Remover', description: 'Remove password protection from a PDF.', href: '/tools/pdf-password-remover', icon: FileKey2 },
        { name: 'PDF Page Rotator', description: 'Rotate pages in a PDF file.', href: '/tools/pdf-page-rotator', icon: RotateCcw },
        { name: 'PDF to Word', description: 'Convert PDF files to Word documents.', href: '/tools/pdf-to-word', icon: Book },
        { name: 'Word to PDF', description: 'Convert Word documents to PDF.', href: '/tools/word-to-pdf', icon: FileText },
        { name: 'PDF Metadata Editor', description: 'Edit the metadata of a PDF file.', href: '/tools/pdf-metadata-editor', icon: FileJson },
    ],
  },
  {
    name: 'Developer Tools',
    icon: Code,
    tools: [
      { name: 'JSON Formatter & Validator', description: 'Format and validate JSON.', href: '/tools/json-formatter', icon: Braces },
      { name: 'XML Formatter', description: 'Format and beautify XML code.', href: '/tools/xml-formatter', icon: FileCode },
      { name: 'HTML Minifier', description: 'Minify HTML for performance.', href: '/tools/html-minifier', icon: FileCode },
      { name: 'CSS Minifier', description: 'Minify CSS for performance.', href: '/tools/css-minifier', icon: FileCode },
      { name: 'JavaScript Minifier', description: 'Minify JavaScript for performance.', href: '/tools/javascript-minifier', icon: FileCode },
      { name: 'Base64 Encoder / Decoder', description: 'Encode and decode Base64.', href: '/tools/base64-encoder-decoder', icon: Shuffle },
      { name: 'URL Encoder / Decoder', description: 'Encode and decode URLs.', href: '/tools/url-encoder-decoder', icon: Link2 },
      { name: 'UUID Generator', description: 'Generate unique identifiers.', href: '/tools/uuid-generator', icon: Fingerprint },
      { name: 'Lorem Ipsum Generator', description: 'Generate placeholder text.', href: '/tools/lorem-ipsum-generator', icon: MessageSquare },
      { name: 'Regex Tester', description: 'Test regular expressions.', href: '/tools/regex-tester', icon: Regex },
    ],
  },
  {
    name: 'Utility & Productivity Tools',
    icon: Box,
    tools: [
      { name: 'QR Code Generator', description: 'Generate custom QR codes.', href: '/tools/qr-code-generator', icon: QrCode },
      { name: 'Barcode Generator', description: 'Generate various barcode types.', href: '/tools/barcode-generator', icon: Barcode },
      { name: 'Password Generator', description: 'Create strong, random passwords.', href: '/tools/password-generator', icon: KeyRound },
      { name: 'Password Strength Checker', description: 'Check password strength.', href: '/tools/password-strength-checker', icon: Shield },
      { name: 'Online Stopwatch', description: 'A simple online stopwatch.', href: '/tools/online-stopwatch', icon: Timer },
      { name: 'Countdown Timer', description: 'Set a countdown timer.', href: '/tools/countdown-timer', icon: Hourglass },
      { name: 'Unit Converter', description: 'Convert various units of measurement.', href: '/tools/unit-converter', icon: Scale },
      { name: 'Currency Converter', description: 'Convert between currencies.', href: '/tools/currency-converter', icon: Landmark },
      { name: 'Time Zone Converter', description: 'Convert between time zones.', href: '/tools/time-zone-converter', icon: Clock },
      { name: 'Age Calculator', description: 'Calculate age from a birth date.', href: '/tools/age-calculator', icon: Cake },
    ],
  },
  {
    name: 'Student & Education Tools',
    icon: GraduationCap,
    tools: [
      { name: 'GPA Calculator', description: 'Calculate your Grade Point Average.', href: '/tools/gpa-calculator', icon: BookOpen },
      { name: 'Percentage Calculator', description: 'Calculate percentages easily.', href: '/tools/percentage-calculator', icon: Percent },
      { name: 'Scientific Calculator', description: 'An online scientific calculator.', href: '/tools/scientific-calculator', icon: FlaskConical },
      { name: 'Attendance Calculator', description: 'Calculate your attendance percentage.', href: '/tools/attendance-calculator', icon: CalendarCheck },
      { name: 'Exam Timer', description: 'A timer for your exams and tests.', href: '/tools/exam-timer', icon: Timer },
      { name: 'Notes Organizer', description: 'Organize your study notes.', href: '/tools/notes-organizer', icon: Notebook },
      { name: 'Study Planner', description: 'Plan your study sessions.', href: '/tools/study-planner', icon: ClipboardList },
      { name: 'Equation Solver', description: 'Solve mathematical equations.', href: '/tools/equation-solver', icon: Sigma },
      { name: 'Prime Number Checker', description: 'Check if a number is prime.', href: '/tools/prime-number-checker', icon: Sigma },
      { name: 'Math Formula Generator', description: 'Generate math formulas.', href: '/tools/math-formula-generator', icon: FunctionSquare },
    ],
  },
  {
    name: 'Business & Finance Tools',
    icon: Briefcase,
    tools: [
      { name: 'EMI Calculator', description: 'Calculate Equated Monthly Installments.', href: '/tools/emi-calculator', icon: Landmark },
      { name: 'Loan Calculator', description: 'Calculate loan payments.', href: '/tools/loan-calculator', icon: Calculator },
      { name: 'Interest Calculator', description: 'Calculate simple and compound interest.', href: '/tools/interest-calculator', icon: Banknote },
      { name: 'Profit Margin Calculator', description: 'Calculate profit margins.', href: '/tools/profit-margin-calculator', icon: TrendingUp },
      { name: 'Invoice Generator', description: 'Create professional invoices.', href: '/tools/invoice-generator', icon: Receipt },
      { name: 'GST / VAT Calculator', description: 'Calculate Goods & Services Tax.', href: '/tools/gst-vat-calculator', icon: Percent },
      { name: 'Break-Even Calculator', description: 'Calculate your break-even point.', href: '/tools/break-even-calculator', icon: CircleDollarSign },
      { name: 'Salary Calculator', description: 'Calculate your take-home salary.', href: '/tools/salary-calculator', icon: Calculator },
      { name: 'Tax Estimator', description: 'Estimate your income tax.', href: '/tools/tax-estimator', icon: Landmark },
      { name: 'Currency Profit Calculator', description: 'Calculate currency trading profits.', href: '/tools/currency-profit-calculator', icon: Banknote },
    ],
  },
  {
    name: 'SEO & Web Tools',
    icon: Globe,
    tools: [
      { name: 'Meta Tag Generator', description: 'Generate meta tags for your site.', href: '/tools/meta-tag-generator', icon: Tag },
      { name: 'Keyword Density Checker', description: 'Check keyword density of a text.', href: '/tools/keyword-density-checker', icon: Search },
      { name: 'SEO Analyzer', description: 'Analyze your webpage for SEO.', href: '/tools/seo-analyzer', icon: Search },
      { name: 'Page Speed Checker', description: 'Check your website\'s speed.', href: '/tools/page-speed-checker', icon: Timer },
      { name: 'Sitemap Generator', description: 'Generate a sitemap.xml file.', href: '/tools/sitemap-generator', icon: Network },
      { name: 'Robots.txt Generator', description: 'Generate a robots.txt file.', href: '/tools/robots-txt-generator', icon: Route },
      { name: 'Open Graph Preview Tool', description: 'Preview Open Graph tags.', href: '/tools/open-graph-preview', icon: Share2 },
      { name: 'Domain Age Checker', description: 'Check the age of a domain.', href: '/tools/domain-age-checker', icon: Cake },
      { name: 'IP Address Lookup', description: 'Find the location of an IP.', href: '/tools/ip-address-lookup', icon: Server },
      { name: 'HTTP Status Checker', description: 'Check HTTP status codes of URLs.', href: '/tools/http-status-checker', icon: Fingerprint },
    ],
  },
  {
    name: 'Design & UI Tools',
    icon: Palette,
    tools: [
      { name: 'Color Palette Generator', description: 'Generate color palettes.', href: '/tools/color-palette-generator', icon: Palette },
      { name: 'Gradient Generator', description: 'Create CSS gradients.', href: '/tools/gradient-generator', icon: Spline },
      { name: 'Font Pairing Tool', description: 'Find great font pairings.', href: '/tools/font-pairing-tool', icon: Type },
      { name: 'Box Shadow Generator', description: 'Generate CSS box shadows.', href: '/tools/box-shadow-generator', icon: AppWindow },
      { name: 'CSS Button Generator', description: 'Generate CSS for buttons.', href: '/tools/css-button-generator', icon: AppWindow },
      { name: 'Border Radius Generator', description: 'Generate CSS for border radius.', href: '/tools/border-radius-generator', icon: AppWindow },
      { name: 'SVG Optimizer', description: 'Optimize SVG files.', href: '/tools/svg-optimizer', icon: Scissors },
      { name: 'Favicon Generator', description: 'Create favicons for your site.', href: '/tools/favicon-generator', icon: Image },
      { name: 'Icon Converter', description: 'Convert between icon formats.', href: '/tools/icon-converter', icon: ArrowRightLeft },
      { name: 'Wireframe Generator', description: 'Generate simple wireframes.', href: '/tools/wireframe-generator', icon: Monitor },
    ],
  },
  {
    name: 'Security & Network Tools',
    icon: ShieldCheck,
    tools: [
      { name: 'Hash Generator (MD5, SHA)', description: 'Generate hashes from text.', href: '/tools/hash-generator', icon: Hash },
      { name: 'Hash Checker', description: 'Compare hashes to check integrity.', href: '/tools/hash-checker', icon: BadgeCheck },
      { name: 'SSL Checker', description: 'Check the SSL certificate of a site.', href: '/tools/ssl-checker', icon: Lock },
      { name: 'Random Username Generator', description: 'Generate random usernames.', href: '/tools/random-username-generator', icon: User },
      { name: 'Email Validator', description: 'Validate an email address.', href: '/tools/email-validator', icon: Mail },
      { name: 'IP Location Finder', description: 'Find the location of an IP address.', href: '/tools/ip-location-finder', icon: LocateFixed },
      { name: 'Port Checker', description: 'Check if a port is open.', href: '/tools/port-checker', icon: Plug },
      { name: 'User Agent Checker', description: 'Check your browser\'s user agent.', href: '/tools/user-agent-checker', icon: Binary },
      { name: 'WHOIS Lookup', description: 'Perform a WHOIS lookup.', href: '/tools/whois-lookup', icon: Search },
      { name: 'Password Leak Checker', description: 'Check if your password was leaked.', href: '/tools/password-leak-checker', icon: FileLock },
    ],
  },
];


// This is the old tools array, which is now part of toolCategories
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
