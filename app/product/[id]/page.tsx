'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { FiShoppingCart, FiHeart, FiMinus, FiPlus } from 'react-icons/fi'
import ProductCard from '@/components/ProductCard'
import { useCartStore } from '@/store/cartStore'
import { useLanguageStore } from '@/store/languageStore'
import { translations } from '@/lib/translations'

interface Product {
  _id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  price: number
  images: string[]
  category: string
  stock: number
  fragranceNotes?: {
    top: string[]
    heart: string[]
    base: string[]
  }
}

interface RelatedProduct {
  _id: string
  name: string
  nameAr: string
  price: number
  images: string[]
  category: string
  stock: number
}

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([])
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const { addItem, toggleFavorite, favorites } = useCartStore()
  const { language } = useLanguageStore()
  const t = translations[language]
  const [mounted, setMounted] = useState(false)
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
  const productId = params.id as string

  useEffect(() => {
    setMounted(true)
    fetch(`${API_URL}/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching product:', err)
        setLoading(false)
      })

    fetch(`${API_URL}/api/products/${productId}/related`)
      .then((res) => res.json())
      .then((data) => setRelatedProducts(data))
      .catch((err) => console.error('Error fetching related products:', err))
  }, [productId, API_URL])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white/70 text-xl">Loading...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white/70 text-xl">Product not found</div>
      </div>
    )
  }

  const isFavorite = mounted && favorites.includes(product._id)

  const handleAddToCart = () => {
    addItem({
      productId: product._id,
      name: language === 'fr' ? product.name : product.nameAr,
      price: product.price,
      quantity,
      image: product.images[0] || '/placeholder-perfume.jpg',
    })
  }

  return (
    <div className="min-h-screen py-12 px-4 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-crystal-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            <div className="relative h-[500px] mb-6 glass-card rounded-3xl overflow-hidden reflective">
              <Image
                src={product.images[selectedImage] || '/placeholder-perfume.jpg'}
                alt={language === 'fr' ? product.name : product.nameAr}
                fill
                className="object-cover"
              />
              {/* Gold light reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gold-500/10 to-transparent"></div>
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-24 glass-card rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-gold-400 scale-105 glow-gold' 
                        : 'border-gold-500/30 hover:border-gold-500/50'
                    }`}
                  >
                    <Image src={image} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">The Essence</span>
            <h1 className="text-5xl font-bold mb-4 gradient-gold font-display mt-2">
              {language === 'fr' ? product.name : product.nameAr}
            </h1>
            <p className="text-3xl font-bold bg-gradient-to-r from-gold-400 to-crystal-400 bg-clip-text text-transparent mb-8 font-display">
              ${product.price} DT
            </p>
            
            <div className="mb-8 glass-card rounded-2xl p-6">
              <p className="text-white/80 leading-relaxed text-lg">
                {language === 'fr' ? product.description : product.descriptionAr}
              </p>
            </div>

            {product.fragranceNotes && (
              <div className="mb-8 glass-card rounded-2xl p-6">
                <h3 className="font-semibold text-xl mb-4 text-gold-400 font-display">{t.product.fragranceNotes}</h3>
                <div className="space-y-3">
                  {product.fragranceNotes.top.length > 0 && (
                    <div className="border-l-2 border-crystal-400 pl-4">
                      <span className="font-medium text-crystal-300">{t.product.top}:</span>
                      <p className="text-white/70 mt-1">{product.fragranceNotes.top.join(', ')}</p>
                    </div>
                  )}
                  {product.fragranceNotes.heart.length > 0 && (
                    <div className="border-l-2 border-emerald-400 pl-4">
                      <span className="font-medium text-emerald-300">{t.product.heart}:</span>
                      <p className="text-white/70 mt-1">{product.fragranceNotes.heart.join(', ')}</p>
                    </div>
                  )}
                  {product.fragranceNotes.base.length > 0 && (
                    <div className="border-l-2 border-gold-400 pl-4">
                      <span className="font-medium text-gold-300">{t.product.base}:</span>
                      <p className="text-white/70 mt-1">{product.fragranceNotes.base.join(', ')}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <label className="font-medium text-gold-400 font-display">{language === 'fr' ? 'Quantité' : 'الكمية'}:</label>
                <div className="glass rounded-xl p-1 flex items-center gap-2 border border-gold-500/30">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 flex items-center justify-center transition-all"
                  >
                    <FiMinus />
                  </button>
                  <span className="px-6 text-white font-semibold min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 flex items-center justify-center transition-all"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative bg-gradient-to-r from-gold-500 to-gold-600 text-black px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 font-semibold glow-gold">
                    <FiShoppingCart className="text-xl" />
                    {t.product.addToCart}
                  </div>
                </button>
                <button
                  onClick={() => toggleFavorite(product._id)}
                  className={`p-4 glass-strong rounded-xl hover:scale-110 transition-all ${
                    mounted && isFavorite ? 'ring-2 ring-gold-400 glow-gold' : ''
                  }`}
                >
                  <FiHeart className={`text-xl ${mounted && isFavorite ? 'text-gold-400 fill-gold-400' : 'text-white'}`} />
                </button>
              </div>
            </div>

            {product.stock === 0 && (
              <div className="glass-card p-4 rounded-xl border border-red-500/50">
                <p className="text-red-400 font-medium">{t.product.outOfStock}</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="mb-8">
              <span className="text-crystal-400 text-sm font-semibold tracking-widest uppercase">Discover More</span>
              <h2 className="text-4xl font-bold mt-2 gradient-gold font-display">
                {language === 'fr' ? 'Produits similaires' : 'منتجات مشابهة'}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct._id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
