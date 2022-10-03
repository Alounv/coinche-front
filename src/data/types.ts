import type { Phase, Card } from './enums';

export interface GamePreview {
	ID: number;
	Name: string;
	Players: string[];
	TurnsCount: number;
	Phase: string;
	CreatedAt: string;
}

interface Bid {
	Color: string;
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
	Bids: Record<string, Bid>;
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
