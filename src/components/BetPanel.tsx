import { useEffect, useMemo, useState } from 'react'
import { useGameStore } from '../state/useGameStore'
import { send } from '../lib/ws'
export default function BetPanel(){
  const state = useGameStore(s=>s.state)
  const bets = useGameStore(s=>s.bets)
  const user = useGameStore(s=>s.user)
  const [amount, setAmount] = useState<number>(() => Number(localStorage.getItem('amountCents')) || 1000)
  const [auto, setAuto] = useState<number | ''>(() => { const v = localStorage.getItem('autoCashout'); return v ? Number(v) : '' })
  useEffect(()=>{ localStorage.setItem('amountCents', String(amount)) }, [amount])
  useEffect(()=>{ if (auto === '') localStorage.removeItem('autoCashout'); else localStorage.setItem('autoCashout', String(auto)) }, [auto])
  const myOpenBet = useMemo(()=> bets.find(b => b.userId === user?.id && b.status === 'PLACED'), [bets, user?.id])
  const canBet = state?.phase === 'LOBBY'; const canCashout = state?.phase === 'TAKEOFF' && !!myOpenBet
  const quicks = [100, 500, 1000, 5000, 10000]
  const place = () => send('bet:place', { amountCents: amount, autoCashoutMultiplier: auto === '' ? null : Number(auto) })
  const cashout = () => send('cashout:now', {})
  return (
    <div className="elev bg-black/30 p-4 space-y-4">
      <div className="text-sm text-neutral-300">Bet</div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[11px] text-neutral-400">Amount (¢)</label>
          <div className="mt-1 flex items-center gap-2">
            <button className="btn btn-outline px-3" onClick={() => setAmount(Math.max(1, amount - 100))}>–</button>
            <input className="input text-center" type="number" min={1} value={amount} onChange={e => setAmount(parseInt(e.target.value || '0'))} />
            <button className="btn btn-outline px-3" onClick={() => setAmount(amount + 100)}>+</button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">{quicks.map(q => (<button key={q} className="chip" onClick={() => setAmount(q)}>{q.toLocaleString()}</button>))}</div>
        </div>
        <div>
          <label className="text-[11px] text-neutral-400">Auto Cashout (x)</label>
          <div className="mt-1"><input className="input" type="number" step="0.01" min={1} value={auto} onChange={e => setAuto(e.target.value === '' ? '' : Number(e.target.value))} /></div>
          <div className="text-[11px] text-neutral-500 mt-1">Leave empty for manual cashout</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button className="btn btn-primary text-lg py-3" disabled={!canBet} onClick={place}>BET</button>
        <button className="btn btn-danger text-lg py-3" disabled={!canCashout} onClick={cashout}>CASH OUT</button>
      </div>
    </div>
  )
}
