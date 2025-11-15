'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiHeart, FiShoppingCart, FiCheck } from 'react-icons/fi'
import { useCartStore } from '@/store/cartStore'
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

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, toggleFavorite, favorites } = useCartStore()
  const { language } = useLanguageStore()
  const t = translations[language]
  const [mounted, setMounted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isFavorite = mounted && favorites.includes(product._id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      productId: product._id,
      name: language === 'fr' ? product.name : product.nameAr,
      price: product.price,
      quantity: 1,
      image: product.images[0] || '/placeholder-perfume.jpg',
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <Link href={`/product/${product._id}`}>
      <div className="glass-card rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group relative overflow-hidden">
        {/* Gold light reflection overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-crystal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
        
        {/* Image */}
        <div className="relative h-64 bg-gradient-to-br from-gold-500/10 to-crystal-500/10">
          <Image
            src={product.images[0] || '/placeholder-perfume.jpg'}
            alt={language === 'fr' ? product.name : product.nameAr}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Gold reflection on image */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gold-500/5 to-transparent pointer-events-none"></div>
          
          {mounted && (
            <button
              onClick={(e) => {
                e.preventDefault()
                toggleFavorite(product._id)
              }}
              className="absolute top-4 right-4 p-3 glass-strong rounded-full hover:scale-110 transition-all z-10"
            >
              <FiHeart className={`text-xl ${isFavorite ? 'text-gold-400 fill-gold-400' : 'text-white'}`} />
            </button>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
              <span className="text-white font-semibold">{t.product.outOfStock}</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-6 relative z-10">
          <h3 className="font-bold text-xl mb-2 text-white font-display">
            {language === 'fr' ? product.name : product.nameAr}
          </h3>
          <p className="text-2xl font-bold bg-gradient-to-r from-gold-400 to-crystal-400 bg-clip-text text-transparent mb-4 font-display">
            {product.price} DT
          </p>
          
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || addedToCart}
              className={`flex-1 text-white px-4 py-3 rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 font-semibold shadow-lg relative group ${
                addedToCart 
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' 
                  : 'bg-gradient-to-r from-gold-500 to-gold-600'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
              <span className="relative z-10 flex items-center gap-2">
                {addedToCart ? (
                  <>
                    <FiCheck className="text-lg" />
                    Added!
                  </>
                ) : (
                  <>
                    <FiShoppingCart />
                    {t.product.addToCart}
                  </>
                )}
              </span>
            </button>
            <Link
              href={`/product/${product._id}`}
              className="px-4 py-3 glass rounded-xl hover:scale-105 transition-all duration-300 text-white font-semibold border border-gold-500/30 hover:border-gold-500/50"
            >
              {t.product.viewDetails}
            </Link>
          </div>
        </div>
      </div>
    </Link>
  )
}
