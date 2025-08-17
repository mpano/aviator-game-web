import { create } from 'zustand'
import type { User, StateSnapshot, BetRow } from '../lib/types'
interface GameStore {
  user?: User; state?: StateSnapshot; bets: BetRow[]; history: { nonce: number; crashPoint: number }[]
  setUser: (u: User) => void
  setState: (s: StateSnapshot | ((prev?: StateSnapshot) => StateSnapshot | undefined)) => void
  setBets: (b: BetRow[]) => void
  setHistory: (h: { nonce: number; crashPoint: number }[]) => void
}
export const useGameStore = create<GameStore>((set) => ({
  bets: [], history: [],
  setUser: (u) => set({ user: u }),
  setState: (s) => set((prev) => ({ state: typeof s === 'function' ? (s as any)(prev.state) : s })),
  setBets: (b) => set({ bets: b }),
  setHistory: (h) => set({ history: h }),
}))
