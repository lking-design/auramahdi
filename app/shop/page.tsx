'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import { useLanguageStore } from '@/store/languageStore'
import { translations } from '@/lib/translations'

interface Product {
  _id: string
  name: string
  nameAr: string
  price: number
  images: string[]
  category: string
  stock: number
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const searchParams = useSearchParams()
  const router = useRouter()
  const { language } = useLanguageStore()
  const t = translations[language]
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

  useEffect(() => {
    const category = searchParams.get('category') || 'all'
    setSelectedCategory(category)
    
    const url = category === 'all' 
      ? `${API_URL}/api/products`
      : `${API_URL}/api/products?category=${category}`
    
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching products:', err)
        setLoading(false)
      })
  }, [searchParams, API_URL])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    if (category === 'all') {
      router.push('/shop')
    } else {
      router.push(`/shop?category=${category}`)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-crystal-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">Our Collection</span>
          <h1 className="text-5xl font-bold mt-4 gradient-gold font-display">{t.nav.shop}</h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-6 py-3 rounded-xl transition-all duration-300 font-semibold ${
              selectedCategory === 'all' 
                ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-black glow-gold' 
                : 'glass text-white/90 hover:text-gold-400 hover:ring-1 hover:ring-gold-400/50'
            }`}
          >
            {language === 'fr' ? 'Tous' : 'الكل'}
          </button>
          <button
            onClick={() => handleCategoryChange('perfume')}
            className={`px-6 py-3 rounded-xl transition-all duration-300 font-semibold ${
              selectedCategory === 'perfume' 
                ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-black glow-gold' 
                : 'glass text-white/90 hover:text-gold-400 hover:ring-1 hover:ring-gold-400/50'
            }`}
          >
            {t.categories.perfumes}
          </button>
          <button
            onClick={() => handleCategoryChange('gift-box')}
            className={`px-6 py-3 rounded-xl transition-all duration-300 font-semibold ${
              selectedCategory === 'gift-box' 
                ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-black glow-gold' 
                : 'glass text-white/90 hover:text-gold-400 hover:ring-1 hover:ring-gold-400/50'
            }`}
          >
            {t.categories.giftBoxes}
          </button>
          <button
            onClick={() => handleCategoryChange('accessory')}
            className={`px-6 py-3 rounded-xl transition-all duration-300 font-semibold ${
              selectedCategory === 'accessory' 
                ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-black glow-gold' 
                : 'glass text-white/90 hover:text-gold-400 hover:ring-1 hover:ring-gold-400/50'
            }`}
          >
            {t.categories.accessories}
          </button>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block glass-card px-8 py-4 rounded-xl">
              <p className="text-white/70">Loading...</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <div className="glass-card rounded-3xl p-12 max-w-md mx-auto">
              <p className="text-white/70 text-lg">{language === 'fr' ? 'Aucun produit trouvé' : 'لم يتم العثور على منتجات'}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
