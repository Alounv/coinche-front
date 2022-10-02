import { writable } from 'svelte/store';
import type { Game, PlayerWithName } from './types';

export const initialGame: Game = { ID: 0, Name: '', Players: {}, Phase: 0 };

export const gameStore = writable(initialGame);

export const initialActions: {
	joinTeam: (teamName: string) => void;
	start: () => void;
} = {
	joinTeam: () => null,
	start: () => null
};

export const actionsStore = writable(initialActions);

export const initialPlayer: PlayerWithName = {
	name: '',
	Hand: [],
	Team: '',
	Order: 0,
	InitialOrder: 0
};

export const playerStore = writable(initialPlayer);
