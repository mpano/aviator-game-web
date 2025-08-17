export default function TopStrip({ items }: { items: { nonce: number; crashPoint: number }[] }) {
  const palette = (x: number) => x >= 50 ? 'bg-purple-600/30 border-purple-500 text-purple-200' :
                           x >= 10 ? 'bg-purple-600/25 border-purple-500 text-purple-100' :
                           x >= 2  ? 'bg-emerald-600/25 border-emerald-500 text-emerald-100' :
                                     'bg-white/10 border-white/10 text-neutral-200'
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      {items.map((h, i) => (<div key={i} className={`badge border ${palette(h.crashPoint)}`}>{h.crashPoint.toFixed(2)}x</div>))}
    </div>
  )
}
