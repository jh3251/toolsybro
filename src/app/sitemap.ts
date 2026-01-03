
import { MetadataRoute } from 'next'
import { toolCategories } from '@/lib/data';
import { blogPosts } from '@/lib/data';
 
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://www.toolsybro.com'; // Replace with your actual domain

  // Get all tool pages, excluding placeholder pages
  const toolUrls = toolCategories.flatMap(category => 
    category.tools
      .filter(tool => !tool.href.includes('coming-soon')) // Filter out placeholder pages
      .map(tool => ({
        url: `${siteUrl}${tool.href}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }))
  );

  // Get all blog post pages
  const blogPostUrls = blogPosts.map(post => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Define static pages
  const staticPages = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
     {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
     {
      url: `${siteUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
     {
      url: `${siteUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  return [
    ...staticPages,
    ...toolUrls,
    ...blogPostUrls,
  ];
}
