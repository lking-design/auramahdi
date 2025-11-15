'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'
import { useLanguageStore } from '@/store/languageStore'

export default function RegisterPage() {
  const router = useRouter()
  const { register, isAuthenticated } = useAuthStore()
  const { language } = useLanguageStore()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError(language === 'fr' ? 'Les mots de passe ne correspondent pas' : 'كلمات المرور غير متطابقة')
      return
    }

    if (formData.password.length < 6) {
      setError(language === 'fr' ? 'Le mot de passe doit contenir au moins 6 caractères' : 'كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل')
      return
    }

    setLoading(true)

    try {
      await register(formData.name, formData.email, formData.password, formData.phone)
      router.push('/')
    } catch (err: any) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const t = {
    fr: {
      title: 'Créer un compte',
      name: 'Nom complet',
      email: 'Email',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      phone: 'Téléphone (optionnel)',
      register: "S'inscrire",
      haveAccount: 'Vous avez déjà un compte ?',
      login: 'Se connecter',
      error: 'Erreur lors de l\'inscription',
    },
    ar: {
      title: 'إنشاء حساب',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      phone: 'الهاتف (اختياري)',
      register: 'إنشاء حساب',
      haveAccount: 'لديك حساب بالفعل؟',
      login: 'تسجيل الدخول',
      error: 'خطأ في التسجيل',
    },
  }[language]

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-md">
        <div className="glass-strong p-8 rounded-2xl shadow-2xl">
          <h1 className="text-3xl font-bold text-center mb-8 gradient-gold">
            {t.title}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                {t.name}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                {t.email}
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                {t.phone}
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                placeholder="+1234567890"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                {t.password}
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                {t.confirmPassword}
              </label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold hover:from-gold-400 hover:to-gold-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '...' : t.register}
            </button>
          </form>

          <p className="mt-6 text-center text-white/70">
            {t.haveAccount}{' '}
            <Link href="/login" className="text-gold-400 hover:text-gold-300 font-semibold">
              {t.login}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}





