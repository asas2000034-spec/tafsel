import { create } from 'zustand'

interface Wallet {
  totalBalance: number
  freeBalance: number
  lockedBalance: number
}

interface User {
  email: string
  role: string
}

interface StoreState {
  user: User | null
  wallet: Wallet
  setUser: (user: User | null) => void
  updateWallet: (wallet: Wallet) => void
  addToWallet: (amount: number, isBNPL: boolean) => void
  deductFromWallet: (amount: number) => void
  loadFromStorage: () => void
}

export const useStore = create<StoreState>((set) => ({
  user: null,
  wallet: {
    totalBalance: 0,
    freeBalance: 0,
    lockedBalance: 0,
  },
  setUser: (user) => set({ user }),
  updateWallet: (wallet) => set({ wallet }),
  addToWallet: (amount, isBNPL) => {
    if (isBNPL) {
      // تقسيم 70/30
      const freeAmount = amount * 0.7
      const lockedAmount = amount * 0.3
      set((state) => ({
        wallet: {
          totalBalance: state.wallet.totalBalance + amount,
          freeBalance: state.wallet.freeBalance + freeAmount,
          lockedBalance: state.wallet.lockedBalance + lockedAmount,
        },
      }))
    } else {
      // شحن عادي - كل الرصيد حر
      set((state) => ({
        wallet: {
          totalBalance: state.wallet.totalBalance + amount,
          freeBalance: state.wallet.freeBalance + amount,
          lockedBalance: state.wallet.lockedBalance,
        },
      }))
    }
  },
  deductFromWallet: (amount) => {
    set((state) => {
      let remaining = amount
      let newLocked = state.wallet.lockedBalance
      let newFree = state.wallet.freeBalance

      // الخصم من الرصيد المقفل أولاً
      if (newLocked > 0) {
        const deductFromLocked = Math.min(remaining, newLocked)
        newLocked -= deductFromLocked
        remaining -= deductFromLocked
      }

      // إذا بقي مبلغ، نخصمه من الرصيد الحر
      if (remaining > 0 && newFree > 0) {
        newFree -= remaining
      }

      return {
        wallet: {
          totalBalance: state.wallet.totalBalance - amount,
          freeBalance: newFree,
          lockedBalance: newLocked,
        },
      }
    })
  },
  loadFromStorage: () => {
    if (typeof window !== 'undefined') {
      const storedWallet = localStorage.getItem('wallet')
      if (storedWallet) {
        set({ wallet: JSON.parse(storedWallet) })
      }
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        set({ user: JSON.parse(storedUser) })
      }
    }
  },
}))
