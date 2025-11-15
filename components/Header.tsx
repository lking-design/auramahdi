'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FiShoppingCart, FiMenu, FiX, FiStar, FiUser, FiLogOut } from 'react-icons/fi'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'

export default function Header() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { items } = useCartStore()
  const { user, isAuthenticated, logout, checkAuth } = useAuthStore()

  const cartCount = mounted ? items.reduce((sum, item) => sum + item.quantity, 0) : 0

  useEffect(() => {
    setMounted(true)
    checkAuth()
  }, [checkAuth])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <header className="glass sticky top-0 z-50 backdrop-blur-lg border-b border-gold-500/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-lg bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center overflow-hidden reflective">
              <FiStar className="text-white text-xl z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent"></div>
            </div>
            <span className="text-2xl font-bold gradient-gold font-display">AuraScent</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-white/90 hover:text-gold-400 transition-all duration-300 font-medium relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/builder" className="text-white/90 hover:text-gold-400 transition-all duration-300 font-medium relative group">
              Create Perfume
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/offers" className="text-white/90 hover:text-gold-400 transition-all duration-300 font-medium relative group">
              Special Offers
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Cart & Auth */}
          <div className="flex items-center gap-4">
            {mounted && isAuthenticated ? (
              <>
                <Link href="/profile" className="glass-strong p-3 rounded-xl hover:scale-110 transition-all duration-300">
                  <FiUser className="text-xl text-gold-400" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="glass-strong p-3 rounded-xl hover:scale-110 transition-all duration-300"
                  title="Logout"
                >
                  <FiLogOut className="text-xl text-gold-400" />
                </button>
              </>
            ) : mounted ? (
              <Link href="/login" className="glass-strong px-4 py-2 rounded-xl hover:scale-110 transition-all duration-300 text-gold-400 font-medium">
                Login
              </Link>
            ) : (
              <div className="glass-strong px-4 py-2 rounded-xl text-gold-400 font-medium opacity-0">
                Login
              </div>
            )}
            <Link href="/cart" className="relative group">
              <div className="glass-strong p-3 rounded-xl hover:scale-110 transition-all duration-300 relative overflow-hidden">
                <FiShoppingCart className="text-2xl text-gold-400 group-hover:text-gold-300 transition-colors" />
                {mounted && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-gold-500 to-gold-600 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold glow-gold">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden glass-strong p-2 rounded-lg text-gold-400"
            >
              {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gold-500/20 pt-4 space-y-4 animate-fade-in">
            <Link href="/" className="block py-2 text-white/90 hover:text-gold-400 transition-colors">
              Home
            </Link>
            <Link href="/builder" className="block py-2 text-white/90 hover:text-gold-400 transition-colors">
              Create Perfume
            </Link>
            <Link href="/offers" className="block py-2 text-white/90 hover:text-gold-400 transition-colors">
              Special Offers
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
