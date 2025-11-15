import { create } from 'zustand'

interface CustomPerfume {
  bottle: string | null
  bottleName: string
  perfumeType: string | null
  perfumeTypeName: string
  scent: string | null
  scentName: string
  concentration: number // 0-100 percentage
}

interface PerfumeBuilderStore {
  customPerfume: CustomPerfume
  currentStep: number
  setBottle: (bottle: string, name: string) => void
  setPerfumeType: (type: string, name: string) => void
  setScent: (scent: string, name: string) => void
  setConcentration: (concentration: number) => void
  setStep: (step: number) => void
  reset: () => void
}

const initialState = {
  bottle: null,
  bottleName: '',
  perfumeType: null,
  perfumeTypeName: '',
  scent: null,
  scentName: '',
  concentration: 50,
}

export const usePerfumeBuilderStore = create<PerfumeBuilderStore>()((set) => ({
  customPerfume: initialState,
  currentStep: 1,

  setBottle: (bottle, name) =>
    set((state) => ({
      customPerfume: { ...state.customPerfume, bottle, bottleName: name },
      currentStep: 2,
    })),

  setPerfumeType: (type, name) =>
    set((state) => ({
      customPerfume: { ...state.customPerfume, perfumeType: type, perfumeTypeName: name },
      currentStep: 3,
    })),

  setScent: (scent, name) =>
    set((state) => ({
      customPerfume: { ...state.customPerfume, scent, scentName: name },
    })),

  setConcentration: (concentration) =>
    set((state) => ({
      customPerfume: { ...state.customPerfume, concentration },
    })),

  setStep: (step) => set({ currentStep: step }),

  reset: () => set({ customPerfume: initialState, currentStep: 1 }),
}))
















