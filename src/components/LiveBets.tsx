import { useGameStore } from '../state/useGameStore'
function formatCents(c: number){ return (c/100).toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2}) }
export default function LiveBets(){
  const bets = useGameStore(s=>s.bets)
  return (
    <div className="elev p-3 bg-black/20">
      <div className="text-sm text-neutral-300 mb-2 flex items-center justify-between"><span>Live Bets</span><span className="text-[11px] text-neutral-500">Top</span></div>
      <div className="space-y-2 max-h-[460px] overflow-auto pr-1">
        {bets.slice(0,30).map(b => (
          <div key={b.id} className="flex items-center justify-between rounded-xl px-3 py-2 bg-white/5 border border-white/10">
            <div className="text-xs text-neutral-500">{b.userId.slice(0,8)}</div>
            <div className="text-sm">${formatCents(b.amountCents)}</div>
            <div className="text-xs">
              {b.status === 'CASHED_OUT' && <span className="badge bg-emerald-600/30 border border-emerald-600">{(b.cashoutMultiplier ?? 0).toFixed(2)}x</span>}
              {b.status === 'PLACED' && <span className="badge bg-white/10 border border-white/10">open</span>}
              {b.status === 'LOST' && <span className="badge bg-brand-600/30 border border-brand-600">lost</span>}
            </div>
          </div>
        ))}
        {bets.length===0 && <div className="text-xs text-neutral-500">No activity yet…</div>}
      </div>
    </div>
  )
}
