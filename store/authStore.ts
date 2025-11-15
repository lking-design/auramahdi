import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: string
  address?: {
    street?: string
    city?: string
    zipCode?: string
  }
}

interface AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export const useAuthStore = create<AuthStore>()((set, get) => {
  // Always start with empty state (same on server and client)
  const initialState = { token: null, user: null, isAuthenticated: false }

  // Load from localStorage after store is created (client-side only)
  if (typeof window !== 'undefined') {
    const storedToken = localStorage.getItem('parfumex-token')
    const storedUser = localStorage.getItem('parfumex-user')
    if (storedToken && storedUser) {
      try {
        set({
          token: storedToken,
          user: JSON.parse(storedUser),
          isAuthenticated: true,
        })
      } catch (e) {
        console.error('Failed to load auth from localStorage', e)
      }
    }
  }

  return {
    user: initialState.user,
    token: initialState.token,
    isAuthenticated: initialState.isAuthenticated,
    loading: false,

    login: async (email: string, password: string) => {
      set({ loading: true })
      try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }).catch((err) => {
          throw new Error(`Cannot connect to server. Make sure the backend is running on ${API_URL}`)
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Login failed')
        }

        const data = await response.json()
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('parfumex-token', data.token)
          localStorage.setItem('parfumex-user', JSON.stringify(data.user))
        }

        set({
          user: data.user,
          token: data.token,
          isAuthenticated: true,
          loading: false,
        })
      } catch (error: any) {
        set({ loading: false })
        throw error
      }
    },

    register: async (name: string, email: string, password: string, phone?: string) => {
      set({ loading: true })
      try {
        const response = await fetch(`${API_URL}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, phone }),
        }).catch((err) => {
          throw new Error(`Cannot connect to server. Make sure the backend is running on ${API_URL}`)
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Registration failed')
        }

        const data = await response.json()
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('parfumex-token', data.token)
          localStorage.setItem('parfumex-user', JSON.stringify(data.user))
        }

        set({
          user: data.user,
          token: data.token,
          isAuthenticated: true,
          loading: false,
        })
      } catch (error: any) {
        set({ loading: false })
        throw error
      }
    },

    logout: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('parfumex-token')
        localStorage.removeItem('parfumex-user')
      }
      set({
        user: null,
        token: null,
        isAuthenticated: false,
      })
    },

    checkAuth: async () => {
      const { token } = get()
      if (!token) return

      try {
        const response = await fetch(`${API_URL}/api/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          set({
            user: data.user,
            isAuthenticated: true,
          })
          if (typeof window !== 'undefined') {
            localStorage.setItem('parfumex-user', JSON.stringify(data.user))
          }
        } else {
          // Token invalid, logout
          get().logout()
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        get().logout()
      }
    },

    updateProfile: async (data: Partial<User>) => {
      const { token } = get()
      if (!token) throw new Error('Not authenticated')

      try {
        const response = await fetch(`${API_URL}/api/auth/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Update failed')
        }

        const updated = await response.json()
        set({ user: updated.user })
        if (typeof window !== 'undefined') {
          localStorage.setItem('parfumex-user', JSON.stringify(updated.user))
        }
      } catch (error: any) {
        throw error
      }
    },
  }
})
