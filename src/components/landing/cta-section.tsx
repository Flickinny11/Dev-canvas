'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Rocket, Star } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="relative z-20 py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl" />
          
          <div className="relative glass rounded-3xl p-12 border border-primary-500/30">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-400 to-purple-500 rounded-2xl flex items-center justify-center animate-glow">
                <Rocket className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to <span className="gradient-text">Experience</span> the Future?
            </h2>
            
            <p className="text-xl text-dark-400 mb-8 leading-relaxed">
              Join thousands of developers who are already building production-ready applications 
              with natural language. No credit card required.
            </p>
            
            {/* Feature Highlights */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                '✨ Instant Setup',
                '🚀 Production Ready',
                '💡 No Placeholders',
                '🔒 Secure by Default'
              ].map((feature, index) => (
                <div
                  key={index}
                  className="glass rounded-full px-4 py-2 text-sm text-primary-300 border border-primary-500/20"
                >
                  {feature}
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button variant="primary" size="xl" asChild>
                <Link href="/auth/signup">
                  Start Building for Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              
              <Button variant="outline" size="xl" asChild>
                <Link href="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
            
            {/* Social Proof */}
            <div className="flex items-center justify-center space-x-2 text-sm text-dark-400">
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span>Loved by 10,000+ developers</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}