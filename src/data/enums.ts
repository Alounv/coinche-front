export enum Phase {
	Teaming = 1,
	Bidding = 2,
	Playing = 3,
	Counting = 4
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
];

export enum Colors {
	Spade = 'spade',
	Heart = 'heart',
	Diamond = 'diamond',
	Club = 'club'
}

enum BidSpecificColors {
	NoTrump = 'noTrump',
	AllTrump = 'allTrump'
}

export type BidColors = Colors | BidSpecificColors;

export const bidColors = [
	{ label: '♠', value: Colors.Spade },
	{ label: '♥', value: Colors.Heart },
	{ label: '♦', value: Colors.Diamond },
	{ label: '♣', value: Colors.Club },
	{ label: 'All trump', value: BidSpecificColors.AllTrump },
	{ label: 'No trump', value: BidSpecificColors.NoTrump }
];
