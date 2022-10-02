export enum Phase {
	Teaming = 1,
	Playing = 2,
	Bidding = 3,
	Counting = 4
}

export interface GamePreview {
	ID: number;
	Name: string;
	Players: string[];
	TurnsCount: number;
	Phase: string;
	CreatedAt: string;
}

export interface Game {
	ID: number;
	Name: string;
	Players: Record<string, Player>;
	Phase: Phase;
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

export enum Card {
	C7 = '7-club',
	C8 = '8-club',
	C9 = '9-club',
	C10 = '10-club',
	CJ = 'jack-club',
	CQ = 'queen-club',
	CK = 'king-club',
	CA = 'as-club',
	D7 = '7-diamond',
	D8 = '8-diamond',
	D9 = '9-diamond',
	D10 = '10-diamond',
	DJ = 'jack-diamond',
	DQ = 'queen-diamond',
	DK = 'king-diamond',
	DA = 'as-diamond',
	H7 = '7-heart',
	H8 = '8-heart',
	H9 = '9-heart',
	H10 = '10-heart',
	HJ = 'jack-heart',
	HQ = 'queen-heart',
	HK = 'king-heart',
	HA = 'as-heart',
	S7 = '7-spade',
	S8 = '8-spade',
	S9 = '9-spade',
	S10 = '10-spade',
	SJ = 'jack-spade',
	SQ = 'queen-spade',
	SK = 'king-spade',
	SA = 'as-spade'
}
