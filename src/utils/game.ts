import type { Game, PlayerWithName } from '../data/types';

export const getPlayersFromGame = (game: Game): PlayerWithName[] => {
	const players = [];
	for (const name in game.Players) {
		players.push({ name, ...game.Players[name] });
	}
	return players;
};
