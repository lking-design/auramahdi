'use client'

import Link from 'next/link'
import { FiInstagram, FiFacebook, FiTwitter, FiStar } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="glass mt-20 border-t border-gold-500/20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-500/5 to-transparent"></div>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 rounded-lg bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center overflow-hidden reflective">
                <FiStar className="text-white text-xl z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent"></div>
              </div>
              <span className="text-2xl font-bold gradient-gold font-display">AuraScent</span>
            </Link>
            <p className="text-white/70 leading-relaxed">
              Create your signature scent. Design custom perfumes that tell your unique story.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gold-400 font-display">Navigation</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <Link href="/" className="hover:text-gold-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/builder" className="hover:text-gold-400 transition-colors">
                  Create Perfume
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-gold-400 transition-colors">
                  Special Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-gold-400 font-display">Contact</h4>
            <ul className="space-y-2 text-white/70">
              <li>contact@aurascent.tn</li>
              <li>+216 29 775 150 </li>
              <li>Tunis, Tunisia , bardo </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4 text-gold-400 font-display">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-white/70 hover:text-gold-400 transition-colors p-2 glass rounded-lg hover:scale-110">
                <FiInstagram className="text-xl" />
              </a>
              <a href="#" className="text-white/70 hover:text-gold-400 transition-colors p-2 glass rounded-lg hover:scale-110">
                <FiFacebook className="text-xl" />
              </a>
              <a href="#" className="text-white/70 hover:text-gold-400 transition-colors p-2 glass rounded-lg hover:scale-110">
                <FiTwitter className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gold-500/20 mt-8 pt-8 text-center text-white/70">
          <p>© 2025 AuraScent – All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}
