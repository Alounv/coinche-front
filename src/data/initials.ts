import type { Game, PlayerWithName } from './types';

export const initialGame: Game = { ID: 0, Name: '', Players: {}, Phase: 0 };

export const initialActions: {
	joinTeam: (teamName: string) => void;
	start: () => void;
} = {
	joinTeam: () => null,
	start: () => null
};

export const initialPlayer: PlayerWithName = {
	name: '',
	Hand: [],
	Team: '',
	Order: 0,
	InitialOrder: 0
};
