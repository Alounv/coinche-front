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
	Spade = 'spade',
	Heart = 'heart',
	Diamond = 'diamond',
	Club = 'club'
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

export const cardsOrder: Record<Card, number> = {
	[Card.CA]: 0,
	[Card.C10]: 1,
	[Card.CK]: 2,
	[Card.CQ]: 3,
	[Card.CJ]: 4,
	[Card.C9]: 5,
	[Card.C8]: 6,
	[Card.C7]: 7,
	[Card.DA]: 8,
	[Card.D10]: 9,
	[Card.DK]: 10,
	[Card.DQ]: 11,
	[Card.DJ]: 12,
	[Card.D9]: 13,
	[Card.D8]: 14,
	[Card.D7]: 15,
	[Card.SA]: 16,
	[Card.S10]: 17,
	[Card.SK]: 18,
	[Card.SQ]: 19,
	[Card.SJ]: 20,
	[Card.S9]: 21,
	[Card.S8]: 22,
	[Card.S7]: 23,
	[Card.HA]: 24,
	[Card.H10]: 25,
	[Card.HK]: 26,
	[Card.HQ]: 27,
	[Card.HJ]: 28,
	[Card.H9]: 29,
	[Card.H8]: 30,
	[Card.H7]: 31
}
