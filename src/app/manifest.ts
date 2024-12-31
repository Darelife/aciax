import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ACIAX',
    short_name: 'Aciax',
    description: 'Resource Display for BITS Goa',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f0f23',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon-9.png',
        sizes: '192x192',
        type: 'image/png',
      }
    ],
  }
}