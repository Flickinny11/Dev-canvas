import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import jwt from 'jsonwebtoken'

const generateSchema = z.object({
  prompt: z.string().min(1),
  mode: z.enum(['beginner', 'intermediate', 'expert']),
  model: z.string().optional().default('anthropic/claude-3.5-sonnet')
})

// Mock OpenRouter integration
async function callOpenRouter(prompt: string, model: string) {
  // In production, this would make an actual API call to OpenRouter
  // For now, we'll simulate the response
  
  const systemPrompts = {
    beginner: `You are an expert AI coding assistant specialized in creating production-ready applications for beginners. 
    Generate complete, functional code with no placeholders, no mock data, and no "TODO" comments. 
    Include all necessary imports, error handling, and best practices. 
    The code must be ready to run immediately without any modifications.`,
    
    intermediate: `You are an expert AI coding assistant for intermediate developers. 
    Generate complete, production-ready code with advanced patterns and optimizations. 
    Include comprehensive error handling, testing considerations, and performance optimizations. 
    No placeholders or mock data - everything must be fully functional.`,
    
    expert: `You are an expert AI coding assistant for expert developers. 
    Generate enterprise-grade, production-ready code with advanced architecture patterns. 
    Include complex state management, advanced optimizations, security considerations, and scalability features. 
    Absolutely no placeholders - deliver complete, deployable solutions.`
  }

  // Simulate AI response generation
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Generate a realistic code response based on the prompt
  const codeResponse = generateCodeBasedOnPrompt(prompt)
  
  return {
    code: codeResponse,
    tokens: Math.floor(Math.random() * 1000) + 500,
    cost: Math.random() * 0.05 + 0.01
  }
}

function generateCodeBasedOnPrompt(prompt: string): string {
  // This is a simplified code generator - in production, this would use actual AI
  const lowercasePrompt = prompt.toLowerCase()
  
  if (lowercasePrompt.includes('todo') || lowercasePrompt.includes('task')) {
    return `import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Check } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date()
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Todo App</h1>
      
      <div className="flex mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Plus size={20} />
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={\`flex items-center justify-between p-3 border rounded-md \${
              todo.completed ? 'bg-gray-50 opacity-75' : 'bg-white'
            }\`}
          >
            <div className="flex items-center">
              <button
                onClick={() => toggleTodo(todo.id)}
                className={\`mr-3 \${
                  todo.completed
                    ? 'text-green-500'
                    : 'text-gray-400 hover:text-green-500'
                }\`}
              >
                <Check size={20} />
              </button>
              <span
                className={\`\${
                  todo.completed
                    ? 'line-through text-gray-500'
                    : 'text-gray-800'
                }\`}
              >
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="text-gray-500 text-center mt-4">No todos yet. Add one above!</p>
      )}
    </div>
  );
}`
  }
  
  if (lowercasePrompt.includes('dashboard') || lowercasePrompt.includes('admin')) {
    return `import React, { useState, useEffect } from 'react';
import { BarChart3, Users, DollarSign, TrendingUp, Activity } from 'lucide-react';

interface DashboardData {
  totalUsers: number;
  revenue: number;
  activeProjects: number;
  growthRate: number;
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData>({
    totalUsers: 0,
    revenue: 0,
    activeProjects: 0,
    growthRate: 0
  });

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      // In a real app, this would be an actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData({
        totalUsers: 12543,
        revenue: 87650,
        activeProjects: 34,
        growthRate: 23.5
      });
    };

    fetchData();
  }, []);

  const StatCard = ({ icon: Icon, title, value, change }: any) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="p-3 bg-blue-50 rounded-full">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      {change && (
        <div className="mt-4 flex items-center">
          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
          <span className="text-sm text-green-600">+{change}% from last month</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Total Users"
            value={data.totalUsers.toLocaleString()}
            change="12.3"
          />
          <StatCard
            icon={DollarSign}
            title="Revenue"
            value={\`$\${data.revenue.toLocaleString()}\`}
            change="8.7"
          />
          <StatCard
            icon={Activity}
            title="Active Projects"
            value={data.activeProjects}
            change="15.2"
          />
          <StatCard
            icon={BarChart3}
            title="Growth Rate"
            value={\`\${data.growthRate}%\`}
            change="23.5"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { action: "New user registered", time: "2 minutes ago" },
                { action: "Project deployed", time: "15 minutes ago" },
                { action: "Payment processed", time: "1 hour ago" },
                { action: "Code generated", time: "2 hours ago" }
              ].map((activity, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-700">{activity.action}</span>
                  <span className="text-gray-500 text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                Create New Project
              </button>
              <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors">
                Generate Code
              </button>
              <button className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition-colors">
                Deploy Application
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`
  }
  
  // Default code for any other prompt
  return `import React, { useState } from 'react';

export default function GeneratedComponent() {
  const [state, setState] = useState('');

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Generated Component
      </h1>
      <p className="text-gray-600 mb-4">
        This is a production-ready React component generated based on your prompt.
      </p>
      <input
        type="text"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="Enter text here..."
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p className="mt-2 text-sm text-gray-500">
        Current value: {state}
      </p>
    </div>
  );
}`;
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'No token provided' },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key-2024') as any

    const body = await request.json()
    const { prompt, mode, model } = generateSchema.parse(body)

    // Call AI service
    const result = await callOpenRouter(prompt, model)

    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid input', errors: error.errors },
        { status: 400 }
      )
    }

    console.error('Generate error:', error)
    return NextResponse.json(
      { message: 'Generation failed' },
      { status: 500 }
    )
  }
}