'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'
import { useLanguageStore } from '@/store/languageStore'

export default function LoginPage() {
  const router = useRouter()
  const { login, isAuthenticated } = useAuthStore()
  const { language } = useLanguageStore()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    setLoading(true)

    try {
      await login(formData.email, formData.password)
      router.push('/')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const t = {
    fr: {
      title: 'Connexion',
      email: 'Email',
      password: 'Mot de passe',
      login: 'Se connecter',
      noAccount: "Vous n'avez pas de compte ?",
      register: "S'inscrire",
      error: 'Erreur de connexion',
    },
    ar: {
      title: 'تسجيل الدخول',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      login: 'تسجيل الدخول',
      noAccount: 'ليس لديك حساب؟',
      register: 'إنشاء حساب',
      error: 'خطأ في تسجيل الدخول',
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold hover:from-gold-400 hover:to-gold-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '...' : t.login}
            </button>
          </form>

          <p className="mt-6 text-center text-white/70">
            {t.noAccount}{' '}
            <Link href="/register" className="text-gold-400 hover:text-gold-300 font-semibold">
              {t.register}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
