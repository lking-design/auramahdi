'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiArrowRight, FiArrowLeft, FiCheck, FiStar } from 'react-icons/fi'
import { usePerfumeBuilderStore } from '@/store/perfumeBuilderStore'
import { useCartStore } from '@/store/cartStore'

const bottles = [
  { id: 'classic', name: 'Classic', description: 'Elegant rectangle', volume: '50ml', price: 15 },
  { id: 'round', name: 'Round', description: 'Spherical design', volume: '50ml', price: 18 },
  { id: 'modern', name: 'Modern', description: 'Geometric art', volume: '50ml', price: 20 },
  { id: 'luxury', name: 'Luxury', description: 'Crystal cut', volume: '75ml', price: 25 },
]

const perfumeTypes = [
  { id: 'parfum', name: 'Parfum', concentration: '20-30%', lasting: '8-12 hours', price: 65 },
  { id: 'eau-de-parfum', name: 'Eau de Parfum', concentration: '15-20%', lasting: '6-8 hours', price: 45 },
  { id: 'eau-de-toilette', name: 'Eau de Toilette', concentration: '5-15%', lasting: '4-6 hours', price: 35 },
  { id: 'eau-de-cologne', name: 'Eau de Cologne', concentration: '2-5%', lasting: '2-4 hours', price: 25 },
]

const scents = [
  { id: 'floral', name: 'Floral', description: 'Rose, Jasmine, Lily', icon: '🌹' },
  { id: 'woody', name: 'Woody', description: 'Sandalwood, Cedar, Vetiver', icon: '🌲' },
  { id: 'citrus', name: 'Citrus', description: 'Bergamot, Lemon, Orange', icon: '🍋' },
  { id: 'oriental', name: 'Oriental', description: 'Vanilla, Amber, Musk', icon: '🌙' },
  { id: 'fresh', name: 'Fresh', description: 'Mint, Ocean, Green Tea', icon: '🌊' },
  { id: 'fruity', name: 'Fruity', description: 'Peach, Apple, Berry', icon: '🍑' },
]

export default function PerfumeBuilderPage() {
  const router = useRouter()
  const { customPerfume, currentStep, setBottle, setPerfumeType, setScent, setConcentration, setStep, reset } = usePerfumeBuilderStore()
  const { addItem } = useCartStore()
  const [selectedBottle, setSelectedBottle] = useState<string | null>(customPerfume.bottle)
  const [selectedType, setSelectedType] = useState<string | null>(customPerfume.perfumeType)
  const [selectedScent, setSelectedScent] = useState<string | null>(customPerfume.scent)
  const [loading, setLoading] = useState(false)

  const handleBottleSelect = (bottleId: string) => {
    setSelectedBottle(bottleId)
    const bottle = bottles.find(b => b.id === bottleId)
    if (bottle) {
      setBottle(bottleId, bottle.name)
    }
  }

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId)
    const type = perfumeTypes.find(t => t.id === typeId)
    if (type) {
      setPerfumeType(typeId, type.name)
    }
  }

  const handleScentSelect = (scentId: string) => {
    setSelectedScent(scentId)
    const scent = scents.find(s => s.id === scentId)
    if (scent) {
      setScent(scentId, scent.name)
    }
  }

  const handleComplete = async () => {
    if (!customPerfume.bottle || !customPerfume.perfumeType || !customPerfume.scent) {
      alert('Please complete all steps before proceeding.')
      return
    }

    setLoading(true)
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      
      const response = await fetch(`${API_URL}/api/custom-perfumes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customPerfume),
      })

      if (response.ok) {
        const savedPerfume = await response.json()
        const selectedBottleImg = bottles.find(b => b.id === customPerfume.bottle)
        
        addItem({
          productId: savedPerfume._id,
          name: `Custom: ${customPerfume.bottleName} - ${customPerfume.scentName}`,
          price: savedPerfume.price,
          quantity: 1,
          image: selectedBottleImg?.image || '',
        })
        
        router.push('/checkout')
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to save custom perfume. Please try again.')
      }
    } catch (error) {
      console.error('Error saving custom perfume:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="min-h-screen py-12 px-4 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-crystal-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-medium text-gold-400 font-display">Step {currentStep} of {totalSteps}</h2>
            <span className="text-sm glass px-4 py-2 rounded-full text-white/80">{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-1.5 glass rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-gold-500 via-crystal-500 to-emerald-500 transition-all duration-500 relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Step 1: Bottle Selection */}
        {currentStep === 1 && (
          <div className="glass-strong rounded-3xl p-10 animate-slide-up">
            <div className="text-center mb-10">
              <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">The Foundation</span>
              <h1 className="text-5xl font-bold mb-4 gradient-gold font-display mt-2">Choose Your Bottle</h1>
              <p className="text-white/70 text-lg">Select the perfect vessel for your fragrance</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {bottles.map((bottle) => (
                <button
                  key={bottle.id}
                  onClick={() => handleBottleSelect(bottle.id)}
                  className={`glass-card rounded-2xl p-6 transition-all duration-500 text-left relative overflow-hidden group ${
                    selectedBottle === bottle.id
                      ? 'ring-2 ring-gold-400 scale-105 glow-gold'
                      : 'hover:scale-105 hover:ring-1 hover:ring-gold-400/50'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center flex-shrink-0 glow-gold reflective">
                      <FiStar className="text-white text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1 font-display">{bottle.name}</h3>
                      <p className="text-white/70 text-sm mb-2">{bottle.description}</p>
                      <p className="text-gold-400 font-medium">{bottle.volume}</p>
                    </div>
                    {selectedBottle === bottle.id && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center glow-gold">
                        <FiCheck className="text-black text-lg" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {selectedBottle && (
              <div className="flex justify-end mt-10 max-w-4xl mx-auto">
                <button
                  onClick={() => setStep(2)}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative bg-gradient-to-r from-gold-500 to-gold-600 px-8 py-4 rounded-xl font-semibold text-white hover:scale-110 transition-all duration-300 text-black glow-gold flex items-center justify-center gap-2">
                    Next <FiArrowRight />
                  </div>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Perfume Type */}
        {currentStep === 2 && (
          <div className="glass-strong rounded-3xl p-10 animate-slide-up">
            <button
              onClick={() => setStep(1)}
              className="mb-8 flex items-center gap-2 text-white/70 hover:text-gold-400 transition-colors"
            >
              <FiArrowLeft /> Back
            </button>
            
            <div className="text-center mb-10">
              <span className="text-crystal-400 text-sm font-semibold tracking-widest uppercase">The Essence</span>
              <h1 className="text-5xl font-bold mb-4 gradient-gold font-display mt-2">Select Perfume Type</h1>
              <p className="text-white/70 text-lg">Choose your fragrance intensity</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {perfumeTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleTypeSelect(type.id)}
                  className={`glass-card rounded-2xl p-8 text-left transition-all duration-500 relative overflow-hidden group ${
                    selectedType === type.id
                      ? 'ring-2 ring-crystal-400 scale-105 glow-crystal'
                      : 'hover:scale-105 hover:ring-1 hover:ring-crystal-400/50'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-crystal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-3 font-display">{type.name}</h3>
                    <p className="text-crystal-300 text-sm mb-1">Concentration: {type.concentration}</p>
                    <p className="text-white/70 text-sm mb-4">Lasting: {type.lasting}</p>
                    {selectedType === type.id && (
                      <div className="flex items-center gap-2 text-crystal-400">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-crystal-500 to-crystal-600 flex items-center justify-center">
                          <FiCheck className="text-white text-sm" />
                        </div>
                        <span className="text-sm font-medium">Selected</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {selectedType && (
              <div className="flex justify-end mt-10 max-w-4xl mx-auto">
                <button
                  onClick={() => setStep(3)}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative bg-gradient-to-r from-gold-500 to-gold-600 px-8 py-4 rounded-xl font-semibold text-white hover:scale-110 transition-all duration-300 text-black glow-gold flex items-center justify-center gap-2">
                    Next <FiArrowRight />
                  </div>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Scent + Concentration */}
        {currentStep === 3 && (
          <div className="glass-strong rounded-3xl p-10 animate-slide-up">
            <button
              onClick={() => setStep(2)}
              className="mb-8 flex items-center gap-2 text-white/70 hover:text-gold-400 transition-colors"
            >
              <FiArrowLeft /> Back
            </button>
            
            <div className="text-center mb-10">
              <span className="text-emerald-400 text-sm font-semibold tracking-widest uppercase">The Signature</span>
              <h1 className="text-5xl font-bold mb-4 gradient-gold font-display mt-2">Select your fragrance profile</h1>
              <p className="text-white/70 text-lg">Blend unique notes to create your essence</p>
            </div>
            
            {/* Scent Selection */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10 max-w-4xl mx-auto">
              {scents.map((scent) => (
                <button
                  key={scent.id}
                  onClick={() => handleScentSelect(scent.id)}
                  className={`glass-card rounded-2xl p-6 text-left transition-all duration-500 relative overflow-hidden group ${
                    selectedScent === scent.id
                      ? 'ring-2 ring-emerald-400 scale-105 glow-emerald'
                      : 'hover:scale-105 hover:ring-1 hover:ring-emerald-400/50'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2 font-display">{scent.name}</h3>
                    <p className="text-white/70 text-sm">{scent.description}</p>
                    {selectedScent === scent.id && (
                      <div className="mt-3 flex items-center gap-2 text-emerald-400">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                          <FiCheck className="text-white text-xs" />
                        </div>
                        <span className="text-xs font-medium">Selected</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Intensity Slider */}
            {selectedScent && (
              <div className="glass-card rounded-2xl p-8 mb-10 max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold text-white mb-6 font-display">Scent Intensity</h3>
                <div className="flex items-center gap-4 mb-4">
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={customPerfume.concentration}
                    onChange={(e) => setConcentration(Number(e.target.value))}
                    className="flex-1 h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-gold-500 via-crystal-500 to-emerald-500"
                    style={{
                      background: `linear-gradient(to right, #D4AF37 0%, #0ea5e9 ${customPerfume.concentration}%, rgba(212, 175, 55, 0.3) ${customPerfume.concentration}%, rgba(212, 175, 55, 0.3) 100%)`
                    }}
                  />
                  <span className="text-2xl font-bold gradient-gold min-w-[60px] text-right font-display">{customPerfume.concentration}%</span>
                </div>
                <div className="flex justify-between text-sm text-white/70">
                  <span>Light</span>
                  <span>Moderate</span>
                  <span>Intense</span>
                </div>
              </div>
            )}

            {selectedScent && (
              <div className="flex justify-end max-w-2xl mx-auto">
                <button
                  onClick={handleComplete}
                  disabled={loading}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative bg-gradient-to-r from-gold-500 to-gold-600 px-10 py-4 rounded-xl font-semibold hover:scale-110 transition-all duration-300 text-black glow-gold flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                    {loading ? 'Saving...' : 'Complete Your Creation'} <FiCheck />
                  </div>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
