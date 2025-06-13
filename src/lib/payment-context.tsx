'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { loadStripe, Stripe } from '@stripe/stripe-js'

interface PaymentPlan {
  id: string
  name: string
  price: number
  credits: number
  features: string[]
  popular?: boolean
}

interface PaymentContextType {
  stripe: Stripe | null
  plans: PaymentPlan[]
  currentPlan: PaymentPlan | null
  subscribe: (planId: string) => Promise<void>
  buyCredits: (amount: number) => Promise<void>
  isLoading: boolean
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined)

export function usePayment() {
  const context = useContext(PaymentContext)
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider')
  }
  return context
}

const plans: PaymentPlan[] = [
  {
    id: 'free',
    name: 'Starter',
    price: 0,
    credits: 100,
    features: [
      '100 AI credits per month',
      'Basic code generation',
      'Community support',
      'Standard templates',
      '1 active project'
    ]
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 29,
    credits: 1000,
    features: [
      '1,000 AI credits per month',
      'Advanced code generation',
      'Priority support',
      'Premium templates',
      '10 active projects',
      'Deployment automation',
      'Code review AI'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    credits: 5000,
    features: [
      '5,000 AI credits per month',
      'Custom AI models',
      'Dedicated support',
      'White-label solutions',
      'Unlimited projects',
      'Advanced integrations',
      'Team collaboration',
      'Custom deployment pipelines'
    ]
  }
]

export function PaymentProvider({ children }: { children: React.ReactNode }) {
  const [stripe, setStripe] = useState<Stripe | null>(null)
  const [currentPlan, setCurrentPlan] = useState<PaymentPlan | null>(plans[0])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const initializeStripe = async () => {
      const stripePromise = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_...'
      )
      setStripe(stripePromise)
    }

    initializeStripe()
  }, [])

  const subscribe = async (planId: string) => {
    if (!stripe) {
      throw new Error('Stripe not initialized')
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/payments/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({ planId })
      })

      if (!response.ok) {
        throw new Error('Subscription failed')
      }

      const { sessionId } = await response.json()
      
      const { error } = await stripe.redirectToCheckout({ sessionId })
      
      if (error) {
        throw new Error(error.message)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const buyCredits = async (amount: number) => {
    if (!stripe) {
      throw new Error('Stripe not initialized')
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/payments/credits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({ amount })
      })

      if (!response.ok) {
        throw new Error('Credit purchase failed')
      }

      const { sessionId } = await response.json()
      
      const { error } = await stripe.redirectToCheckout({ sessionId })
      
      if (error) {
        throw new Error(error.message)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PaymentContext.Provider
      value={{
        stripe,
        plans,
        currentPlan,
        subscribe,
        buyCredits,
        isLoading,
      }}
    >
      {children}
    </PaymentContext.Provider>
  )
}