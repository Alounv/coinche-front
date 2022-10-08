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
};

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
];

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

export type BidColors = Colors | BidSpecificColors;

export const bidColors = {
	[Colors.Spade]: '♠',
	[Colors.Heart]: '♥',
	[Colors.Diamond]: '♦',
	[Colors.Club]: '♣',
	[BidSpecificColors.NoTrump]: 'No Trump',
	[BidSpecificColors.AllTrump]: 'All Trump'
};

export const cardsOrder: Record<Card, { normal: number; trump: number; color: Colors }> = {
	[Card.CA]: { normal: 0, trump: 102, color: Colors.Club },
	[Card.C10]: { normal: 1, trump: 103, color: Colors.Club },
	[Card.CK]: { normal: 2, trump: 104, color: Colors.Club },
	[Card.CQ]: { normal: 3, trump: 105, color: Colors.Club },
	[Card.CJ]: { normal: 4, trump: 100, color: Colors.Club },
	[Card.C9]: { normal: 5, trump: 101, color: Colors.Club },
	[Card.C8]: { normal: 6, trump: 106, color: Colors.Club },
	[Card.C7]: { normal: 7, trump: 107, color: Colors.Club },
	[Card.DA]: { normal: 8, trump: 1010, color: Colors.Diamond },
	[Card.D10]: { normal: 9, trump: 1011, color: Colors.Diamond },
	[Card.DK]: { normal: 10, trump: 1012, color: Colors.Diamond },
	[Card.DQ]: { normal: 11, trump: 1013, color: Colors.Diamond },
	[Card.DJ]: { normal: 12, trump: 108, color: Colors.Diamond },
	[Card.D9]: { normal: 13, trump: 109, color: Colors.Diamond },
	[Card.D8]: { normal: 14, trump: 1014, color: Colors.Diamond },
	[Card.D7]: { normal: 15, trump: 1015, color: Colors.Diamond },
	[Card.SA]: { normal: 16, trump: 1018, color: Colors.Spade },
	[Card.S10]: { normal: 17, trump: 1019, color: Colors.Spade },
	[Card.SK]: { normal: 18, trump: 1020, color: Colors.Spade },
	[Card.SQ]: { normal: 19, trump: 1021, color: Colors.Spade },
	[Card.SJ]: { normal: 20, trump: 1016, color: Colors.Spade },
	[Card.S9]: { normal: 21, trump: 1017, color: Colors.Spade },
	[Card.S8]: { normal: 22, trump: 1022, color: Colors.Spade },
	[Card.S7]: { normal: 23, trump: 1023, color: Colors.Spade },
	[Card.HA]: { normal: 24, trump: 1026, color: Colors.Heart },
	[Card.H10]: { normal: 25, trump: 1027, color: Colors.Heart },
	[Card.HK]: { normal: 26, trump: 1028, color: Colors.Heart },
	[Card.HQ]: { normal: 27, trump: 1029, color: Colors.Heart },
	[Card.HJ]: { normal: 28, trump: 1024, color: Colors.Heart },
	[Card.H9]: { normal: 29, trump: 1025, color: Colors.Heart },
	[Card.H8]: { normal: 30, trump: 1030, color: Colors.Heart },
	[Card.H7]: { normal: 31, trump: 1031, color: Colors.Heart }
};
