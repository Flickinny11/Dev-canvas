'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Code, Zap, Sparkles, Rocket, Brain, Layers } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { ExperienceModesSection } from '@/components/landing/experience-modes-section'
import { CTASection } from '@/components/landing/cta-section'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-dark-50 via-dark-100 to-dark-200 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 via-transparent to-purple-500/10" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-400 rounded-full"
            initial={{ 
              x: Math.random() * 1920, // Use fixed value for SSR
              y: Math.random() * 1080, // Use fixed value for SSR
              opacity: 0 
            }}
            animate={{ 
              y: -100,
              opacity: [0, 1, 0] 
            }}
            transition={{ 
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5 
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 glass">
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-8 h-8 bg-gradient-to-tr from-primary-400 to-purple-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">The Experience</span>
        </motion.div>

        <motion.div 
          className="flex items-center space-x-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link href="/auth/signin" className="text-dark-600 hover:text-white transition-colors">
            Sign In
          </Link>
          <Button variant="primary" size="sm" asChild>
            <Link href="/auth/signup">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Experience Modes Section */}
      <ExperienceModesSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <footer className="relative z-20 bg-dark-50/50 backdrop-blur-sm border-t border-dark-200 p-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-gradient-to-tr from-primary-400 to-purple-500 rounded flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold">The Experience</span>
          </div>
          <div className="text-sm text-dark-500">
            © 2024 The Experience. The future of AI-first development.
          </div>
        </div>
      </footer>
    </main>
  )
}