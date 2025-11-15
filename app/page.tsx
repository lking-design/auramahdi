'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FiArrowRight, FiStar, FiDroplet, FiLayers } from 'react-icons/fi'

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-crystal-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left z-10 animate-fade-in">
              <div className="inline-block mb-6">
                <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">Your Signature Scent</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-gold font-display leading-tight">
                Create Your
                <br />
                <span className="text-crystal-400">Timeless</span>
                <br />
                Fragrance
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
                Design a custom perfume that tells your story. Choose your bottle, type, and scent to create the perfect fragrance that reflects your essence.
              </p>
              <Link
                href="/builder"
                className="inline-block relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <button className="relative bg-gradient-to-r from-gold-500 to-gold-600 px-10 py-5 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300 text-black glow-gold flex items-center gap-3">
                  Start Creating <FiArrowRight className="text-xl" />
                </button>
              </Link>
            </div>

            {/* Right Image - Cinematic Perfume Bottle */}
            <div className="relative z-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                {/* Glowing effect behind */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-crystal-500/20 rounded-3xl blur-3xl"></div>
                <div className="relative glass-card rounded-3xl overflow-hidden reflective">
                  <Image
                    src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=1000&fit=crop"
                    alt="Custom Perfume"
                    width={600}
                    height={800}
                    className="w-full h-auto object-cover"
                  />
                  {/* Gold light reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gold-500/10 to-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">The Journey</span>
          <h2 className="text-5xl md:text-6xl font-bold mt-4 gradient-gold font-display">
            Your Personal Creation
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="glass-card rounded-3xl p-8 text-center hover:scale-105 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-gold-500 to-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-6 glow-gold reflective">
                <FiLayers className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white font-display">Choose Your Bottle</h3>
              <p className="text-white/70 leading-relaxed">
                Select from elegant bottle designs that match your style and reflect your personality.
              </p>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-8 text-center hover:scale-105 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-crystal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-crystal-500 to-crystal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 glow-crystal reflective">
                <FiDroplet className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white font-display">Select Perfume Type</h3>
              <p className="text-white/70 leading-relaxed">
                Pick the perfect concentration for your fragrance, from subtle to intense.
              </p>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-8 text-center hover:scale-105 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 glow-emerald reflective">
                <FiStar className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white font-display">Customize Scent</h3>
              <p className="text-white/70 leading-relaxed">
                Blend unique notes to create your signature fragrance, a true reflection of you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container mx-auto px-4 relative z-10">
        <div className="glass-strong rounded-3xl p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-crystal-500/10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-gold font-display">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Start your journey to a unique fragrance that reflects your personality and tells your story
            </p>
            <Link
              href="/builder"
              className="inline-block relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <button className="relative bg-gradient-to-r from-gold-500 to-gold-600 px-10 py-5 rounded-xl font-semibold text-lg hover:scale-110 transition-all duration-300 text-black glow-gold">
                Start Creating Now fech testana !
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
