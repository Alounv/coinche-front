<script lang="ts">
	import { onMount } from 'svelte';
	interface GamePreview {
		ID: number;
		Name: string;
		Players: string[];
		TurnsCount: number;
		Phase: string;
		CreatedAt: string;
	}
	let games: GamePreview[] = [];
	let newGameName = '';
	let ws: WebSocket;
	let message = '';
	let name = ''; // save name somewhere ? localStorage ? store ?
	let currentGame: GamePreview | null = null;

	const refreshList = async () => {
		const response = await fetch('http://localhost:5000/games/all', {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});

		const data = await response.json();
		if (data.error) {
			message = data.error;
		} else {
			(data as GamePreview[]).sort((a, b) => a.ID - b.ID);
			games = data;
		}
	};

	const createGame = async () => {
		const response = await fetch(`http://localhost:5000/games/create?name=${newGameName}`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' }
		});

		const { error } = await response.json();

		if (error) {
			message = error;
		}
		refreshList();
	};

	const deleteGame = async (gameId: number) => {
		const response = await fetch(`http://localhost:5000/games/${gameId}/delete`, {
			method: 'DELETE',
			headers: { 'content-type': 'application/json' }
		});
		const { error } = await response.json();

		if (error) {
			message = error;
		}
		refreshList();
	};

	const forceLeaveGame = async (gameID: number, name: string) => {
		const response = await fetch(`http://localhost:5000/games/${gameID}/leave?playerName=${name}`, {
			method: 'PUT',
			headers: { 'content-type': 'application/json' }
		});
		const { error } = await response.json();

		if (error) {
			message = error;
		}
		if (currentGame?.ID === gameID) {
			currentGame = null;
		}
		refreshList();
	};

	const leaveCurrentGame = async () => {
		if (ws && ws.readyState === WebSocket.OPEN) {
			ws.send(JSON.stringify('leave'));
			currentGame = null;
		}
	};

	const joinGame = async (gameId: number, playerName: string) => {
		if (currentGame?.ID === gameId) {
			return;
		}

		await leaveCurrentGame();

		ws = new WebSocket(`ws://localhost:5000/games/${gameId}/join?playerName=${playerName}`);

		const socketGame = games.find((game) => game.ID === gameId);
		if (socketGame) currentGame = socketGame;

		ws.onclose = () => {
			console.log('closed');
			refreshList();
		};

		ws.onerror = () => {
			console.error('WS error');
			refreshList();
		};

		ws.onmessage = async (event) => {
			const data = await event.data.text();
			message = data;
			refreshList();
		};
	};

	const handleNameChange = (event: Event) => {
		const { value } = event.target as HTMLInputElement;
		localStorage.setItem('name', value);
	};

	onMount(() => {
		refreshList();
		name = localStorage.getItem('name') || '';
	});
</script>

<h1>Test connection to server</h1>

<h2>Your name is: {name}</h2>
<div>
	<label for="name">Set name</label>
	<input id="name" bind:value={name} on:change={handleNameChange} />
</div>

<button on:click={refreshList}>Refresh list</button>

<form on:submit|preventDefault={createGame}>
	<label for="create-game">Create new game</label>
	<input id="create-game" bind:value={newGameName} />
</form>

<ul>
	{#each games as game (game.ID)}
		<li>
			<button on:click={() => deleteGame(game.ID)}>Delete</button>
			<button on:click={() => joinGame(game.ID, name)}>Join</button>
			<button on:click={() => forceLeaveGame(game.ID, name)}>Force Leave</button>

			<span>{game.ID}</span>
			<span>{game.Name}</span>
			<span>{game.TurnsCount}</span>
			<span>{game.Phase}</span>
			<span>{game.Players}</span>
		</li>
	{/each}
</ul>

<div style="color: red;">{message}</div>

<h2>Your current game is: {currentGame?.Name || ''}</h2>
<button on:click={leaveCurrentGame}>Leave current game</button>
