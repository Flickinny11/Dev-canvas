'use client'

import { motion } from 'framer-motion'
import { Sparkles, Code, Zap, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const modes = [
  {
    level: 'Beginner',
    title: 'Natural Language Mode',
    description: 'Simply describe your app idea in plain English. No technical knowledge required.',
    features: [
      'Conversational interface',
      'Automatic tech stack selection',
      'Guided project creation',
      'Built-in tutorials',
      'One-click deployment'
    ],
    gradient: 'from-green-400 to-blue-500',
    icon: Sparkles
  },
  {
    level: 'Intermediate',
    title: 'Assisted Development',
    description: 'Balance AI assistance with hands-on coding. Perfect for growing developers.',
    features: [
      'Code suggestions',
      'Architecture guidance',
      'Best practice enforcement',
      'Interactive debugging',
      'Performance optimization'
    ],
    gradient: 'from-blue-400 to-purple-500',
    icon: Code
  },
  {
    level: 'Expert',
    title: 'Pro Development',
    description: 'Full-featured IDE with highlight-to-implement and advanced AI orchestration.',
    features: [
      'Highlight-to-implement',
      'Advanced code generation',
      'Custom AI workflows',
      'Enterprise integrations',
      'Team collaboration'
    ],
    gradient: 'from-purple-400 to-pink-500',
    icon: Zap
  }
]

export function ExperienceModesSection() {
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
            Three <span className="gradient-text">Experience</span> Modes
          </h2>
          <p className="text-xl text-dark-400 max-w-3xl mx-auto">
            Choose your perfect development experience. From natural language to expert-level control.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {modes.map((mode, index) => (
            <motion.div
              key={mode.level}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="glass rounded-3xl p-8 border border-dark-200 hover:border-primary-500/50 transition-all duration-500 h-full group-hover:transform group-hover:scale-105 relative overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${mode.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r ${mode.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:animate-glow relative z-10`}>
                  <mode.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Level Badge */}
                <div className={`inline-block bg-gradient-to-r ${mode.gradient} text-white px-3 py-1 rounded-full text-sm font-medium mb-4 relative z-10`}>
                  {mode.level}
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary-300 transition-colors">
                    {mode.title}
                  </h3>
                  
                  <p className="text-dark-400 mb-6 leading-relaxed">
                    {mode.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {mode.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 bg-gradient-to-r ${mode.gradient} rounded-full`} />
                        <span className="text-dark-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full group-hover:border-primary-500 group-hover:text-primary-400 transition-all"
                    asChild
                  >
                    <Link href={`/experience/${mode.level.toLowerCase()}`}>
                      Try {mode.level} Mode
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mode Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="glass rounded-2xl p-8 border border-primary-500/20">
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              Not sure which mode is right for you?
            </h3>
            <p className="text-dark-400 mb-6">
              Start with any mode and switch seamlessly as your skills grow. The Experience adapts to you.
            </p>
            <Button variant="primary" size="lg" asChild>
              <Link href="/experience/assessment">
                Take Assessment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}