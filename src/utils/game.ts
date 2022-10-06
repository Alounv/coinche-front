import type { BidValues } from '../data/enums';
import type { Game, PlayerWithName, BidWithValue, Team } from '../data/types';

export const getPlayers = (game: Game): PlayerWithName[] => {
	const players = [];
	for (const name in game.Players) {
		players.push({ name, ...game.Players[name] });
	}
	players.sort((a, b) => a.InitialOrder - b.InitialOrder);
	return players;
};

export const getCurrentPlayer = (game: Game): PlayerWithName | undefined => {
	const players = getPlayers(game);
	return players.find((p) => p.Order === 1);
};

export const getBids = (game: Game): BidWithValue[] => {
	const bids = [];
	for (const v in game.Bids) {
		const value = v as unknown as BidValues;
		const BidWithValue: BidWithValue = { value, ...game.Bids[value] };
		bids.push(BidWithValue);
	}
	return bids;
};

export const getLastBid = (game: Game): BidWithValue => {
	const bids = getBids(game);
	return bids[bids.length - 1];
};

export const getTeams = (game: Game): Team[] => {
	if (!game) return [];

	const players = game.Players;
	const teams: Team[] = [];
	for (const name in players) {
		const player = { name, ...players[name] };
		const teamName = player.Team || 'Not in a team';
		const team = teams.find((t) => t.name === teamName);
		if (team) {
			team.players.push(player);
		} else {
			teams.push({
				name: teamName,
				players: [player],
				score: game.Scores?.[teamName],
				points: game.Points?.[teamName]
			});
		}
	}

	return teams;
};

export const getPlayersPositions = ({
	players,
	currentPlayerOrder: o
}: {
	players: PlayerWithName[];
	currentPlayerOrder: number;
}): { left: PlayerWithName; right: PlayerWithName; front: PlayerWithName } => {
	if (players.length !== 4) throw new Error('Invalid number of players');
	const left = players.find((p) => [o + 1, o - 3].includes(p.Order)) as PlayerWithName;
	const right = players.find((p) => [o - 1, o + 3].includes(p.Order)) as PlayerWithName;
	const front = players.find((p) => [o - 2, o + 2].includes(p.Order)) as PlayerWithName;
	return { left, right, front };
};

export const getTakenTeamWons = (game: Game, lastBidderName: string): number => {
	const takenTeam = game.Players[lastBidderName].Team;
	const players = getPlayers(game);
	const partner = players.find((p) => p.Team === takenTeam && p.name !== lastBidderName)?.name;
	const takenTeamWons = game.Turns.filter((t) => [partner, lastBidderName].includes(t.Winner));
	console.log({ takenTeam, partner, takenTeamWons, count: takenTeamWons.length });
	return takenTeamWons.length;
};
