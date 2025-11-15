'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiCheck } from 'react-icons/fi'
import { useCartStore } from '@/store/cartStore'
import { useLanguageStore } from '@/store/languageStore'
import { translations } from '@/lib/translations'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()
  const { language } = useLanguageStore()
  const router = useRouter()
  const t = translations[language]
  const subtotal = getTotal()
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-crystal-500/5 rounded-full blur-3xl"></div>
        </div>
        <div className="glass-strong rounded-3xl p-12 text-center max-w-2xl relative z-10">
          <div className="w-24 h-24 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-6 glow-gold reflective">
            <FiShoppingBag className="text-white text-4xl" />
          </div>
          <h1 className="text-4xl font-bold mb-4 gradient-gold font-display">Your Cart is Empty</h1>
          <p className="text-white/70 mb-8 text-lg">
            {language === 'fr' ? 'Votre panier est vide' : 'سلة التسوق فارغة'}
          </p>
          <Link
            href="/builder"
            className="relative group inline-block"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <button className="relative bg-gradient-to-r from-gold-500 to-gold-600 text-black px-8 py-4 rounded-xl font-semibold hover:scale-110 transition-all duration-300 glow-gold">
              Start Creating Your Perfume
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">Your Selection</span>
          <h1 className="text-5xl font-bold mt-4 gradient-gold font-display">Shopping Cart</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={item.productId} className="glass-card rounded-3xl p-6 hover:scale-[1.02] transition-all duration-500 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="flex gap-6 relative z-10">
                  {/* Image */}
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-gold-500/30 reflective">
                    <Image
                      src={item.image || '/placeholder-perfume.jpg'}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gold-500/10 to-transparent"></div>
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 font-display">{item.name}</h3>
                    <p className="text-2xl font-bold bg-gradient-to-r from-gold-400 to-crystal-400 bg-clip-text text-transparent mb-4 font-display">
                      {item.price} DT 
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <div className="glass rounded-xl p-1 flex items-center gap-2 border border-gold-500/30">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-10 h-10 rounded-lg bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 flex items-center justify-center transition-all"
                        >
                          <FiMinus />
                        </button>
                        <span className="px-4 text-white font-semibold min-w-[3rem] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-10 h-10 rounded-lg bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 flex items-center justify-center transition-all"
                        >
                          <FiPlus />
                        </button>
                      </div>
                      
                      <p className="text-xl font-bold text-white font-display">
                        {(item.price * item.quantity).toFixed(2)} DT (fawah ya lhob  )
                      </p>
                      
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="ml-auto p-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all border border-red-500/30"
                      >
                        <FiTrash2 className="text-xl" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-strong rounded-3xl p-8 sticky top-24 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-crystal-500/5 to-emerald-500/5"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2 font-display">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center">
                    <FiCheck className="text-black text-sm" />
                  </div>
                  Order Summary 
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-gold-500/20">
                    <span className="text-white/80">Subtotal</span>
                    <span className="font-semibold text-white font-display">{subtotal.toFixed(2)} DT</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gold-500/20">
                    <span className="text-white/80">Shipping</span>
                    <span className="font-semibold text-white font-display">
                      {shipping === 0 ? (
                        <span className="text-emerald-400">Free</span>
                      ) : (
                        `${shipping.toFixed(2)} DT`
                      )}
                    </span>
                  </div>
                  <div className="pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-white font-display">Total</span>
                      <span className="text-2xl font-bold gradient-gold font-display">
                        {total.toFixed(2)} DT 
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative bg-gradient-to-r from-gold-500 to-gold-600 text-black px-6 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 glow-gold flex items-center justify-center gap-2">
                    Proceed to Checkout
                    <FiCheck />
                  </div>
                </button>

                {subtotal < 100 && (
                  <p className="mt-4 text-center text-gold-400 text-sm">
                    Add {(100 - subtotal).toFixed(2)} more for free shipping! 🚚
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
