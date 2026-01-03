
import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ToolsyBro | 100% Free Online Tools',
    short_name: 'ToolsyBro',
    description: 'A comprehensive collection of 90+ free online tools. No sign-up required, no limits. All tools are privacy-focused and process data locally in your browser.',
    start_url: '/',
    display: 'standalone',
    background_color: '#111827',
    theme_color: '#6366f1',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
