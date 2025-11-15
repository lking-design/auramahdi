'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { FiCheck } from 'react-icons/fi'
import { useCartStore } from '@/store/cartStore'
import { useLanguageStore } from '@/store/languageStore'
import { useAuthStore } from '@/store/authStore'
import { translations } from '@/lib/translations'

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore()
  const { language } = useLanguageStore()
  const { user, token } = useAuthStore()
  const router = useRouter()
  const t = translations[language]
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    phone: '',
    paymentMethod: 'cash-on-delivery',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Update form data when user loads
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        address: user.address?.street || prev.address,
        city: user.address?.city || prev.city,
        phone: user.phone || prev.phone,
      }))
    }
  }, [user])

  const subtotal = getTotal()
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal + shipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (items.length === 0) {
      setError(language === 'fr' ? 'Votre panier est vide' : 'سلة التسوق فارغة')
      setLoading(false)
      return
    }

    try {
      const orderData = {
        customer: {
          name: formData.name,
          address: formData.address,
          city: formData.city,
          phone: formData.phone,
          email: user?.email || '',
        },
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          name: item.name,
          price: item.price,
          image: item.image,
        })),
        paymentMethod: formData.paymentMethod,
      }

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers,
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to create order' }))
        console.error('Order API error:', errorData)
        throw new Error(errorData.error || 'Failed to create order')
      }

      const order = await response.json()
      clearCart()
      router.push(`/order-success?orderNumber=${order.orderNumber}`)
    } catch (err: any) {
      const errorMessage = err.message || (language === 'fr' ? 'Une erreur est survenue' : 'حدث خطأ')
      setError(errorMessage)
      console.error('Order error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-strong rounded-3xl p-12 text-center max-w-2xl">
          <h1 className="text-4xl font-bold mb-4 gradient-gold font-display">{t.checkout.title}</h1>
          <p className="text-white/70 mb-8 text-lg">
            {language === 'fr' ? 'Votre panier est vide' : 'سلة التسوق فارغة'}
          </p>
          <Link
            href="/builder"
            className="relative group inline-block"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <button className="relative bg-gradient-to-r from-gold-500 to-gold-600 text-black px-8 py-4 rounded-xl font-semibold hover:scale-110 transition-all duration-300 glow-gold">
              {t.hero.shopNow}
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
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-crystal-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">Complete Your Order</span>
          <h1 className="text-5xl font-bold mt-4 gradient-gold font-display">{t.checkout.title}</h1>
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="glass-strong rounded-3xl p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-crystal-500/5"></div>
              <div className="relative z-10">
                {error && (
                  <div className="mb-6 p-4 glass border border-red-500/50 text-red-400 rounded-xl">
                    {error}
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <label className="block font-semibold mb-3 text-gold-400 font-display">{t.checkout.name}</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400 text-white placeholder-white/50"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-3 text-gold-400 font-display">{t.checkout.address}</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400 text-white placeholder-white/50"
                      placeholder="Enter your address"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-3 text-gold-400 font-display">{t.checkout.city}</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400 text-white placeholder-white/50"
                      placeholder="Enter your city"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-3 text-gold-400 font-display">{t.checkout.phone}</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400 text-white placeholder-white/50"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-4 text-gold-400 font-display">{t.checkout.paymentMethod}</label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer glass-card p-4 rounded-xl hover:ring-2 hover:ring-gold-400/50 transition-all">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash-on-delivery"
                          checked={formData.paymentMethod === 'cash-on-delivery'}
                          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                          className="w-5 h-5 text-gold-400 accent-gold-400"
                        />
                        <span className="text-white">{t.checkout.cashOnDelivery}</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer glass-card p-4 rounded-xl hover:ring-2 hover:ring-gold-400/50 transition-all">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === 'card'}
                          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                          className="w-5 h-5 text-gold-400 accent-gold-400"
                        />
                        <span className="text-white">{t.checkout.card}</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <div className="relative bg-gradient-to-r from-gold-500 to-gold-600 text-black px-6 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 glow-gold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2">
                      {loading ? (language === 'fr' ? 'Traitement...' : 'جاري المعالجة...') : t.checkout.confirmOrder}
                      {!loading && <FiCheck />}
                    </div>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-strong rounded-3xl p-8 sticky top-24 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-crystal-500/5 to-emerald-500/5"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-6 text-white font-display flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center">
                    <FiCheck className="text-black text-sm" />
                  </div>
                  {t.checkout.orderSummary}
                </h2>
                
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.productId} className="flex gap-4 glass-card p-3 rounded-xl">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-gold-500/30">
                        <Image
                          src={item.image || '/placeholder-perfume.jpg'}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-white">{item.name}</p>
                        <p className="text-gold-400 text-sm">
                          {item.quantity} x ${item.price} DT
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gold-500/20 pt-4 space-y-3">
                  <div className="flex justify-between text-white/80">
                    <span>{t.checkout.subtotal}</span>
                    <span className="font-semibold text-white">${subtotal.toFixed(2)} DT</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>{t.checkout.shipping}</span>
                    <span className="font-semibold text-white">
                      {shipping === 0 ? (
                        <span className="text-emerald-400">{t.checkout.freeShipping}</span>
                      ) : (
                        `$${shipping.toFixed(2)} DT`
                      )}
                    </span>
                  </div>
                  <div className="border-t border-gold-500/20 pt-4 flex justify-between">
                    <span className="text-xl font-bold text-white font-display">{t.checkout.total}</span>
                    <span className="text-2xl font-bold gradient-gold font-display">${total.toFixed(2)} DT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
