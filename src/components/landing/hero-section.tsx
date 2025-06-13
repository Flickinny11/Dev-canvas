'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, Code } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative z-20 pt-20 pb-32 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-sm text-primary-300">The Future of AI Development</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">The Experience</span>
            <br />
            <span className="text-white">Ultimate AI Coding Platform</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-dark-400 max-w-4xl mx-auto mb-8 leading-relaxed">
            Transform your ideas into production-ready applications using natural language. 
            Our revolutionary AI orchestration creates complete, deployable apps without placeholders or mock data.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Button variant="primary" size="xl" asChild>
            <Link href="/auth/signup">
              Start Building Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
          
          <Button variant="neon" size="xl" asChild>
            <Link href="#demo">
              Watch Demo
              <Zap className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {[
            'No Placeholders',
            'Production Ready',
            'AI Orchestration',
            'Natural Language',
            'Deploy Anywhere',
            '100% Functional'
          ].map((feature, index) => (
            <div
              key={feature}
              className="glass rounded-full px-4 py-2 text-sm text-dark-300 border border-primary-500/20"
            >
              {feature}
            </div>
          ))}
        </motion.div>

        {/* Animated Code Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="glass rounded-2xl p-8 border border-primary-500/20">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-dark-400 text-sm ml-4">The Experience Terminal</span>
            </div>
            
            <div className="font-mono text-left space-y-2 text-sm">
              <div className="text-primary-400">
                $ experience create &quot;todo app with user auth and real-time sync&quot;
              </div>
              <div className="text-green-400">
                ✓ Analyzing requirements...
              </div>
              <div className="text-green-400">
                ✓ Generating architecture...
              </div>
              <div className="text-green-400">
                ✓ Creating production-ready code...
              </div>
              <div className="text-green-400">
                ✓ Setting up authentication...
              </div>
              <div className="text-green-400">
                ✓ Configuring real-time database...
              </div>
              <div className="text-green-400">
                ✓ Running tests...
              </div>
              <div className="text-blue-400">
                🚀 App deployed to: https://your-todo-app.vercel.app
              </div>
            </div>
          </div>
          
          {/* Floating Code Icons */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center animate-float">
            <Code className="w-4 h-4 text-white" />
          </div>
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
            <Zap className="w-4 h-4 text-white" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}