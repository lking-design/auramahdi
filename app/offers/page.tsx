'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FiGift, FiStar, FiShoppingCart } from 'react-icons/fi'

const offers = [
  {
    id: 1,
    name: 'Luxury Gift Box Set',
    nameAr: 'مجموعة صندوق الهدايا الفاخر',
    description: 'Premium collection with 3 custom perfumes in elegant packaging',
    descriptionAr: 'مجموعة فاخرة مع 3 عطور مخصصة بتغليف أنيق',
    price: 199,
    originalPrice: 249,
    image: 'https://images.unsplash.com/photo-1600857062242-af43a443c7e0?w=600&h=600&fit=crop',
    featured: true,
  },
  {
    id: 2,
    name: 'Holiday Special Collection',
    nameAr: 'مجموعة العيد الخاصة',
    description: 'Limited edition gift set perfect for holidays and special occasions',
    descriptionAr: 'مجموعة هدايا إصدار محدود مثالية للأعياد والمناسبات الخاصة',
    price: 149,
    originalPrice: 199,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    featured: true,
  },
  {
    id: 3,
    name: 'Romance Gift Box',
    nameAr: 'صندوق الهدايا الرومانسي',
    description: 'Perfect for couples - matching fragrances in a romantic presentation',
    descriptionAr: 'مثالي للأزواج - عطور متطابقة في عرض رومانسي',
    price: 179,
    originalPrice: 229,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop',
    featured: false,
  },
  {
    id: 4,
    name: 'Premium Discovery Set',
    nameAr: 'مجموعة الاكتشاف المميزة',
    description: 'Try 5 different scents in travel-size bottles - find your signature scent',
    descriptionAr: 'جرب 5 روائح مختلفة في زجاجات بحجم السفر - اكتشف رائحتك المميزة',
    price: 99,
    originalPrice: 149,
    image: 'https://images.unsplash.com/photo-1595425970377-c9700295d65b?w=600&h=600&fit=crop',
    featured: false,
  },
  {
    id: 5,
    name: 'Executive Collection',
    nameAr: 'المجموعة التنفيذية',
    description: 'Professional gift set with premium packaging - ideal for corporate gifts',
    descriptionAr: 'مجموعة هدايا احترافية مع تغليف فاخر - مثالية للهدايا المؤسسية',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=600&fit=crop',
    featured: true,
  },
  {
    id: 6,
    name: 'Spring Collection Box',
    nameAr: 'صندوق مجموعة الربيع',
    description: 'Fresh spring scents in a beautiful seasonal gift box',
    descriptionAr: 'عطور ربيعية منعشة في صندوق هدايا موسمي جميل',
    price: 129,
    originalPrice: 179,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=600&fit=crop',
    featured: false,
  },
]

export default function OffersPage() {
  return (
    <div className="min-h-screen py-12 px-4 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-crystal-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">Exclusive Collections</span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-gold font-display mt-4">
            Special Offers & Gift Boxes
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Discover our curated collections and limited-time offers. Perfect gifts for yourself or someone special.
          </p>
        </div>

        {/* Featured Offers */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 font-display">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center glow-gold">
              <FiStar className="text-black text-lg" />
            </div>
            <span className="gradient-gold">Featured Offers</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.filter(o => o.featured).map((offer) => (
              <div
                key={offer.id}
                className="glass-card rounded-3xl overflow-hidden hover:scale-105 transition-all duration-500 group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={offer.image}
                      alt={offer.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gold-500/10 to-transparent"></div>
                    <div className="absolute top-4 right-4 glass-strong px-4 py-2 rounded-full text-sm font-bold text-gold-400 glow-gold">
                      -{Math.round((1 - offer.price / offer.originalPrice) * 100)}%
                    </div>
                    {offer.featured && (
                      <div className="absolute top-4 left-4 glass-strong px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 text-gold-400">
                        <FiStar className="text-gold-400" /> Featured
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-white font-display">{offer.name}</h3>
                    <p className="text-white/70 mb-4 text-sm leading-relaxed">{offer.description}</p>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-3xl font-bold gradient-gold font-display">${offer.price}</span>
                      <span className="text-xl text-white/50 line-through">${offer.originalPrice}</span>
                    </div>
                    <button className="w-full relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                      <div className="relative bg-gradient-to-r from-gold-500 to-gold-600 text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 glow-gold flex items-center justify-center gap-2">
                        <FiShoppingCart /> Add to Cart
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Offers */}
        <div>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 font-display">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center glow-emerald">
              <FiGift className="text-white text-lg" />
            </div>
            <span className="text-emerald-400">All Gift Boxes</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="glass-card rounded-3xl overflow-hidden hover:scale-105 transition-all duration-500 group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-crystal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={offer.image}
                      alt={offer.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-crystal-500/10 to-transparent"></div>
                    <div className="absolute top-4 right-4 glass-strong px-4 py-2 rounded-full text-sm font-bold text-gold-400">
                      -{Math.round((1 - offer.price / offer.originalPrice) * 100)}%
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white font-display">{offer.name}</h3>
                    <p className="text-white/70 mb-4 text-sm leading-relaxed">{offer.description}</p>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-2xl font-bold gradient-gold font-display">${offer.price}</span>
                      <span className="text-lg text-white/50 line-through">${offer.originalPrice}</span>
                    </div>
                    <button className="w-full relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                      <div className="relative bg-gradient-to-r from-gold-500 to-gold-600 text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 glow-gold flex items-center justify-center gap-2">
                        <FiShoppingCart /> Add to Cart
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="glass-strong rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-crystal-500/10 to-emerald-500/10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4 gradient-gold font-display">
                Create Your Own Custom Perfume
              </h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Not finding what you&apos;re looking for? Design your own custom fragrance!
              </p>
              <Link
                href="/builder"
                className="relative group inline-block"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <button className="relative bg-gradient-to-r from-gold-500 to-gold-600 text-black px-8 py-4 rounded-xl font-semibold hover:scale-110 transition-all duration-300 glow-gold">
                  Start Building
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
