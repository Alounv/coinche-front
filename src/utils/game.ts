import type { BidColors } from '../data/enums';
import type { Game, PlayerWithName, BidWithValue } from '../data/types';
import type { BidValues } from '../data/enums';

export const getPlayersFromGame = (game: Game): PlayerWithName[] => {
	const players = [];
	for (const name in game.Players) {
		players.push({ name, ...game.Players[name] });
	}
	return players;
};

export const getBidsFromGame = (game: Game): BidWithValue[] => {
	const bids = [];
	for (const v in game.Bids) {
		const value = v as unknown as BidValues;
		const BidWithValue: BidWithValue = { value, ...game.Bids[value] };
		bids.push(BidWithValue);
	}
	return bids;
};

export const getTrump = (game: Game): BidColors => {
	const bids = getBidsFromGame(game);
	const trump = bids[bids.length - 1].Color;
	return trump;
};
