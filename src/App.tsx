import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import TopStrip from './components/TopStrip'
import GraphArea from './components/GraphArea'
import LiveBets from './components/LiveBets'
import BetPanel from './components/BetPanel'
import { connect, on } from './lib/ws'
import { useGameStore } from './state/useGameStore'
import type { StateSnapshot, User, BetRow } from './lib/types'

export default function App(){
  const setUser = useGameStore(s=>s.setUser)
  const setState = useGameStore(s=>s.setState)
  const setBets = useGameStore(s=>s.setBets)
  const setHistory = useGameStore(s=>s.setHistory)
  const state = useGameStore(s=>s.state)
  const history = useGameStore(s=>s.history)

  const [username, setUsername] = useState<string>(() => localStorage.getItem('username') || 'mpano')

  useEffect(() => {
    const offUser = on<User>('user:me', u => setUser(u))
    const offState = on<StateSnapshot>('round:state', s => setState(s))
    const offMult = on<{ multiplier: number }>('round:multiplier', p => setState(prev => prev ? ({ ...prev, multiplier: p.multiplier }) : prev as any))
    const offBets = on<BetRow[]>('bets:update', rows => setBets(rows))
    const offHist = on<{ nonce: number; crashPoint: number }[]>('history:update', h => setHistory(h))
    connect(username)
    return () => { offUser(); offState(); offMult(); offBets(); offHist(); }
  }, [username])

  const [crashedAt, setCrashedAt] = useState<number | undefined>(undefined)
  useEffect(() => {
    const offCrash = on<{ at: number }>('crash', ({ at }) => setCrashedAt(at))
    const offState = on<StateSnapshot>('round:state', s => { if (s.phase === 'LOBBY') setCrashedAt(undefined) })
    return () => { offCrash(); offState() }
  }, [])

  const progress = useMemo(() => {
    if (!state || state.phase === 'LOBBY') return 0
    if (state.phase === 'TAKEOFF') return Math.min(1, Math.log(state.multiplier) / Math.log(20))
    return 1
  }, [state])

  const changeUser = () => {
    const next = prompt('Enter username', username) || username
    setUsername(next); localStorage.setItem('username', next)
  }

  return (
    <div className="max-w-[1280px] mx-auto p-4 space-y-4">
      <Header onChangeUser={changeUser} />
      <div className="grid grid-cols-12 gap-4">
        <div className="hidden md:block md:col-span-3"><LiveBets /></div>
        <div className="col-span-12 md:col-span-6 space-y-3">
          <TopStrip items={history} />
          <div className="card p-4">
            <div className="flex items-center justify-between mb-2 text-sm text-neutral-400">
              <div>Round #{state?.round?.nonce ?? '—'} • {state?.phase ?? '—'}</div>
              <div className="badge bg-white/10 border border-white/10">Previous hand</div>
            </div>
            <GraphArea multiplier={state?.multiplier ?? 1} progress={progress} crashedAt={crashedAt} />
          </div>
        </div>
        <div className="col-span-12 md:col-span-3 space-y-3">
          <BetPanel />
          <div className="text-[11px] text-neutral-500 text-center">Built for the Go backend at <span className="font-mono">ws://localhost:3000/ws</span> • Change via <span className="font-mono">VITE_WS_URL</span></div>
        </div>
      </div>
    </div>
  )
}
