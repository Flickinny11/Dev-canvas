'use client'

import { motion } from 'framer-motion'
import { Brain, Code, Zap, Sparkles, Target, Rocket, Globe, Shield } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI Orchestration',
    description: 'Advanced AI models work together to understand your requirements and generate production-ready code with zero placeholders.',
    color: 'from-blue-500 to-purple-600'
  },
  {
    icon: Code,
    title: 'Natural Language to Code',
    description: 'Simply describe what you want in plain English. No need to specify frameworks, databases, or technical details.',
    color: 'from-green-500 to-blue-600'
  },
  {
    icon: Zap,
    title: 'Instant Deployment',
    description: 'Your applications are automatically deployed to your preferred platform with full CI/CD pipelines configured.',
    color: 'from-yellow-500 to-red-600'
  },
  {
    icon: Target,
    title: 'Highlight to Implement',
    description: 'Expert mode allows you to highlight any UI element and request features in natural language.',
    color: 'from-purple-500 to-pink-600'
  },
  {
    icon: Globe,
    title: 'Multi-Platform Ready',
    description: 'Deploy to web, iOS, Android, desktop, or any platform. The AI determines the best approach for each target.',
    color: 'from-indigo-500 to-blue-600'
  },
  {
    icon: Shield,
    title: 'Production Security',
    description: 'Built-in authentication, payment processing, monitoring, and security best practices from day one.',
    color: 'from-red-500 to-orange-600'
  }
]

export function FeaturesSection() {
  return (
    <section className="relative z-20 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Revolutionary</span> Features
          </h2>
          <p className="text-xl text-dark-400 max-w-3xl mx-auto">
            Experience the future of development with features that eliminate the gap between idea and production.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="glass rounded-2xl p-8 border border-dark-200 hover:border-primary-500/50 transition-all duration-300 h-full group-hover:transform group-hover:scale-105">
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:animate-glow`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-primary-300 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-dark-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '100%', label: 'Production Ready' },
            { value: '0', label: 'Placeholders' },
            { value: '∞', label: 'Possibilities' },
            { value: '1st', label: 'Try Success' }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-6xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-dark-400 text-sm uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}