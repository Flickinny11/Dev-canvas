import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// Import the users array (in production, use a shared database)
let users: any[] = []

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'No token provided' },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key-2024') as any
    
    const user = users.find(u => u.id === decoded.userId)
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error('Auth verification error:', error)
    return NextResponse.json(
      { message: 'Invalid token' },
      { status: 401 }
    )
  }
}