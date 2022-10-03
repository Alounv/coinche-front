import type { Phase, Card, BidColors, BidValues } from './enums';

export interface GamePreview {
	ID: number;
	Name: string;
	Players: string[];
	TurnsCount: number;
	Phase: string;
	CreatedAt: string;
}

export interface Bid {
	Color: BidColors;
	Pass: number;
	Coinche: number;
}

export interface BidWithValue extends Bid {
	value: number;
}

export interface Game {
	ID: number;
	Name: string;
	Players: Record<string, Player>;
	Phase: Phase;
	Bids: Record<BidValues, Bid>;
	Scores: Record<string, number>;
	Points: Record<string, number>;
}

export interface Player {
	Hand: Card[];
	Team: string;
	Order: number;
	InitialOrder: number;
}

export interface PlayerWithName extends Player {
	name: string;
}

export interface Team {
	name: string;
	players: PlayerWithName[];
	score: number;
	points: number;
}

export interface Score {
	team: string;
	value: number;
}

export interface Point {
	team: string;
	value: number;
}
