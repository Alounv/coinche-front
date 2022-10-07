import type { GamePreview } from '../data/types';
import { variables } from '../variables';

const { REST_URL } = variables;
const HEADERS = { 'Content-Type': 'application/json' };

type ListGamesOutput =
	| {
			error?: never;
			previews: GamePreview[];
	  }
	| {
			error: string;
			previews?: never;
	  };

export const listGames = async (): Promise<ListGamesOutput> => {
	const response = await fetch(`${REST_URL}/games/all`, {
		method: 'GET',
		headers: HEADERS
	});

	const data = await response.json();

	if (data.error) {
		return { error: data.error };
	}

	(data as GamePreview[]).sort((a, b) => a.ID - b.ID);
	const previews = data.map((preview: GamePreview) => ({
		...preview,
		Players: preview.Players.sort((a, b) => a.localeCompare(b))
	}));
	return { previews };
};

export const createGame = async (gameName: string): Promise<string> => {
	const response = await fetch(`${REST_URL}/games/create?name=${gameName}`, {
		method: 'POST',
		headers: HEADERS
	});

	const { error } = await response.json();

	return error || '';
};

export const deleteGame = async (gameId: number): Promise<string> => {
	const response = await fetch(`${REST_URL}/games/${gameId}/delete`, {
		method: 'DELETE',
		headers: HEADERS
	});
	const { error } = await response.json();

	return error || '';
};

export const forceLeaveGame = async (gameID: number, playerName: string): Promise<string> => {
	const response = await fetch(`${REST_URL}/games/${gameID}/leave?playerName=${playerName}`, {
		method: 'PUT',
		headers: HEADERS
	});
	const { error } = await response.json();

	return error || '';
};
