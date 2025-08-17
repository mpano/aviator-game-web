import { motion } from 'framer-motion'
export default function GraphArea({ multiplier, progress, crashedAt }: { multiplier: number; progress: number; crashedAt?: number }) {
  const width = 900, height = 360
  const p = Math.max(0, Math.min(1, progress))
  const endX = 60 + p * (width - 100)
  const endY = height - (height * Math.min(0.8, Math.log(multiplier + 1) / Math.log(25))) - 40
  const path = `M 40 ${height-50} Q ${width/3} ${height-120} ${width/2} ${height-180} T ${endX} ${endY}`
  const area = `${path} L ${endX} ${height-40} L 40 ${height-40} Z`
  return (
    <div className="relative w-full h-[420px] graph-surface rounded-2xl border border-white/10 overflow-hidden">
      <div className="absolute left-0 right-0 top-0 text-center text-[11px] tracking-wide uppercase bg-amber-500/20 backdrop-blur py-1 border-b border-white/10">Fun Mode</div>
      <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="line" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="white" stop-opacity="0.2"/><stop offset="100%" stop-color="white" stop-opacity="0.9"/></linearGradient>
          <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f43f5e" stop-opacity="0.35"/><stop offset="100%" stop-color="#f43f5e" stop-opacity="0.0"/></linearGradient>
          <filter id="glow"><feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#f43f5e" flood-opacity="0.6"/></filter>
        </defs>
        <g opacity="0.08" stroke="white">
          {[...Array(12)].map((_,i)=>(<line key={i} x1={(i+1)*width/12} y1="0" x2={(i+1)*width/12} y2={height}/>))}
          {[...Array(6)].map((_,i)=>(<line key={i} x1="0" y1={(i+1)*height/6} x2={width} y2={(i+1)*height/6}/>))}
        </g>
        <path d={area} fill="url(#fill)" />
        <path d={path} fill="none" stroke="url(#line)" strokeWidth="3" filter="url(#glow)" />
        <text x={endX} y={endY} fontSize="22" textAnchor="middle" dominantBaseline="middle">✈️</text>
      </svg>
      <motion.div className={`absolute left-1/2 -translate-x-1/2 bottom-10 text-7xl font-black tracking-tight ${crashedAt ? 'text-brand-500' : 'text-white'}`} animate={crashedAt ? { scale: [1, 1.12, 1] } : { scale: 1 }} transition={{ duration: 0.5 }}>
        {multiplier.toFixed(2)}x
      </motion.div>
      {crashedAt && (<div className="absolute right-3 top-3 text-xs px-2 py-1 rounded-md bg-brand-600/40 border border-brand-600">Crash!</div>)}
    </div>
  )
}
