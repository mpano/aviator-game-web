import { motion } from 'framer-motion'
import { useGameStore } from '../state/useGameStore'
function formatCents(c: number){ return (c/100).toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2}) }
export default function Header({ onChangeUser }: { onChangeUser: () => void }) {
  const user = useGameStore(s => s.user)
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 card bg-radial">
      <div className="flex items-center gap-3">
        <motion.div initial={{ rotate: -10, scale: 0.9 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="w-10 h-10 rounded-xl bg-brand-600 grid place-content-center shadow">✈️</motion.div>
        <div><div className="text-xl font-semibold tracking-tight">Aviator</div><div className="text-xs text-neutral-400">Provably fair crash game</div></div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-sm text-neutral-300"><span className="text-neutral-400">User:</span> <span className="font-medium">{user?.username ?? '...'}</span></div>
        <div className="px-3 py-1.5 rounded-xl bg-white/10 text-sm">Balance: <span className="font-bold">${formatCents(user?.balanceCents ?? 0)}</span></div>
        <button className="btn btn-outline" onClick={onChangeUser}>Switch</button>
      </div>
    </div>
  )
}
