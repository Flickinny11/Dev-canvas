'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Code, 
  Sparkles, 
  Zap, 
  Settings, 
  User, 
  CreditCard,
  History,
  Play,
  Download,
  Share2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { useAI } from '@/lib/ai-context'

interface Project {
  id: string
  name: string
  description: string
  status: 'active' | 'deployed' | 'building'
  createdAt: Date
  lastModified: Date
  language: string
  platform: string
}

export default function DashboardPage() {
  const { user } = useAuth()
  const { generateCode, isGenerating } = useAI()
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Todo App',
      description: 'A production-ready todo application with user authentication',
      status: 'deployed',
      createdAt: new Date('2024-01-15'),
      lastModified: new Date('2024-01-20'),
      language: 'React',
      platform: 'Web'
    },
    {
      id: '2',
      name: 'E-commerce Dashboard',
      description: 'Admin dashboard for managing e-commerce operations',
      status: 'active',
      createdAt: new Date('2024-01-10'),
      lastModified: new Date('2024-01-22'),
      language: 'Next.js',
      platform: 'Web'
    }
  ])
  const [newProjectPrompt, setNewProjectPrompt] = useState('')

  const handleCreateProject = async () => {
    if (!newProjectPrompt.trim()) return

    try {
      const code = await generateCode(newProjectPrompt, user?.experienceMode || 'beginner')
      
      const newProject: Project = {
        id: Date.now().toString(),
        name: `Generated Project ${projects.length + 1}`,
        description: newProjectPrompt,
        status: 'active',
        createdAt: new Date(),
        lastModified: new Date(),
        language: 'React',
        platform: 'Web'
      }
      
      setProjects([newProject, ...projects])
      setNewProjectPrompt('')
    } catch (error) {
      console.error('Failed to create project:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed': return 'text-green-400 bg-green-400/10'
      case 'building': return 'text-yellow-400 bg-yellow-400/10'
      default: return 'text-blue-400 bg-blue-400/10'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-50 via-dark-100 to-dark-200 text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 glass">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-primary-400 to-purple-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">The Experience</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm text-dark-400">
            Credits: <span className="text-white font-semibold">{user?.credits || 0}</span>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-purple-500 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </nav>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, <span className="gradient-text">{user?.name}</span>
          </h1>
          <p className="text-dark-400 text-lg">
            Ready to build something amazing? Describe your idea and watch it come to life.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { icon: Code, label: 'Projects', value: projects.length, color: 'from-blue-400 to-purple-500' },
            { icon: Zap, label: 'Credits Used', value: (user?.credits || 100) - (user?.credits || 50), color: 'from-green-400 to-blue-500' },
            { icon: Download, label: 'Deployments', value: projects.filter(p => p.status === 'deployed').length, color: 'from-purple-400 to-pink-500' },
            { icon: History, label: 'This Month', value: projects.length, color: 'from-yellow-400 to-red-500' }
          ].map((stat, index) => (
            <div key={stat.label} className="glass rounded-xl p-6 border border-dark-200">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-dark-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Create New Project */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-8 border border-dark-200 mb-8"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Plus className="w-6 h-6 mr-2 text-primary-400" />
            Create New Project
          </h2>
          
          <div className="flex gap-4">
            <input
              type="text"
              value={newProjectPrompt}
              onChange={(e) => setNewProjectPrompt(e.target.value)}
              placeholder="Describe your app idea in natural language..."
              className="flex-1 px-4 py-3 bg-dark-100 border border-dark-300 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && !isGenerating && handleCreateProject()}
            />
            <Button 
              onClick={handleCreateProject}
              disabled={isGenerating || !newProjectPrompt.trim()}
              variant="primary"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <div className="spinner mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate
                </>
              )}
            </Button>
          </div>
          
          <div className="mt-4 text-sm text-dark-400">
            💡 Try: "Build a social media dashboard with analytics", "Create a task management app with teams", "Design an e-commerce product catalog"
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6">Your Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass rounded-xl p-6 border border-dark-200 hover:border-primary-500/50 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-primary-300 transition-colors">
                      {project.name}
                    </h3>
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${getStatusColor(project.status)}`}>
                      {project.status}
                    </div>
                  </div>
                  <div className="text-dark-400 text-sm">
                    {project.language}
                  </div>
                </div>
                
                <p className="text-dark-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-dark-500 mb-4">
                  <span>Created {project.createdAt.toLocaleDateString()}</span>
                  <span>{project.platform}</span>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Play className="w-3 h-3 mr-1" />
                    Open
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-3 h-3" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}