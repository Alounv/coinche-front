import type { Phases, Card, BidColors, BidValues } from './enums'

export interface GamePreview {
	ID: number
	Name: string
	Players: string[]
	TurnsCount: number
	Phase: Phases
	CreatedAt: string
}

export interface Bid {
	Color: BidColors
	Pass: number
	Coinche: number
	Player: string
}

export interface BidWithValue extends Bid {
	value: number
}

interface Play {
	Card: Card
	PlayerName: string
}

export interface Turn {
	Winner?: string
	Plays: Play[]
}

export interface Game {
	ID: number
	Name: string
	Players: Record<string, Player>
	Phase: Phases
	Bids: Record<BidValues, Bid>
	Turns: Turn[]
	Scores: Record<string, number>
	Points: Record<string, number>
}

export interface Player {
	Hand: Card[]
	Team: string
	Order: number
	InitialOrder: number
}

export interface PlayerWithName extends Player {
	name: string
}

export interface Team {
	name: string
	players: PlayerWithName[]
	score: number
	points: number
}

export interface Score {
	team: string
	value: number
}

export interface Point {
	team: string
	value: number
}
