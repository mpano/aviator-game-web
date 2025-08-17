export type Phase = 'LOBBY' | 'TAKEOFF' | 'CRASH' | 'SETTLED'
export interface WsPacket<T=any> { type: string; data: T }
export interface User { id: string; username: string; balanceCents: number }
export interface RoundInfo { id: string; nonce: number; serverSeedHash: string; serverSeed?: string | null; crashPoint: number; status: Phase }
export interface StateSnapshot { phase: Phase; lobbyRemainingMs: number; multiplier: number; round: RoundInfo | null }
export interface BetRow { id: string; roundId: string; amountCents: number; status: 'PLACED'|'CASHED_OUT'|'LOST'|'CANCELLED'; cashoutMultiplier?: number|null; autoCashoutMultiplier?: number|null; userId: string }
