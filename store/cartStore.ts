import { create } from 'zustand'

interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

interface CartStore {
  items: CartItem[]
  favorites: string[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  toggleFavorite: (productId: string) => void
}

// Always return empty initial state to prevent hydration mismatch
// Data will be loaded after mount
const getInitialState = () => {
  return { items: [], favorites: [] }
}

export const useCartStore = create<CartStore>()((set, get) => {
  // Initialize with empty state (same on server and client)
  const initialState = getInitialState()

  // Load from localStorage after store is created (client-side only)
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('parfumex-cart')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        set({
          items: parsed.items || [],
          favorites: parsed.favorites || [],
        })
      } catch (e) {
        console.error('Failed to load cart from localStorage', e)
      }
    }
  }

  return {
    items: initialState.items,
    favorites: initialState.favorites,
    
    addItem: (item) => {
      const items = get().items
      const existingItem = items.find((i) => i.productId === item.productId)
      
      let newItems
      if (existingItem) {
        newItems = items.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      } else {
        newItems = [...items, item]
      }
      
      set({ items: newItems })
      if (typeof window !== 'undefined') {
        localStorage.setItem('parfumex-cart', JSON.stringify({ items: newItems, favorites: get().favorites }))
      }
    },
    
    removeItem: (productId) => {
      const newItems = get().items.filter((i) => i.productId !== productId)
      set({ items: newItems })
      if (typeof window !== 'undefined') {
        localStorage.setItem('parfumex-cart', JSON.stringify({ items: newItems, favorites: get().favorites }))
      }
    },
    
    updateQuantity: (productId, quantity) => {
      if (quantity <= 0) {
        get().removeItem(productId)
      } else {
        const newItems = get().items.map((i) =>
          i.productId === productId ? { ...i, quantity } : i
        )
        set({ items: newItems })
        if (typeof window !== 'undefined') {
          localStorage.setItem('parfumex-cart', JSON.stringify({ items: newItems, favorites: get().favorites }))
        }
      }
    },
    
    clearCart: () => {
      set({ items: [] })
      if (typeof window !== 'undefined') {
        localStorage.setItem('parfumex-cart', JSON.stringify({ items: [], favorites: get().favorites }))
      }
    },
    
    getTotal: () => {
      return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
    },
    
    toggleFavorite: (productId) => {
      const favorites = get().favorites
      const newFavorites = favorites.includes(productId)
        ? favorites.filter((id) => id !== productId)
        : [...favorites, productId]
      set({ favorites: newFavorites })
      if (typeof window !== 'undefined') {
        localStorage.setItem('parfumex-cart', JSON.stringify({ items: get().items, favorites: newFavorites }))
      }
    },
  }
})

