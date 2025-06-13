'use client'

import { createContext, useContext, useState, useCallback } from 'react'

interface AIModel {
  id: string
  name: string
  provider: 'openrouter'
  maxTokens: number
  pricePerToken: number
}

interface AIRequest {
  id: string
  prompt: string
  model: string
  response?: string
  status: 'pending' | 'generating' | 'completed' | 'error'
  createdAt: Date
  tokens?: number
  cost?: number
}

interface AIContextType {
  models: AIModel[]
  requests: AIRequest[]
  generateCode: (prompt: string, mode: 'beginner' | 'intermediate' | 'expert') => Promise<string>
  orchestrateProject: (description: string) => Promise<any>
  implementFeature: (selection: string, feature: string) => Promise<string>
  deployProject: (projectId: string, platform: string) => Promise<any>
  isGenerating: boolean
}

const AIContext = createContext<AIContextType | undefined>(undefined)

export function useAI() {
  const context = useContext(AIContext)
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider')
  }
  return context
}

const availableModels: AIModel[] = [
  {
    id: 'anthropic/claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'openrouter',
    maxTokens: 200000,
    pricePerToken: 0.000003
  },
  {
    id: 'openai/gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'openrouter',
    maxTokens: 128000,
    pricePerToken: 0.00001
  },
  {
    id: 'google/gemini-pro-1.5',
    name: 'Gemini Pro 1.5',
    provider: 'openrouter',
    maxTokens: 1048576,
    pricePerToken: 0.000001
  }
]

export function AIProvider({ children }: { children: React.ReactNode }) {
  const [requests, setRequests] = useState<AIRequest[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const generateCode = useCallback(async (prompt: string, mode: 'beginner' | 'intermediate' | 'expert'): Promise<string> => {
    setIsGenerating(true)
    
    const requestId = Math.random().toString(36).substring(7)
    const newRequest: AIRequest = {
      id: requestId,
      prompt,
      model: 'anthropic/claude-3.5-sonnet',
      status: 'pending',
      createdAt: new Date()
    }
    
    setRequests(prev => [...prev, newRequest])

    try {
      // Update status to generating
      setRequests(prev => prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'generating' as const }
          : req
      ))

      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({
          prompt,
          mode,
          model: 'anthropic/claude-3.5-sonnet'
        })
      })

      if (!response.ok) {
        throw new Error('Generation failed')
      }

      const data = await response.json()
      
      // Update request with response
      setRequests(prev => prev.map(req => 
        req.id === requestId 
          ? { 
              ...req, 
              status: 'completed' as const,
              response: data.code,
              tokens: data.tokens,
              cost: data.cost
            }
          : req
      ))

      return data.code
    } catch (error) {
      // Update status to error
      setRequests(prev => prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'error' as const }
          : req
      ))
      throw error
    } finally {
      setIsGenerating(false)
    }
  }, [])

  const orchestrateProject = useCallback(async (description: string) => {
    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/ai/orchestrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({ description })
      })

      if (!response.ok) {
        throw new Error('Orchestration failed')
      }

      return await response.json()
    } catch (error) {
      throw error
    } finally {
      setIsGenerating(false)
    }
  }, [])

  const implementFeature = useCallback(async (selection: string, feature: string): Promise<string> => {
    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/ai/implement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({ selection, feature })
      })

      if (!response.ok) {
        throw new Error('Implementation failed')
      }

      const data = await response.json()
      return data.code
    } catch (error) {
      throw error
    } finally {
      setIsGenerating(false)
    }
  }, [])

  const deployProject = useCallback(async (projectId: string, platform: string) => {
    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/ai/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({ projectId, platform })
      })

      if (!response.ok) {
        throw new Error('Deployment failed')
      }

      return await response.json()
    } catch (error) {
      throw error
    } finally {
      setIsGenerating(false)
    }
  }, [])

  return (
    <AIContext.Provider
      value={{
        models: availableModels,
        requests,
        generateCode,
        orchestrateProject,
        implementFeature,
        deployProject,
        isGenerating,
      }}
    >
      {children}
    </AIContext.Provider>
  )
}