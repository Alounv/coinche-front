export enum Phases {
	Teaming = 1,
	Bidding = 2,
	Playing = 3,
	Counting = 4
}

export const phases = {
	[Phases.Teaming]: 'Teaming',
	[Phases.Bidding]: 'Bidding',
	[Phases.Playing]: 'Playing',
	[Phases.Counting]: 'Counting'
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

export enum BidValues {
	Eighty = 80,
	Ninety = 90,
	OneHundred = 100,
	OneHundredTen = 110,
	OneHundredTwenty = 120,
	OneHundredThirty = 130,
	OneHundredForty = 140,
	OneHundredFifty = 150,
	Capot = 160
}

export const bidValues: BidValues[] = [
	BidValues.Eighty,
	BidValues.Ninety,
	BidValues.OneHundred,
	BidValues.OneHundredTen,
	BidValues.OneHundredTwenty,
	BidValues.OneHundredThirty,
	BidValues.OneHundredForty,
	BidValues.OneHundredFifty,
	BidValues.Capot
]

export enum Colors {
	Club = 'club',
	Diamond = 'diamond',
	Spade = 'spade',
	Heart = 'heart'
}

export enum BidSpecificColors {
	NoTrump = 'noTrump',
	AllTrump = 'allTrump'
}

export type BidColors = Colors | BidSpecificColors

export const bidColors = {
	[Colors.Spade]: '♠',
	[Colors.Heart]: '♥',
	[Colors.Diamond]: '♦',
	[Colors.Club]: '♣',
	[BidSpecificColors.NoTrump]: 'No Trump',
	[BidSpecificColors.AllTrump]: 'All Trump'
}

export const cardsOrder: Record<Card, { rank: number; color: number; trumpRank: number }> = {
	[Card.CA]: { color: 1, rank: 7, trumpRank: 5 },
	[Card.C10]: { color: 1, rank: 6, trumpRank: 4 },
	[Card.CK]: { color: 1, rank: 5, trumpRank: 3 },
	[Card.CQ]: { color: 1, rank: 4, trumpRank: 2 },
	[Card.CJ]: { color: 1, rank: 3, trumpRank: 7 },
	[Card.C9]: { color: 1, rank: 2, trumpRank: 6 },
	[Card.C8]: { color: 1, rank: 1, trumpRank: 1 },
	[Card.C7]: { color: 1, rank: 0, trumpRank: 0 },
	[Card.DA]: { color: 2, rank: 7, trumpRank: 5 },
	[Card.D10]: { color: 2, rank: 6, trumpRank: 4 },
	[Card.DK]: { color: 2, rank: 5, trumpRank: 3 },
	[Card.DQ]: { color: 2, rank: 4, trumpRank: 2 },
	[Card.DJ]: { color: 2, rank: 3, trumpRank: 7 },
	[Card.D9]: { color: 2, rank: 2, trumpRank: 6 },
	[Card.D8]: { color: 2, rank: 1, trumpRank: 1 },
	[Card.D7]: { color: 2, rank: 0, trumpRank: 0 },
	[Card.SA]: { color: 3, rank: 7, trumpRank: 5 },
	[Card.S10]: { color: 3, rank: 6, trumpRank: 4 },
	[Card.SK]: { color: 3, rank: 5, trumpRank: 3 },
	[Card.SQ]: { color: 3, rank: 4, trumpRank: 2 },
	[Card.SJ]: { color: 3, rank: 3, trumpRank: 7 },
	[Card.S9]: { color: 3, rank: 2, trumpRank: 6 },
	[Card.S8]: { color: 3, rank: 1, trumpRank: 1 },
	[Card.S7]: { color: 3, rank: 0, trumpRank: 0 },
	[Card.HA]: { color: 4, rank: 7, trumpRank: 5 },
	[Card.H10]: { color: 4, rank: 6, trumpRank: 4 },
	[Card.HK]: { color: 4, rank: 5, trumpRank: 3 },
	[Card.HQ]: { color: 4, rank: 4, trumpRank: 2 },
	[Card.HJ]: { color: 4, rank: 3, trumpRank: 7 },
	[Card.H9]: { color: 4, rank: 2, trumpRank: 6 },
	[Card.H8]: { color: 4, rank: 1, trumpRank: 1 },
	[Card.H7]: { color: 4, rank: 0, trumpRank: 0 }
}
