'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useLanguageStore } from '@/store/languageStore'

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, updateProfile, checkAuth } = useAuthStore()
  const { language } = useLanguageStore()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    zipCode: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      checkAuth().then(() => {
        if (!isAuthenticated) {
          router.push('/login')
        }
      })
    }
  }, [isAuthenticated, checkAuth, router])

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        street: user.address?.street || '',
        city: user.address?.city || '',
        zipCode: user.address?.zipCode || '',
      })
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      await updateProfile({
        name: formData.name,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          zipCode: formData.zipCode,
        },
      })
      setMessage(language === 'fr' ? 'Profil mis à jour avec succès' : 'تم تحديث الملف الشخصي بنجاح')
    } catch (error: any) {
      setMessage(error.message || 'Error updating profile')
    } finally {
      setLoading(false)
    }
  }

  const t = {
    fr: {
      title: 'Mon Profil',
      name: 'Nom',
      phone: 'Téléphone',
      address: 'Adresse',
      street: 'Rue',
      city: 'Ville',
      zipCode: 'Code postal',
      update: 'Mettre à jour',
      success: 'Profil mis à jour',
    },
    ar: {
      title: 'ملفي الشخصي',
      name: 'الاسم',
      phone: 'الهاتف',
      address: 'العنوان',
      street: 'الشارع',
      city: 'المدينة',
      zipCode: 'الرمز البريدي',
      update: 'تحديث',
      success: 'تم تحديث الملف الشخصي',
    },
  }[language]

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 gradient-gold text-center">{t.title}</h1>

        <div className="glass-strong p-8 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {message && (
              <div className={`px-4 py-3 rounded-lg ${
                message.includes('succès') || message.includes('نجاح')
                  ? 'bg-green-500/20 border border-green-500 text-green-200'
                  : 'bg-red-500/20 border border-red-500 text-red-200'
              }`}>
                {message}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">{t.name}</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">{t.phone}</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">{t.street}</label>
              <input
                type="text"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">{t.city}</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">{t.zipCode}</label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold hover:from-gold-400 hover:to-gold-500 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? '...' : t.update}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
