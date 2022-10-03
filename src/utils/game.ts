import type { Game, PlayerWithName, Bid } from '../data/types';

export const getPlayersFromGame = (game: Game): PlayerWithName[] => {
	const players = [];
	for (const name in game.Players) {
		players.push({ name, ...game.Players[name] });
	}
	return players;
};

export const getBidsFromGame = (game: Game): Bid[] => {
	const bids = [];
	for (const value in game.Bids) {
		bids.push({ value, ...game.Bids[value] });
	}
	return bids;
};
