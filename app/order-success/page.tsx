'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FiCheckCircle } from 'react-icons/fi'
import { useLanguageStore } from '@/store/languageStore'

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('orderNumber')
  const { language } = useLanguageStore()

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass-strong rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-emerald-500/10 to-crystal-500/10"></div>
            <div className="relative z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-gold-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 glow-gold reflective">
                <FiCheckCircle className="text-white text-5xl" />
              </div>
              <h1 className="text-5xl font-bold mb-4 gradient-gold font-display">
                {language === 'fr' ? 'Commande confirmée !' : 'تم تأكيد الطلب!'}
              </h1>
              <p className="text-white/80 mb-8 text-lg leading-relaxed">
                {language === 'fr'
                  ? 'Merci pour votre commande. Nous vous contacterons bientôt pour finaliser votre création personnalisée.'
                  : 'شكراً لطلبك. سنتواصل معك قريباً لإتمام إنشاءك المخصص.'}
              </p>
              {orderNumber && (
                <div className="glass-card p-6 rounded-xl mb-8 border border-gold-500/30">
                  <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-2">
                    {language === 'fr' ? 'Numéro de commande' : 'رقم الطلب'}
                  </p>
                  <p className="text-3xl font-bold gradient-gold font-display">{orderNumber}</p>
                </div>
              )}
              <Link
                href="/builder"
                className="relative group inline-block"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <button className="relative bg-gradient-to-r from-gold-500 to-gold-600 text-black px-8 py-4 rounded-xl font-semibold hover:scale-110 transition-all duration-300 glow-gold">
                  {language === 'fr' ? 'Continuer vos achats' : 'متابعة التسوق'}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
