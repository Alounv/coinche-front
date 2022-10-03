import type { GamePreview } from './types';

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
	const response = await fetch('http://localhost:5000/games/all', {
		method: 'GET',
		headers: { 'content-type': 'application/json' }
	});

	const data = await response.json();

	if (data.error) {
		return { error: data.error };
	}

	(data as GamePreview[]).sort((a, b) => a.ID - b.ID);
	return { previews: data };
};

export const createGame = async (gameName: string): Promise<string> => {
	const response = await fetch(`http://localhost:5000/games/create?name=${gameName}`, {
		method: 'POST',
		headers: { 'content-type': 'application/json' }
	});

	const { error } = await response.json();

	return error || '';
};

export const deleteGame = async (gameId: number): Promise<string> => {
	const response = await fetch(`http://localhost:5000/games/${gameId}/delete`, {
		method: 'DELETE',
		headers: { 'content-type': 'application/json' }
	});
	const { error } = await response.json();

	return error || '';
};

export const forceLeaveGame = async (gameID: number, playerName: string): Promise<string> => {
	const response = await fetch(
		`http://localhost:5000/games/${gameID}/leave?playerName=${playerName}`,
		{
			method: 'PUT',
			headers: { 'content-type': 'application/json' }
		}
	);
	const { error } = await response.json();

	return error || '';
};
