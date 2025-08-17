import type { WsPacket } from './types'
type Listener = (data: any) => void
const listeners = new Map<string, Set<Listener>>()
let ws: WebSocket | null = null
function emit(t:string, d:any){ const set = listeners.get(t); if (set) set.forEach(fn => fn(d)) }
export function on<T=any>(t:string, cb:(d:T)=>void){ if(!listeners.has(t)) listeners.set(t,new Set()); listeners.get(t)!.add(cb as any); return () => listeners.get(t)!.delete(cb as any) }
export function send(type: string, data: any){ const pkt: WsPacket = { type, data }; ws?.send(JSON.stringify(pkt)) }
export function connect(username: string, base = (import.meta as any).env.VITE_WS_URL || 'ws://localhost:3000/ws'){
  const url = `${base}?username=${encodeURIComponent(username)}`; let retry = 0
  const open = () => { ws = new WebSocket(url)
    ws.onopen = () => { retry = 0 }
    ws.onmessage = (ev) => { try { const pkt = JSON.parse(ev.data) as WsPacket; emit(pkt.type, pkt.data) } catch {} }
    ws.onclose = () => { const delay = Math.min(1000 * Math.pow(2, retry++), 10000); setTimeout(open, delay) }
    ws.onerror = () => { ws?.close() } }
  open()
}
