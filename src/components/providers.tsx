'use client'

import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import { AuthProvider } from '@/lib/auth-context'
import { AIProvider } from '@/lib/ai-context'
import { PaymentProvider } from '@/lib/payment-context'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <SessionProvider>
        <AuthProvider>
          <AIProvider>
            <PaymentProvider>
              {children}
            </PaymentProvider>
          </AIProvider>
        </AuthProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}