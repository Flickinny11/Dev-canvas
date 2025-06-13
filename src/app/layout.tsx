import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/providers'

export const metadata: Metadata = {
  title: 'The Experience - Ultimate AI Coding Platform',
  description: 'The future of AI-first development. Build production-ready applications with natural language using our revolutionary AI orchestration platform.',
  keywords: ['AI', 'coding', 'development', 'IDE', 'artificial intelligence', 'programming'],
  authors: [{ name: 'The Experience Team' }],
  creator: 'The Experience',
  publisher: 'The Experience',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'The Experience - Ultimate AI Coding Platform',
    description: 'The future of AI-first development. Build production-ready applications with natural language.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Experience - Ultimate AI Coding Platform',
    description: 'The future of AI-first development. Build production-ready applications with natural language.',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;200;300;400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-sans">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}